import { useQuery } from "@tanstack/react-query";
import { fetchGithubRepos } from "../services/api";
import { GithubReposData } from "../types";

export const useGithubRepos = () => {
  return useQuery<GithubReposData[]>({
    queryKey: ['github-repos'],
    queryFn: fetchGithubRepos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3, // Retry up to 3 times for all types of errors
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Wait 1s, 2s, 4s between retries
    // Keep previous data on error to show stale data while retrying
    placeholderData: (previousData) => previousData,
  });
}; 