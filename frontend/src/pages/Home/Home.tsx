import { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Typography, Box, Alert, Grid, Button, ToggleButton, ToggleButtonGroup, Chip } from "@mui/material";
import { Search as SearchIcon, ViewModule, TableChart, Star } from "@mui/icons-material";
import RepoCard from "../../components/RepoCard/RepoCard";
import ReposTable from "../../components/ReposTable";
import { Search } from "../../components/Search";
import { LanguageFilter } from "../../components/LanguageFilter";
import { RepoDetailsDialog } from "../../components/RepoDetailsDialog";
import { useGithubRepos } from "../../hooks/useGithubRepos";
import useSortRepos from "../../hooks/useSortRepos";
import { GithubReposData, RepoInfoState } from "../../types/repo";
import { styles } from "../../style";

/**
 * Home page component that displays the GitHub repositories dashboard
 * @returns JSX element containing the main dashboard interface
 */
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("stars:>1000"); // Default search for popular repos
  const [clientSearchQuery, setClientSearchQuery] = useState(""); // Client-side search for filtering
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [starredRepos, setStarredRepos] = useState<Set<string>>(new Set());
  const [repoInfo, setRepoInfo] = useState<RepoInfoState>({
    id: null,
    open: false,
  });

  const { data, isLoading, error, refetch } = useGithubRepos(
    searchQuery,
    "" // Don't pass language since we're doing client-side filtering
  );

  // Add starred status to repos
  const reposWithStarred = (data?.items || []).map(repo => ({
    ...repo,
    isStarred: starredRepos.has(repo.full_name || repo.name)
  }));

  // Extract unique languages from repository data
  const availableLanguages = useMemo(() => {
    const languages = new Set<string>();
    reposWithStarred.forEach(repo => {
      if (repo.language && repo.language !== 'N/A') {
        languages.add(repo.language);
      }
    });
    return Array.from(languages).sort();
  }, [reposWithStarred]);

  const { sortedRepos, handleSort, handleLanguageFilter, clearFilters, sortConfig } =
    useSortRepos(reposWithStarred, clientSearchQuery, showStarredOnly, selectedLanguage); // Use client-side search and language filtering



  const handleRepoClick = (repo: GithubReposData) => {
    setRepoInfo({ id: repo.id || 0, open: true });
  };

  const handleCloseDialog = () => {
    setRepoInfo({ id: null, open: false });
  };

  const handleSearch = (query: string) => {
    setClientSearchQuery(query);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    handleLanguageFilter(language);
  };

  const handleToggleStar = (repo: GithubReposData) => {
    const repoKey = repo.full_name || repo.name;
    setStarredRepos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(repoKey)) {
        newSet.delete(repoKey);
      } else {
        newSet.add(repoKey);
      }
      return newSet;
    });
  };

  // Load starred repos from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('starredRepos');
    if (saved) {
      try {
        const starredArray = JSON.parse(saved);
        setStarredRepos(new Set(starredArray));
      } catch (error) {
        console.error('Error loading starred repos:', error);
      }
    }
  }, []);

  // Save starred repos to localStorage when they change
  useEffect(() => {
    if (starredRepos.size > 0) {
      localStorage.setItem('starredRepos', JSON.stringify(Array.from(starredRepos)));
    } else {
      localStorage.removeItem('starredRepos');
    }
  }, [starredRepos]);

  // Fetch data immediately on component mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (error) {
    return (
      <Container maxWidth="md" sx={styles.container}>
        <Alert severity="error">
          Error loading repositories: {error.message}
        </Alert>
      </Container>
    );
  }

  const hasResults = sortedRepos.length > 0;

  return (
    <Container maxWidth="xl" sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="body1" color="text.secondary" paragraph>
          Discover the most popular repositories on GitHub
        </Typography>
      </Box>

      <Box sx={styles.controls}>
        <Search onSearch={handleSearch} />
        <LanguageFilter
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
          availableLanguages={availableLanguages}
        />
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, newViewMode) => {
            if (newViewMode !== null) {
              setViewMode(newViewMode);
            }
          }}
          aria-label="view mode"
          size="small"
        >
          <ToggleButton value="grid" aria-label="grid view">
            <ViewModule />
          </ToggleButton>
          <ToggleButton value="table" aria-label="table view">
            <TableChart />
          </ToggleButton>
        </ToggleButtonGroup>
        
        <Chip
          icon={<Star />}
          label={showStarredOnly ? `Show All (${starredRepos.size} starred)` : `Show Starred Only (${starredRepos.size})`}
          onClick={() => setShowStarredOnly(!showStarredOnly)}
          variant={showStarredOnly ? "filled" : "outlined"}
          color={showStarredOnly ? "warning" : "default"}
          clickable
        />
      </Box>

      {isLoading ? (
        <Box sx={styles.loadingContainer}>
          <Typography>Loading repositories...</Typography>
        </Box>
      ) : hasResults ? (
        viewMode !== "grid" ? (
          <Grid container spacing={3}>
            {sortedRepos.map((repo) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={repo.id || repo.name}>
                <RepoCard repo={repo} onClick={handleRepoClick} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <ReposTable
            repos={sortedRepos}
            sortConfig={sortConfig}
            onSort={handleSort}
            onRepoClick={handleRepoClick}
            onToggleStar={handleToggleStar}
          />
        )
      ) : (
        <Box sx={styles.loadingContainer}>
          <Typography variant="h6" gutterBottom>
            No repositories found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or language filter
          </Typography>
        </Box>
      )}

      <RepoDetailsDialog
        open={repoInfo.open}
        onClose={handleCloseDialog}
        repoId={repoInfo.id}
        repos={sortedRepos}
      />
    </Container>
  );
};

export default Home;
