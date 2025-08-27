import {
  Dialog,
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Link,
  Avatar,
  Button,
} from "@mui/material";
import { Close, Star, Visibility, BugReport, Language, OpenInNew, ContentCopy } from "@mui/icons-material";
import { GithubReposData, RepoInfoState } from "../types/repo";
import { styles } from "../style";
import { isNil } from "ramda";

interface RepoDetailsDialogProps {
  open: boolean;
  repoId: number | null;
  onClose: () => void;
  repos?: GithubReposData[]; // Pass repos to find the selected one
}

/**
 * RepoDetailsDialog component displays detailed information about a repository in a dialog
 * @param open - Whether the dialog is open
 * @param repoId - The ID of the repository to display
 * @param onClose - Callback function to close the dialog
 * @param repos - Array of repositories to find the selected one by ID
 * @returns JSX element containing the repository details dialog
 */
export const RepoDetailsDialog = ({
  open,
  repoId,
  onClose,
  repos = [],
}: RepoDetailsDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  // Find the selected repository
  const selectedRepo = repos.find(repo => repo.id === repoId);

  if (!open || !repoId || !selectedRepo) {
    return null;
  }

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <Card elevation={0}>
        <CardContent sx={styles.cardContent}>
          <Box sx={styles.headerBox}>
            <Typography
              variant="h5"
              component="h2"
              fontWeight="bold"
            >
              {selectedRepo.full_name || selectedRepo.name}
            </Typography>
            <IconButton onClick={handleClose} size="small" aria-label="Close">
              <Close />
            </IconButton>
          </Box>

          <Box sx={styles.subtitleBox}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar
                src={selectedRepo.owner.avatar_url}
                alt={selectedRepo.owner.html_url}
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Typography variant="body1" color="text.secondary">
                  by {selectedRepo.owner.html_url.split("/").pop()}
                </Typography>
                <Link
                  href={selectedRepo.owner.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  View Profile <OpenInNew sx={{ fontSize: 16 }} />
                </Link>
              </Box>
            </Box>
          </Box>

          {selectedRepo.description && (
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography variant="body1" paragraph>
                {selectedRepo.description}
              </Typography>
            </Box>
          )}

          <Box sx={{ px: 2, pb: 2 }}>
            <Box sx={styles.chipsContainer}>
              <Chip
                icon={<Star />}
                label={`${selectedRepo.stargazers_count} stars`}
                variant="outlined"
                color="warning"
              />
              <Chip
                icon={<Visibility />}
                label={`${selectedRepo.watchers_count} watchers`}
                variant="outlined"
                color="info"
              />
              <Chip
                icon={<BugReport />}
                label={`${selectedRepo.open_issues_count} issues`}
                variant="outlined"
                color="error"
              />
              {selectedRepo.language && (
                <Chip
                  icon={<Language />}
                  label={selectedRepo.language}
                  color="primary"
                />
              )}
            </Box>
          </Box>

          <Box sx={{ px: 2, pb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Repository URL
            </Typography>
            <Box sx={styles.urlCellContainer}>
              <Typography variant="body2" sx={styles.urlCellText}>
                {selectedRepo.clone_url}
              </Typography>
              <Box sx={styles.urlButtonsContainer}>
                <IconButton
                  size="small"
                  onClick={() => handleCopyUrl(selectedRepo.clone_url)}
                  title="Copy URL"
                >
                  <ContentCopy />
                </IconButton>
                <IconButton
                  size="small"
                  href={selectedRepo.clone_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new tab"
                >
                  <OpenInNew />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Dialog>
  );
}; 