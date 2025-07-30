import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Chip,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Tooltip,
  Link,
} from "@mui/material";
import {
  Search,
  Star,
  StarBorder,
  StarRate,
  Terminal,
} from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GithubReposData, GithubApiResponse, GithubApiItem, RepoInfoState } from "./types";
import { githubReposMock } from "./mocks";
import { RepoDetailsDialog } from "./RepoDetailsDialog";
import { styles } from "./styles";


// API function
const fetchGithubRepos = async (): Promise<GithubReposData[]> => {
  const response = await fetch("/api/github-repos");
  
  if (!response.ok) {
    //TODO - Should we use fallback or throw an error as well?
    return githubReposMock.items as GithubReposData[];
  }

  const text = await response.text();
  const data: GithubApiResponse = JSON.parse(text);
  
  const filteredData = data.items.map((item: GithubApiItem, index: number) => ({
    id: item.id || index,
    url: item.html_url,
    stargazers_count: item.stargazers_count,
    language: item.language || 'N/A',
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

export const GithubTable = () => {
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
  const { data: githubReposData = [], isLoading, error } = useQuery<GithubReposData[]>({
    queryKey: ['github-repos'],
    queryFn: fetchGithubRepos,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Extract languages whenever data changes
  useEffect(() => {
    if (Array.isArray(githubReposData) && githubReposData.length > 0) {
      const languages: string[] = [];
      githubReposData.forEach((item: GithubReposData) => {
        if (item.language && !languages.includes(item.language)) {
          languages.push(item.language);
        }
      });
      languages.sort();
      setAvailableLanguages(languages);
    }
  }, [githubReposData]);



  // Filter data when search term or data changes
  useEffect(() => {
    
    if (Array.isArray(githubReposData) && githubReposData.length > 0) {
      let filtered = githubReposData.filter((repo: GithubReposData) => {
        const matchesSearch = repo.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repo.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          repo.language?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesLanguage = selectedLanguages.length === 0 || (repo.language && selectedLanguages.includes(repo.language || ''));
        
        // If showing starred only, also check if repo is starred
        if (showStarredOnly) {
          return matchesSearch && matchesLanguage && repo.id && starredRepos.has(repo.id);
        }
        
        return matchesSearch && matchesLanguage;
      });
      setFilteredRows(filtered);
    }
  }, [githubReposData, searchTerm, showStarredOnly, starredRepos, selectedLanguages]);

const columns: GridColDef[] = [
  {
    field: "star",
    headerName: "Star",
    width: 80,
    align: "center",
    headerAlign: "center",
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          if (params.row.id) {
            handleStarToggle(params.row.id);
          }
        }}
        color={starredRepos.has(params.row.id) ? "primary" : "default"}
      >
        {starredRepos.has(params.row.id) ? <StarRate /> : <StarBorder />}
      </IconButton>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    //TODO - keep or lose minWidth? relevant to all the below
    maxWidth: 200,
    filterable: false,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography variant="body2" color="text.secondary" sx={styles.nameCell}>
          {params.value}
        </Typography>
      </Tooltip>
    ),
  },
  {    field: "description",
    headerName: "Description",
    width: 200,
    renderCell: (params) => (
      <Tooltip title={params.value}>
        <Typography variant="body2" color="text.secondary" sx={styles.descriptionCell}>
          {params.value}
        </Typography>
      </Tooltip>
    ),
  },
  {
    field: "url",
    headerName: "URL",
    flex: 1,
    sortable: false,
    filterable: false,
    // minWidth: 150,
    renderCell: (params) => (
      <Link href={params.value} target="_blank" sx={styles.urlCell}>
        {params.value}
      </Link>
    ),
  },
  {
    field: "language",
    headerName: "language",
    flex: 1,
    minWidth: 150,
    filterable: false,
    renderCell: (params) => (
      <Chip
        size="small"
        label={params.value}
        variant="outlined"
      />
    ),
  },
  {
    field: "stargazers_count",
    headerName: "Stars",
    width: 120,
    filterable: false,
    renderCell: (params) => (
      <Chip
        size="small"
        icon={<Star fontSize="small" />}
        label={params.value}
        variant="outlined"
      />
    ),
  },
  {
    field: "owner.avatar_url",
    headerName: "Avatar",
    width: 100,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <img src={params.row.owner.avatar_url} alt="avatar" style={{ width: 32, height: 32, borderRadius: "50%" }} />
    )
  },
  {
    field: "open_issues_count",
    headerName: "Open Issues",
    flex: 1,
    minWidth: 150,
    filterable: false,
  },
]

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={styles.tableContainer}
    >
      {isLoading ? (
        <Box
          sx={styles.loadingBox}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box
          sx={styles.mainBox(isMobile)}
        >
          {/* Table Section */}
          <Box
            sx={styles.tableSection(isMobile)}
          >
            <Paper
              elevation={0}
              sx={styles.paper}
            >
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
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={styles.searchTextField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={styles.filtersBox}>
                <FormControl size="small" sx={styles.formControl}>
                  <InputLabel>Language</InputLabel>
                 
                  <Select
                    multiple
                    value={selectedLanguages}
                    label="Language"
                    onChange={(e) => setSelectedLanguages(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    input={<OutlinedInput label="Language" />}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          width: 250,
                        },
                      },
                    }}
                  >
                      
                    {availableLanguages.map((language) => (
                      <MenuItem key={language} value={language}>
                        <Checkbox checked={selectedLanguages.includes(language)} />
                        <ListItemText primary={language} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedLanguages.length > 0 && (
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setSelectedLanguages([])}
                    sx={styles.clearButton}
                  >
                    Clear All
                  </Button>
                )}
              </Box>
              <Typography variant="caption" color="text.secondary">
                  {filteredRows.length} repos found 
              </Typography>
            </Paper>
            <Box sx={styles.dataGridContainer(isMobile)}>
              <DataGrid
                rows={filteredRows || []}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                  },
                  sorting: {
                    sortModel: [{ field: "watchers_count", sort: "asc" }],
                  },
                }}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick={false}
                hideFooterSelectedRowCount={true}
                onRowClick={(params) => {
                  setRepoInfoOpen({ id: params.row.id, open: true });
                }}
                sx={styles.dataGrid}
              />
            </Box>
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