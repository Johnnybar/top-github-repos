import { GithubApiResponse } from "../types/repo";
import { isNil } from "ramda";

/**
 * API function for fetching GitHub repositories with search and language filtering
 * @param searchQuery - Search term to filter repositories
 * @param language - Programming language to filter repositories
 * @returns Promise containing the GitHub API response
 */
export const fetchGithubRepos = async (
  searchQuery: string,
  language: string
): Promise<GithubApiResponse> => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (searchQuery) {
      params.append("q", searchQuery);
    }
    if (language) {
      params.append("language", language);
    }

    const url = `/api/github-repos${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await fetch(url);
    
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data: GithubApiResponse = await response.json();
    console.log({data});
    
    // Transform the API response to ensure data consistency
    const transformedData: GithubApiResponse = {
      ...data,
      items: data.items.map((item, index) => ({
        id: !isNil(item.id) ? item.id : index,
        name: item.name,
        full_name: item.full_name || `${item.owner?.html_url?.split('/').pop() || 'unknown'}/${item.name}`,
        description: item.description || undefined,
        clone_url: item.clone_url, 
        stargazers_count: item.stargazers_count,
        language: !isNil(item.language) ? item.language : 'N/A',
        watchers_count: item.watchers_count,
        open_issues_count: item.open_issues_count,
        owner: {
          avatar_url: item.owner.avatar_url,
          html_url: item.owner.html_url,
        },
      })),
    };
    console.log({transformedData});
    
    return transformedData;
  } catch (error) {
    // Re-throw the error for React Query to handle
    throw error;
  }
}; 