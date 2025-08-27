import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Chip,
  Button,
  Box,
} from "@mui/material";
import { Star, Visibility, BugReport, Language } from "@mui/icons-material";
import { GithubReposData } from "../../types/repo";
import { styles } from "../../style";

interface RepoCardProps {
  repo: GithubReposData;
  onClick: (repo: GithubReposData) => void;
}

/**
 * RepoCard component displays a single repository in a card format
 * @param repo - The repository data to display
 * @param onClick - Callback function when the card is clicked
 * @returns JSX element containing the repository card
 */
const RepoCard = ({ repo, onClick }: RepoCardProps) => {
  const handleClick = () => {
    onClick(repo);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={repo.owner.avatar_url}
            alt={repo.owner.html_url}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" component="h3" gutterBottom sx={styles.nameCell}>
              {repo.full_name || repo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by {repo.owner.html_url.split("/").pop()}
            </Typography>
          </Box>
        </Box>

        {repo.description && (
          <Typography variant="body2" paragraph>
            {repo.description}
          </Typography>
        )}

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          <Chip
            icon={<Star />}
            label={repo.stargazers_count}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<Visibility />}
            label={repo.watchers_count}
            size="small"
            variant="outlined"
          />
          <Chip
            icon={<BugReport />}
            label={repo.open_issues_count}
            size="small"
            variant="outlined"
          />
          {repo.language && (
            <Chip
              icon={<Language />}
              label={repo.language}
              size="small"
              color="primary"
            />
          )}
        </Box>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={handleClick}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default RepoCard;

