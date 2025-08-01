import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Star, Refresh } from "@mui/icons-material";
import { GithubReposData, RepoInfoState } from "../types";
import { RepoDetailsDialog } from "./RepoDetailsDialog";
import { Search } from "./Search";
import { LanguageFilter } from "./LanguageFilter";
import { ReposTable } from "./ReposTable";
import { styles } from "../style";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { isNil, isEmpty } from "ramda";

export const GithubReposDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<GithubReposData[]>([]);
  const [repoInfoOpen, setRepoInfoOpen] = useState<RepoInfoState>({ id: null, open: false });
  const [starredRepos, setStarredRepos] = useState<Set<number>>(new Set());
  const [showStarredOnly, setShowStarredOnly] = useState<boolean>(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);

  // Load starred repos from localStorage on component mount
  useEffect(() => {
    const savedStarred = localStorage.getItem('starredRepos');
    if (savedStarred) {
      setStarredRepos(new Set(JSON.parse(savedStarred)));
    }
  }, []);

  // Save starred repos to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('starredRepos', JSON.stringify(Array.from(starredRepos)));
  }, [starredRepos]);

  const handleStarToggle = (repoId: number) => {
    setStarredRepos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(repoId)) {
        newSet.delete(repoId);
      } else {
        newSet.add(repoId);
      }
      return newSet;
    });
  };

  // React Query for fetching repos
  const { data: githubReposData = [], isLoading, error, isError } = useGithubRepos();

  // Extract languages whenever data changes
  useEffect(() => {
    if (Array.isArray(githubReposData) && !isEmpty(githubReposData)) {
      const languages: string[] = [];
      githubReposData.forEach((item: GithubReposData) => {
        if (!isNil(item.language) && !languages.includes(item.language)) {
          languages.push(item.language);
        }
      });
      languages.sort();
      setAvailableLanguages(languages);
    }
  }, [githubReposData]);

  // Filter data when search term or data changes
  useEffect(() => {
    if (Array.isArray(githubReposData) && !isEmpty(githubReposData)) {
      let filtered = githubReposData.filter((repo: GithubReposData) => {
        // Search across name, full_name, and language fields (case-insensitive)
        const matchesSearch = (!isNil(repo.name) && repo.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (!isNil(repo.full_name) && repo.full_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (!isNil(repo.language) && repo.language.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Filter by selected languages (show all if none selected)
        const matchesLanguage = isEmpty(selectedLanguages) || (!isNil(repo.language) && selectedLanguages.includes(repo.language));
        
        // If showing starred only, also check if repo is starred
        if (showStarredOnly) {
          return matchesSearch && matchesLanguage && !isNil(repo.id) && starredRepos.has(repo.id);
        }
        
        return matchesSearch && matchesLanguage;
      });
      setFilteredRows(filtered);
    }
  }, [githubReposData, searchTerm, showStarredOnly, starredRepos, selectedLanguages]);

  const handleRowClick = (params: any) => {
    if (!isNil(params.row.id)) {
      setRepoInfoOpen({ id: params.row.id, open: true });
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={styles.tableContainer}
    >
      {isLoading ? (
        <Box sx={styles.loadingBox}>
          <CircularProgress color="inherit" />
        </Box>
      ) : isError ? (
        <Box sx={styles.loadingBox}>
          <Alert 
            severity="warning" 
            sx={styles.errorAlert}
            action={
              <Button 
                color="inherit" 
                size="small" 
                startIcon={<Refresh />}
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            }
          >
            <AlertTitle>Unable to load repository data</AlertTitle>
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
            {githubReposData.length > 0 && (
              <Box sx={styles.errorMessageBox}>
                Showing cached data from previous session. Some information may be outdated.
              </Box>
            )}
          </Alert>
        </Box>
      ) : (
        <Box sx={styles.mainBox(isMobile)}>
          {/* Table Section */}
          <Box sx={styles.tableSection(isMobile)}>
            <Paper elevation={0} sx={styles.paper}>
              <Box sx={styles.controlsBox}>
                <Button
                  variant={showStarredOnly ? "contained" : "outlined"}
                  startIcon={<Star />}
                  onClick={() => setShowStarredOnly(!showStarredOnly)}
                  size="small"
                >
                  {showStarredOnly ? "Show All" : "Show Starred"}
                </Button>
              </Box>
              
              <Search 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              
              <LanguageFilter
                selectedLanguages={selectedLanguages}
                availableLanguages={availableLanguages}
                onLanguageChange={setSelectedLanguages}
                onClearAll={() => setSelectedLanguages([])}
              />
            </Paper>
            
            <ReposTable
              filteredRows={filteredRows}
              starredRepos={starredRepos}
              onStarToggle={handleStarToggle}
              onRowClick={handleRowClick}
              isMobile={isMobile}
            />
          </Box>
        </Box>
      )}

      <RepoDetailsDialog
        repoInfoOpen={repoInfoOpen}
        setRepoInfoOpen={setRepoInfoOpen}
        githubReposData={githubReposData}
      />
    </Container>
  );
}; 