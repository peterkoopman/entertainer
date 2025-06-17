'use client';

import useCountries from '@/hooks/useCountries';
import { theme } from '@/utils/muiThemes';
import {
  Autocomplete,
  Box,
  Button,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { useParams } from 'next/navigation';

export default function ClientPage() {
  const params = useParams<{ id: string[] }>();
  const { countries } = useCountries();

  return (
    <ThemeProvider theme={theme}>
      <h1>Client</h1>
      <Box
        component="form"
        sx={{
          maxWidth: 720,
          width: 1,
          mr: 'auto',
          ml: 'auto',
        }}>
        <TextField name="name" label="Name" />
        <TextField name="email" label="Email" />
        <TextField name="company" label="Company" />
        <TextField name="phone" label="Phone" />
        <TextField name="address" label="Address" />
        <TextField name="city" label="City" />
        <Autocomplete
          options={countries}
          renderInput={(params) => <TextField {...params} label="Country" />}
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
        <Button type="button" variant="outlined">
          Delete
        </Button>
        <Button type="button" variant="contained">
          New Booking
        </Button>
      </Box>
    </ThemeProvider>
  );
}
