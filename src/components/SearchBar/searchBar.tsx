import { ChangeEvent, KeyboardEvent, MouseEventHandler } from 'react'; // Solo importa lo necesario
import { TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (event: KeyboardEvent) => void
  onSearchClick: MouseEventHandler 
  label?: string
}

const SearchBar = ({ value, onChange, onKeyDown, label = "Buscar" ,onSearchClick}: SearchBarProps) => {
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
          <Button onClick={onSearchClick}> 
            <Search />
          </Button>
        ),
      }}
    />
  );
};

export default SearchBar