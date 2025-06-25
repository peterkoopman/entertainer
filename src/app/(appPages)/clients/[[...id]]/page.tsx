'use client';

import { useEffect, useState } from 'react';
import useCountries from '@/hooks/useCountries';
import { theme } from '@/utils/muiThemes';
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { useParams } from 'next/navigation';

export default function ClientPage() {
  // TODO: set this on fetch
  const [hasBookings, setHasBookings] = useState(false);
  const params = useParams<{ id: string[] }>();
  const { countries } = useCountries();

  useEffect(() => {
    setHasBookings(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <h1>Client {params.id}</h1>
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
        {hasBookings && (
          <TextField name="bookings" label="Bookings" select>
            {/* TODO: Populate bookings */}
            <MenuItem value="1">Booking 1</MenuItem>
            <MenuItem value="2">Booking 2</MenuItem>
          </TextField>
        )}
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
