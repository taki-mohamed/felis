// ** MUI Import
import MenuItem from '@mui/material/MenuItem';

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field';

const Filter = () => {
  return (
    <CustomTextField
      select
      sx={{ pr: 4, '& .MuiFilledInput-input.MuiSelect-select': { minWidth: '8rem !important' } }}
      label="Select Region" // Corrected syntax: use equal sign for prop assignment
    >
      <MenuItem value=''>Select Region</MenuItem>
      <MenuItem value='downloaded'>Downloaded</MenuItem>
      <MenuItem value='draft'>Draft</MenuItem>
      <MenuItem value='paid'>Paid</MenuItem>
      <MenuItem value='partial payment'>Partial Payment</MenuItem>
      <MenuItem value='past due'>Past Due</MenuItem>
      <MenuItem value='sent'>Sent</MenuItem>
    </CustomTextField>
  );
};

export default Filter;
