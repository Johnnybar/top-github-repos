import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { styles } from "../style";

interface SearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Search = ({ searchTerm, onSearchChange }: SearchProps) => {
  return (
    <TextField
      fullWidth
      size="small"
      variant="outlined"
      placeholder="Search repositories..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
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