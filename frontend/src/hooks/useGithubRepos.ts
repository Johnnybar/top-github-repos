import { useQuery } from "@tanstack/react-query";
import { fetchGithubRepos } from "../services/api";
import { GithubApiResponse } from "../types/repo";

/**
 * useGithubRepos hook fetches GitHub repositories based on search query and language filter
 * @param searchQuery - Search term to filter repositories
 * @param language - Programming language to filter repositories
 * @returns Query result object containing repositories data, loading state, and error information
 */
export const useGithubRepos = (searchQuery: string, language: string) => {
  console.log({searchQuery, language});
  
  return useQuery<GithubApiResponse>({
    queryKey: ['github-repos', searchQuery], // Remove language from queryKey for client-side filtering
    queryFn: () => fetchGithubRepos(searchQuery, language),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3, // Retry up to 3 times for all types of errors
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Wait 1s, 2s, 4s between retries
    // Keep previous data on error to show stale data while retrying
    placeholderData: (previousData) => previousData,
    // enabled: !!searchQuery || !!language, // Only run query when there's a search or language filter
  });
}; 