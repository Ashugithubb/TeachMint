import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
//import { fetchFilteredData } from '../store/yourThunkFile'; // 🔁 replace with actual thunk path

export default function FilterComponent() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({ category: '', status: '' });

  const handleChange = (e:any) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //const applyFilter = () => dispatch(fetchFilteredData(filters));

  return (
    <Box display="flex" gap={2} alignItems="center">
      <FormControl size="small">
        <InputLabel>Category</InputLabel>
        <Select name="category" value={filters.category} label="Category" onChange={handleChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="tech">Tech</MenuItem>
          <MenuItem value="health">Health</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small">
        <InputLabel>Status</InputLabel>
        <Select name="status" value={filters.status} label="Status" onChange={handleChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" >Apply</Button>
    </Box>
  );
}
