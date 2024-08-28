import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

type SearchBarProps = {
  onSearch: (tid: bigint) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTid, setSearchTid] = useState('');

  const handleSearch = () => {
    if (searchTid) {
      onSearch(BigInt(searchTid));
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        label="Search by TID"
        variant="outlined"
        value={searchTid}
        onChange={(e) => setSearchTid(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
