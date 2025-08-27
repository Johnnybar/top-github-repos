import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import RepoDetails from "../pages/RepoDetails";

/**
 * AppRoutes component handles all routing logic for the application
 * @returns JSX element containing the route configuration
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repo/:id" element={<RepoDetails />} />
    </Routes>
  );
};

export default AppRoutes;
