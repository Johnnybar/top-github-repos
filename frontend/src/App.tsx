import { 
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { GithubTable } from "./GithubTable";

const App = () => {


  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ 
        height: "100vh", 
        display: "flex", 
        flexDirection: "column",
        width: "100%",
        minWidth: "100%",
        padding: 0,
        margin: 0
      }}
    >
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
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