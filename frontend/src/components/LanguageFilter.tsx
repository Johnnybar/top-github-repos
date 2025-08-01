import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Chip,
  Button,
} from "@mui/material";
import { styles } from "../style";

interface LanguageFilterProps {
  selectedLanguages: string[];
  availableLanguages: string[];
  onLanguageChange: (languages: string[]) => void;
  onClearAll: () => void;
}

export const LanguageFilter = ({
  selectedLanguages,
  availableLanguages,
  onLanguageChange,
  onClearAll,
}: LanguageFilterProps) => {
  return (
    <Box sx={styles.filtersBox}>
      <FormControl size="small" sx={styles.formControl}>
        <InputLabel>Language</InputLabel>
        <Select
          multiple
          value={selectedLanguages}
          label="Language"
          onChange={(e) =>
            onLanguageChange(
              typeof e.target.value === "string"
                ? e.target.value.split(",")
                : e.target.value
            )
          }
          renderValue={(selected) => (
            <Box sx={styles.languageChipsContainer}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          input={<OutlinedInput label="Language" />}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                width: 250,
              },
            },
          }}
        >
          {availableLanguages.map((language) => (
            <MenuItem key={language} value={language}>
              <Checkbox checked={selectedLanguages.includes(language)} />
              <ListItemText primary={language} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedLanguages.length > 0 && (
        <Button
          size="small"
          variant="outlined"
          onClick={onClearAll}
          sx={styles.clearButton}
        >
          Clear All
        </Button>
      )}
    </Box>
  );
}; 