const merlee = require('merlee.js');
const { default: axios } = require('axios');

const port = process.env.PORT || 3000
const app = new merlee({ port, views: 'src/views', static: 'public' });

const repos = [];
app.handler({ method: 'get', path: '/' }, async (req, res) => {
  const profileUrl = 'https://api.github.com/users/mwelwankuta/repos';
  const profile = await axios.get(profileUrl);

  profile.data.forEach(repo => {
    repos.push({
      name: repo.name,
      description: repo.description,
      link: repo.html_url,
    });
  });
  res.render('home', { repos });
});

app.handler({ method: 'get', path: '/api' }, async (req, res) => {
  const profileUrl = 'https://api.github.com/users/mwelwankuta/repos';
  const profile = await axios.get(profileUrl);

  profile.data.forEach(repo => {
    repos.push({
      name: repo.name,
      description: repo.description,
      link: repo.html_url,
    });
  });

  res.send({ repos }, profile.status);
});

app.handler({ method: 'post', path: '/search' }, (req, res) => {
  const searchWord = req.body.search.toLowerCase();
  const repo = repos.filter(
    repo =>
      (repo.name && repo.name.includes(searchWord)) ||
      (repo.description && repo.description.includes(searchWord))
  );

  res.render('home', { repos: repo });
});

app.set('port', 3000);
app.listen(port => console.log(`listening on port ${port}`));
