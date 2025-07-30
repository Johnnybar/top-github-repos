import {
  Dialog,
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Link,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { GithubReposData, RepoInfoState } from "./types";

interface RepoDetailsDialogProps {
  repoInfoOpen: RepoInfoState;
  setRepoInfoOpen: (state: RepoInfoState) => void;
  githubReposData: GithubReposData[];
}

export const RepoDetailsDialog = ({
  repoInfoOpen,
  setRepoInfoOpen,
  githubReposData,
}: RepoDetailsDialogProps) => {
  const handleClose = () => {
    setRepoInfoOpen({ id: null, open: false });
  };

  return (
    <>
      {repoInfoOpen.id !== null &&
        githubReposData.find((repo) => repo.id === repoInfoOpen.id) && (
          <Dialog
            open={repoInfoOpen.open}
            onClose={handleClose}
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
                        <img
                          src={repo.owner.avatar_url}
                          alt="avatar"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                          }}
                        />
                        <Typography
                          variant="h5"
                          component="h2"
                          fontWeight="bold"
                        >
                          {repo.name}
                        </Typography>

                        <IconButton onClick={handleClose} size="small">
                          <Close />
                        </IconButton>
                      </Box>

                      <Box sx={{ px: 2, pb: 1 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                          {repo.full_name}
                        </Typography>
                        <Link
                          href={repo.url}
                          target="_blank"
                          sx={{
                            textDecoration: "none",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            textAlign: "center",
                            width: "100%",
                            pb: 1,
                          }}
                        >
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
                              label={`Language: ${repo.language || "N/A"}`}
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
    </>
  );
}; 