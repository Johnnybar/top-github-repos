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
import { GithubReposData, RepoInfoState } from "../types";
import { styles } from "../styles";
import { isNil } from "ramda";

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
      {!isNil(repoInfoOpen.id) &&
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
                    <CardContent sx={styles.cardContent}>
                      <Box
                        sx={styles.headerBox}
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

                      <Box sx={styles.subtitleBox}>
                        <Typography variant="subtitle1" color="text.secondary">
                          {repo.full_name}
                        </Typography>
                        <Link
                          href={repo.url}
                          target="_blank"
                          sx={styles.dialogLink}
                        >
                          {repo.url}
                        </Link>
                      </Box>

                      <Box sx={styles.linkBox}>
                        <Box sx={styles.chipsContainer}>
                          <Box sx={styles.chipsRow}>
                            <Chip
                              label={`Stars: ${repo.stargazers_count}`}
                              color="primary"
                              variant="outlined"
                              size="small"
                              sx={styles.chip}
                            />
                            <Chip
                              label={`Watchers: ${repo.watchers_count}`}
                              color="secondary"
                              variant="outlined"
                              size="small"
                              sx={styles.chip}
                            />
                          </Box>
                          <Box sx={styles.chipsRow}>
                            <Chip
                              label={`Language: ${!isNil(repo.language) ? repo.language : "N/A"}`}
                              color="info"
                              variant="outlined"
                              size="small"
                              sx={styles.chip}
                            />
                            <Chip
                              label={`Open Issues: ${repo.open_issues_count}`}
                              color="warning"
                              variant="outlined"
                              size="small"
                              sx={styles.chip}
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