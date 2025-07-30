import { GithubReposData, GithubApiResponse, GithubApiItem } from "./types";
import { githubReposMock } from "./mocks";
import { isNil } from "ramda";

// API function for fetching GitHub repositories
export const fetchGithubRepos = async (): Promise<GithubReposData[]> => {
  const response = await fetch("/api/github-repos");
  
  if (!response.ok) {
    //TODO - Should we use fallback or throw an error as well?
    return githubReposMock.items as GithubReposData[];
  }

  const text = await response.text();
  const data: GithubApiResponse = JSON.parse(text);
  
  const filteredData = data.items.map((item: GithubApiItem, index: number) => ({
    id: !isNil(item.id) ? item.id : index,
    url: item.html_url,
    stargazers_count: item.stargazers_count,
    language: !isNil(item.language) ? item.language : 'N/A',
    name: item.name,
    watchers_count: item.watchers_count,
    open_issues_count: item.open_issues_count,
    description: item.description,
    owner: {
      avatar_url: item.owner.avatar_url,
    },
  }));
  
  return filteredData as GithubReposData[];
}; 