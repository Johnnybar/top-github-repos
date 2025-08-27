import { useState, useMemo, useEffect } from "react";
import { GithubReposData } from "../types/repo";

type SortField = "stars" | "watchers" | "issues" | "name" | "language";
type SortDirection = "asc" | "desc";

interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

/**
 * useSortRepos hook provides sorting and filtering functionality for repositories
 * @param repos - Array of repositories to sort and filter
 * @param searchQuery - Search query to filter repositories by name/description
 * @param showStarredOnly - Whether to show only starred repositories
 * @param language - Programming language to filter repositories by
 * @returns Object containing sorted/filtered repos and sorting functions
 */
const useSortRepos = (repos: GithubReposData[], searchQuery: string = "", showStarredOnly: boolean = false, language: string = "") => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "stars",
    direction: "desc",
  });
  const [filterLanguage, setFilterLanguage] = useState<string>(language);

  const sortedAndFilteredRepos = useMemo(() => {
    let filtered = repos;

    // Filter by starred repos if specified
    if (showStarredOnly) {
      filtered = filtered.filter((repo) => repo.isStarred);
    }

    // Filter by search query if specified
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(query) ||
          (repo.description && repo.description.toLowerCase().includes(query)) ||
          (repo.full_name && repo.full_name.toLowerCase().includes(query))
      );
    }

    // Filter by language if specified
    if (filterLanguage) {
      filtered = filtered.filter(
        (repo) => repo.language && repo.language !== 'N/A' && repo.language === filterLanguage
      );
    }

    // Sort repositories
    return [...filtered].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortConfig.field) {
        case "stars":
          aValue = a.stargazers_count;
          bValue = b.stargazers_count;
          break;
        case "watchers":
          aValue = a.watchers_count;
          bValue = b.watchers_count;
          break;
        case "issues":
          aValue = a.open_issues_count;
          bValue = b.open_issues_count;
          break;
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "language":
          aValue = a.language || "";
          bValue = b.language || "";
          break;
        default:
          aValue = a.stargazers_count;
          bValue = b.stargazers_count;
      }

      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [repos, searchQuery, showStarredOnly, sortConfig, filterLanguage, language]);

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  // Update filterLanguage when language prop changes
  useEffect(() => {
    setFilterLanguage(language);
  }, [language]);

  const handleLanguageFilter = (language: string) => {
    setFilterLanguage(language);
  };

  const clearFilters = () => {
    setFilterLanguage("");
    setSortConfig({ field: "stars", direction: "desc" });
  };

  return {
    sortedRepos: sortedAndFilteredRepos,
    sortConfig,
    filterLanguage,
    handleSort,
    handleLanguageFilter,
    clearFilters,
  };
};

export default useSortRepos;

