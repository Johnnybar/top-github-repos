import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { styles } from "../style";

interface SearchProps {
  onSearch: (query: string) => void;
}

/**
 * Search component provides a text input field for searching repositories
 * @param onSearch - Callback function called when search query changes
 * @returns JSX element containing the search input field
 */
export const Search = ({ onSearch }: SearchProps) => {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder="Search repositories..."
      onChange={(e) => onSearch(e.target.value)}
      sx={styles.searchTextField}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}; 