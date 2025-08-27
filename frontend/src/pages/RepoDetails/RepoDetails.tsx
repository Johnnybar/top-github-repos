import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Skeleton,
  Alert,
} from "@mui/material";
import { ArrowBack, Star, Visibility, BugReport } from "@mui/icons-material";
import { GithubReposData } from "../../types/repo";
import { styles } from "../../style";

/**
 * RepoDetails page component that displays detailed information about a specific repository
 * @returns JSX element containing the repository details view
 */
const RepoDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [repo, setRepo] = useState<GithubReposData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the specific repo by ID
    // For now, we'll simulate this with mock data
    setLoading(false);
    // Mock data - replace with actual API call
    setRepo({
      id: parseInt(id || "0"),
      name: "sample-repo",
      full_name: "owner/sample-repo",
      description: "A sample repository for demonstration purposes",
      clone_url: "https://github.com/owner/sample-repo.git",
      stargazers_count: 1234,
      language: "TypeScript",
      watchers_count: 567,
      open_issues_count: 89,
      owner: {
        avatar_url: "https://via.placeholder.com/40",
        html_url: "https://github.com/owner",
      },
    });
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={styles.container}>
        <Skeleton variant="text" width="60%" height={60} />
        <Skeleton variant="rectangular" height={400} />
      </Container>
    );
  }

  if (error || !repo) {
    return (
      <Container maxWidth="md" sx={styles.container}>
        <Alert severity="error">
          {error || "Repository not found"}
        </Alert>
        <Button onClick={handleBack} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={styles.container}>
      <Button
        startIcon={<ArrowBack />}
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        Back to Home
      </Button>

      <Card>
        <CardContent>
          <Box sx={styles.repoHeader}>
            <Avatar
              src={repo.owner.avatar_url}
              alt={repo.owner.html_url}
              sx={{ width: 60, height: 60, mr: 2 }}
            />
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {repo.full_name || repo.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {repo.description || "No description available"}
              </Typography>
            </Box>
          </Box>

          <Box sx={styles.repoStats}>
            <Chip
              icon={<Star />}
              label={`${repo.stargazers_count} stars`}
              variant="outlined"
            />
            <Chip
              icon={<Visibility />}
              label={`${repo.watchers_count} watchers`}
              variant="outlined"
            />
            <Chip
              icon={<BugReport />}
              label={`${repo.open_issues_count} issues`}
              variant="outlined"
            />
            {repo.language && (
              <Chip label={repo.language} color="primary" />
            )}
          </Box>

          <Box sx={styles.repoActions}>
            <Button
              variant="outlined"
              href={repo.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Owner Profile
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RepoDetails;

