import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { GithubTable } from "./GithubTable";
import { styles } from "./styles";

const App = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={styles.container}
    >
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={styles.appBarTitle}
          >
            Most popular Github Repositories
          </Typography>
        </Toolbar>
      </AppBar>
      <GithubTable />
    </Container>
  );
};

export default App;