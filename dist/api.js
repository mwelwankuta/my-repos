"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function getRepos() {
    const repos = [];
    const profileUrl = "https://api.github.com/users/mwelwankuta/repos";
    const profile = (await axios_1.default.get(profileUrl).catch((error) => {
        console.log(error);
        repos.push({ name: "error", description: "an error occurred" });
    }));
    if (profile.data && profile.data.length > 0)
        profile.data.forEach((repo) => {
            repos.push({
                name: repo.name,
                description: repo.description,
                link: repo.html_url,
            });
        });
    else {
        repos.push({ name: "error", description: "an error occurred" });
    }
    return { repos, status: profile.status };
}
exports.default = getRepos;
//# sourceMappingURL=api.js.map