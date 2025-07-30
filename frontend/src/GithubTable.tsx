import {  useEffect, useState } from "react";
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
  Dialog,
  Card,
  CardContent,
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
  Close,
  StarBorder,
  StarRate,
  Terminal,
} from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GithubReposData } from "./context/context";
import { githubReposMock } from "./mocks";


// API function
const fetchGithubRepos = async (): Promise<GithubReposData[]> => {
  const response = await fetch("/api/github-repos");
  
  if (!response.ok) {
    //TODO - Should we use fallback or throw an error as well?
    return githubReposMock.items as GithubReposData[];
  }

  const text = await response.text();
  const data = JSON.parse(text);
  console.log('data', data);
  
  const filteredData = data.items.map((item: any, index: number) => ({
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
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [repoInfoOpen, setRepoInfoOpen] = useState<{
    id: number | null;
    open: boolean;
  }>({ id: null, open: false });
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
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
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
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-wrap", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
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
      <Link href={params.value} target="_blank" sx={{ textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
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
    field: "languages",
    headerName: "Languages",
    minWidth: 120,
    renderCell: (params) => {
      if (!params.value || params.value === null || params.value === undefined) {
        return <Typography variant="body2" color="text.secondary">N/A</Typography>;
      } else {
        return params.value.split(',').map((language: string, index: number) => (
          <Box key={index} sx={{ display: "flex", flexDirection: "column", gap: 1 }}> 
            <Chip
              size="small"
              icon={<Terminal fontSize="small" />}
              label={language}
              variant="outlined"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            />
          </Box>
        ))
      }
    },
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
    <>
    <Container
      maxWidth={false}
      disableGutters
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
 
      {isLoading ? (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.default",
            height: "100%",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          {/* Table Section */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              borderRight: isMobile ? "none" : "1px solid #e0e0e0",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "background.default",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
             
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
                sx={{ mb: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: "flex", gap: 2, mb: 1, alignItems: "flex-end" }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
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
                    sx={{ height: 40 }}
                  >
                    Clear All
                  </Button>
                )}
              </Box>
              <Typography variant="caption" color="text.secondary">
                  {filteredRows.length} repos found 
              </Typography>
            </Paper>

            <Box sx={{ flexGrow: 1, height: isMobile ? "300px" : "auto" }}>
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
                onRowClick={(params) => {
                  setRepoInfoOpen({ id: params.row.id, open: true });
                }}
       
                sx={{
                  border: "none",
                  "& .MuiDataGrid-cell:focus-within": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                    cursor: "pointer",
                  },
                  "& .selected-row": {
                    backgroundColor: "rgba(25, 118, 210, 0.12) !important",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "rgba(25, 118, 210, 0.08)",
                    color: "text.primary",
                    fontWeight: "bold",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      )} 
       

      {/* Repo Details Dialog */}
      {repoInfoOpen.id !== null &&
        githubReposData.find((repo) => repo.id === repoInfoOpen.id) && (
          <Dialog
            open={repoInfoOpen.open}
            onClose={() => setRepoInfoOpen({ id: null, open: false })}
            maxWidth="sm"
            fullWidth
          >
            {githubReposData.map((repo: GithubReposData) => {
              if (repo.id === repoInfoOpen.id) {
                return (
                  <Card key={repo.id} elevation={0}>
                    <CardContent sx={{ p: 0 }}>
                      <Box
                        sx={{
                          p: 2,
                          pb: 1,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <img src={repo.owner.avatar_url} alt="avatar" style={{ width: 32, height: 32, borderRadius: "50%" }} />
                        <Typography
                          variant="h5"
                          component="h2"
                          fontWeight="bold"
                        >
                          {repo.name}
                        </Typography>
                        
                        <IconButton onClick={() => setRepoInfoOpen({ id: null, open: false })} size="small">
                          <Close />
                        </IconButton>
                      </Box>

                      <Box sx={{ px: 2, pb: 1 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                          {repo.full_name}
                        </Typography>
                        <Link href={repo.url} target="_blank" sx={{ textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", textAlign: "center", width: "100%", pb:1 }}>
                          {repo.url}
                        </Link>
                      </Box>

                      <Box sx={{ px: 2, pb: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Chip
                              label={`Stars: ${repo.stargazers_count}`}
                              color="primary"
                              variant="outlined"
                              size="small"
                              sx={{ flex: 1 }}
                            />
                            <Chip
                              label={`Watchers: ${repo.watchers_count}`}
                              color="secondary"
                              variant="outlined"
                              size="small"
                              sx={{ flex: 1 }}
                            />
                          </Box>
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Chip
                              label={`Language: ${repo.language || 'N/A'}`}
                              color="info"
                              variant="outlined"
                              size="small"
                              sx={{ flex: 1 }}
                            />
                            <Chip
                              label={`Open Issues: ${repo.open_issues_count}`}
                              color="warning"
                              variant="outlined"
                              size="small"
                              sx={{ flex: 1 }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              }
              return null;
            })}
          </Dialog>
        )}
      </Container>
    </>
  );
};