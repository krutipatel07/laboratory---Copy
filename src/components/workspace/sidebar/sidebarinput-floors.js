import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function floorSelect() {
  const [floors, setFloors] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Floors</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={floors}
          label="Floors"
          onChange={handleChange}
        >
          <MenuItem value={10}>Once</MenuItem>
          <MenuItem value={20}>Two</MenuItem>
          <MenuItem value={30}>Three</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}