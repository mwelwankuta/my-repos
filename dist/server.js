"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merlee_js_1 = __importDefault(require("merlee.js"));
const api_1 = __importDefault(require("./api"));
const port = process.env.PORT;
const app = (0, merlee_js_1.default)({
    port: port ? parseInt(port) : 3000,
    static: "public",
});
app.handler({ path: "/", method: "get" }, async (_req, res) => {
    const { repos, status } = await (0, api_1.default)();
    res.render("home", { search: "", repos }, status);
});
app.handler({
    method: "get",
    path: "/middle/api",
}, async (_req, res) => {
    res.send({ name: "mwelwa" }, 200);
});
app.handler({ method: "get", path: "/api" }, async (_req, res) => {
    const { repos, status } = await (0, api_1.default)();
    res.send({ repos }, status);
});
app.handler({ method: "get", path: "/app" }, async (_req, res) => {
    res.send({ name: "mwelwa" });
});
app.handler({ method: "post", path: "/search" }, async (req, res) => {
    var _a;
    const { repos, status } = await (0, api_1.default)();
    const searchWord = (_a = req.body) === null || _a === void 0 ? void 0 : _a.search.toLowerCase();
    const repo = repos.filter((repo) => (repo.name && repo.name.includes(searchWord)) ||
        (repo.description && repo.description.includes(searchWord)));
    res.render("home", { repos: repo, search: searchWord }, status);
});
app.listen((port) => console.log(`listening on port ${port}`));
//# sourceMappingURL=server.js.map