import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import { backend } from 'declarations/backend';
import TaxPayerForm from './components/TaxPayerForm';
import TaxPayerList from './components/TaxPayerList';
import SearchBar from './components/SearchBar';

type TaxPayer = {
  tid: bigint;
  firstName: string;
  lastName: string;
  address: string;
};

const App: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<TaxPayer[]>([]);
  const [searchResults, setSearchResults] = useState<TaxPayer[]>([]);

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result);
      setSearchResults(result);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: TaxPayer) => {
    try {
      await backend.addTaxPayer(
        newTaxPayer.tid,
        newTaxPayer.firstName,
        newTaxPayer.lastName,
        newTaxPayer.address
      );
      fetchTaxPayers();
    } catch (error) {
      console.error('Error adding tax payer:', error);
    }
  };

  const handleSearch = async (tid: bigint) => {
    try {
      const result = await backend.searchTaxPayerByTID(tid);
      if (result.length > 0) {
        setSearchResults([result[0]]);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching tax payer:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TaxPayer Records Management
        </Typography>
        <SearchBar onSearch={handleSearch} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TaxPayerForm onAddTaxPayer={handleAddTaxPayer} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TaxPayerList taxPayers={searchResults.length > 0 ? searchResults : taxPayers} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
