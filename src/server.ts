import merlee, { Request, Response } from "merlee.js";
import getRepos from "./api";

const port = process.env.PORT;
const app = merlee({
  port: port ? parseInt(port) : 3000,
  static: "public",
});

app.handler(
  { path: "/", method: "get" },
  async (_req: Request<{ search?: string }>, res: Response) => {
    const { repos, status } = await getRepos();
    res.render("home", { search: "", repos }, status);
  }
);

app.handler(
  {
    method: "get",
    path: "/middle/api",
  },
  async (_req: Request<any>, res: Response) => {
    res.send({ name: "mwelwa" }, 200);
  }
);

app.handler(
  { method: "get", path: "/api" },
  async (_req: Request<any>, res: Response) => {
    const { repos, status } = await getRepos();

    res.send({ repos }, status);
  }
);

app.handler(
  { method: "get", path: "/app" },
  async (_req: Request<any>, res: Response) => {
    res.send({ name: "mwelwa" });
  }
);

app.handler(
  { method: "post", path: "/search" },
  async (req: Request<any>, res: Response) => {
    const { repos, status } = await getRepos();

    const searchWord = req.body?.search.toLowerCase();

    const repo = repos.filter(
      (repo: any) =>
        (repo.name && repo.name.includes(searchWord)) ||
        (repo.description && repo.description.includes(searchWord))
    );

    res.render("home", { repos: repo, search: searchWord }, status);
  }
);

app.listen((port: any) => console.log(`listening on port ${port}`));
