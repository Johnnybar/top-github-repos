import { BrowserRouter } from "react-router-dom";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import AppRoutes from "./routes/AppRoutes";
import { styles } from "./style";

/**
 * App component serves as the root component that sets up routing and the main layout
 * @returns JSX element containing the app structure with routing
 */
const App = () => {
  return (
    <BrowserRouter>
      <Container
        maxWidth={false}
        disableGutters
        sx={styles.container}
      >
        <AppBar position="static" color="primary" elevation={2} sx={styles.appBar}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={styles.appBarTitle}
            >
              Top Github Repositories
            </Typography>
          </Toolbar>
        </AppBar>
        <AppRoutes />
      </Container>
    </BrowserRouter>
  );
};

export default App;

