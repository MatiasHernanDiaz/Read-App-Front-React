import {  useState } from 'react'; // Solo importa lo necesario
import { TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  searchCallBack: (text:string) => void
  label?: string
}

const SearchBar = ({searchCallBack, label = "Buscar" }: SearchBarProps) => {
  const [searchText, setSearchText] = useState('')
  return (
    <TextField
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value)
      }}
      onKeyDown={(e) => {
        if(e.key === 'Enter'){
          searchCallBack(searchText)
        }
      }}
      variant="outlined"
      sx={{ display: 'flex', justifyContent: 'center', margin: '1rem' }}
      label={label}
      InputProps={{
        endAdornment: (
          <Button onClick={() =>{ searchCallBack(searchText) }}> 
            <Search />
          </Button>
        ),
      }}
    />
  );
};

export default SearchBar