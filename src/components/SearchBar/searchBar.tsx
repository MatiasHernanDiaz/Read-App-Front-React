import { ChangeEvent, KeyboardEvent } from 'react'; // Solo importa lo necesario
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (event: KeyboardEvent) => void
  label?: string
}

const SearchBar = ({ value, onChange, onKeyDown, label = "Buscar" }: SearchBarProps) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      variant="outlined"
      sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search/>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar