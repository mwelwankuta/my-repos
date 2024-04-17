import axios from "axios";

export default async function getRepos() {
  const repos = [];

  const profileUrl = "https://api.github.com/users/mwelwankuta/repos";
  const profile = (await axios.get(profileUrl).catch((error) => {
    console.log(error);
    repos.push({ name: "error", description: "an error occurred" });
  })) as any;

  if (profile.data && profile.data.length > 0)
    profile.data.forEach((repo: any) => {
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
