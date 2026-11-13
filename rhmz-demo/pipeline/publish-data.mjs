import { readFile } from 'node:fs/promises';

// Runs only in the public Pages repository, with its short-lived GitHub Actions token.
const repository = process.env.GITHUB_REPOSITORY;
const token = process.env.GH_TOKEN;
if (repository !== 'Danilo3110/danilo3110.github.io' || !token)
  throw new Error('Unexpected deployment context');
const path = 'rhmz-demo/data/weather.json';
const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};
const api = async (suffix, options = {}) => {
  const response = await fetch(`https://api.github.com/repos/${repository}/${suffix}`, {
    ...options,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok)
    throw new Error(`GitHub ${response.status}: ${data?.message ?? 'Request failed'}`);
  return data;
};
const current = await api(`contents/${path}?ref=master`);
const content = (await readFile(path)).toString('base64');
const result = await api(`contents/${path}`, {
  method: 'PUT',
  body: JSON.stringify({
    message: 'chore: refresh RHMZ observation snapshots',
    sha: current.sha,
    branch: 'master',
    content,
  }),
});
console.log(`Updated only ${path}: ${result.commit.sha}`);
// Commits made with GITHUB_TOKEN do not automatically trigger a legacy Pages build.
await api('pages/builds', { method: 'POST', body: '{}' });
console.log('Requested the existing branch-based Pages build.');
