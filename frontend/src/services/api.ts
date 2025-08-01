import { GithubReposData, GithubApiResponse } from "../types";
import { isNil } from "ramda";

// API function for fetching GitHub repositories
export const fetchGithubRepos = async (): Promise<GithubReposData[]> => {
  try {
    const response = await fetch("/api/github-repos");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const text = await response.text();
    const data: GithubApiResponse = JSON.parse(text);

    // Transform the API response to match data structure
    const filteredData = data.items.map((item, index) => ({
      id: !isNil(item.id) ? item.id : index,
      name: item.name,
      full_name: item.full_name || `${item.owner?.html_url?.split('/').pop() || 'unknown'}/${item.name}`,
      description: item.description || undefined,
      url: item.clone_url,
      stargazers_count: item.stargazers_count,
      language: !isNil(item.language) ? item.language : 'N/A',
      watchers_count: item.watchers_count,
      open_issues_count: item.open_issues_count,
      owner: {
        avatar_url: item.owner.avatar_url,
        html_url: item.owner.html_url,
      },
    }));
    
    return filteredData as GithubReposData[];
  } catch (error) {
    // Re-throw the error for React Query to handle
    throw error;
  }
}; 