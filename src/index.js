const merlee = require("merlee.js");
const getRepos = require("./getRepos");

const port = process.env.PORT || 3000;
const app = merlee({
  port,
  static: "public",
});

// app routes
app.handler({ method: "get", path: "/" }, async (req, res) => {
  const { repos, status } = await getRepos();
  res.render("home", { repos, search: "" }, status);
});

app.handler({ method: "get", path: "/api" }, async (req, res) => {
  const { repos, status } = await getRepos();

  res.send({ repos }, status);
});

app.handler({ method: "get", path: "/app" }, async (req, res) => {
  res.send({ name: "mwelwa" });
});

app.handler({ method: "post", path: "/search" }, async (req, res) => {
  const { repos, status } = await getRepos();

  /**
   * @type {string}
   */
  const searchWord = req.body.search.toLowerCase();

  const repo = repos.filter(
    (repo) =>
      (repo.name && repo.name.includes(searchWord)) ||
      (repo.description && repo.description.includes(searchWord))
  );

  res.render("home", { repos: repo, search: searchWord }, status);
});

app.listen((port) => console.log(`listening on port ${port}`));
