const { default: axios } = require('axios');
module.exports = getRepos = async () => {
  const repos = [];

  const profileUrl = 'https://api.github.com/users/mwelwankuta/repos';
  const profile = await axios
    .get(profileUrl)
    .catch(() =>
      repos.push({ name: 'error', description: 'an error occured' })
    );

  if (profile.data && profile.data.length > 0)
    profile.data.forEach(repo => {
      repos.push({
        name: repo.name,
        description: repo.description,
        link: repo.html_url,
      });
    });
  else repos.push({ name: 'error', description: 'an error occured' });

  return { repos, status: profile.status };
};
