import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  OutlinedInput,
} from "@mui/material";
import { styles } from "../style";

interface LanguageFilterProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  availableLanguages: string[];
}

/**
 * LanguageFilter component provides a dropdown to filter repositories by programming language
 * @param selectedLanguage - Currently selected language filter
 * @param onLanguageChange - Callback function when language selection changes
 * @returns JSX element containing the language filter dropdown
 */
export const LanguageFilter = ({
  selectedLanguage,
  onLanguageChange,
  availableLanguages,
}: LanguageFilterProps) => {
  // Use available languages from data, fallback to common languages if none available
  const languages = availableLanguages.length > 0 ? availableLanguages : [
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby"
  ];

  const handleClear = () => {
    onLanguageChange("");
  };

  return (
    <Box sx={styles.filtersBox}>
      <FormControl size="small" sx={styles.formControl}>
        <InputLabel>Language</InputLabel>
        <Select
          value={selectedLanguage}
          label="Language"
          onChange={(e) => onLanguageChange(e.target.value)}
          input={<OutlinedInput label="Language" />}
        >
          <MenuItem value="">
            <em>All Languages</em>
          </MenuItem>
          {languages.map((language) => (
            <MenuItem key={language} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedLanguage && (
        <Button
          size="small"
          variant="outlined"
          onClick={handleClear}
          sx={styles.clearButton}
        >
          Clear
        </Button>
      )}
    </Box>
  );
}; 