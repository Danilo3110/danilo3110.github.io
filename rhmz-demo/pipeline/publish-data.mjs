import { readFile } from 'node:fs/promises';

// Only these two fixed paths are published, together in one commit on the existing branch.
const repository = process.env.GITHUB_REPOSITORY;
const token = process.env.GH_TOKEN;
if (repository !== 'Danilo3110/danilo3110.github.io' || !token)
  throw new Error('Unexpected deployment context');
const paths = ['rhmz-demo/data/weather.json', 'rhmz-demo/data/products.json'];
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json',
};
const api = async (suffix, options = {}) => {
  const response = await fetch(`https://api.github.com/repos/${repository}/${suffix}`, {
    ...options,
    headers,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok)
    throw new Error(`GitHub ${response.status}: ${data?.message ?? 'Request failed'}`);
  return data;
};
const ref = await api('git/ref/heads/master');
const parent = await api(`git/commits/${ref.object.sha}`);
const entries = [];
for (const path of paths) {
  const content = await readFile(path);
  if (content.byteLength > 2_000_000) throw new Error('Data file exceeds publication limit');
  if (JSON.parse(content.toString('utf8')).schemaVersion !== 1)
    throw new Error('Unexpected data format');
  const blob = await api('git/blobs', {
    method: 'POST',
    body: JSON.stringify({ content: content.toString('base64'), encoding: 'base64' }),
  });
  entries.push({ path, mode: '100644', type: 'blob', sha: blob.sha });
}
const tree = await api('git/trees', {
  method: 'POST',
  body: JSON.stringify({ base_tree: parent.tree.sha, tree: entries }),
});
const commit = await api('git/commits', {
  method: 'POST',
  body: JSON.stringify({
    message: 'chore: refresh timestamped RHMZ data products',
    tree: tree.sha,
    parents: [ref.object.sha],
  }),
});
// A concurrent branch change fails safely; never force-overwrite another commit.
await api('git/refs/heads/master', {
  method: 'PATCH',
  body: JSON.stringify({ sha: commit.sha, force: false }),
});
console.log(`Updated only ${paths.join(' and ')}: ${commit.sha}`);
await api('pages/builds', { method: 'POST', body: '{}' });
console.log('Requested the existing branch-based Pages build.');
