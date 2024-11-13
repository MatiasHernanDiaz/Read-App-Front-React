import { ChangeEvent, KeyboardEvent, MouseEventHandler } from 'react'; // Solo importa lo necesario
import { TextField, InputAdornment, Button } from '@mui/material';
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
          <Button onClick={onKeyDown as unknown as MouseEventHandler} >
            <Search/>
          </Button>
        ),
      }}
    />
  );
};

export default SearchBar