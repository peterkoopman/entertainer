'use client';

import { useEffect, useState } from 'react';
import useCountries from '@/hooks/useCountries';
import { getBookingsForClient, getClient } from '../actions';
import { theme } from '@/utils/muiThemes';
import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Client {
  id?: number | null;
  name?: string | null;
  email?: string | null;
  company?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

interface Booking {
  id: number;
  date?: string | null;
  venue_name?: string | null;
  start_time?: string | null;
  end_time?: string | null;
}

export default function ClientPage() {
  const [formValues, setFormValues] = useState<Client | null>(null);
  const [country, setCountry] = useState<
    { value: string; label: string } | undefined
  >({ value: '', label: '' });
  const [bookings, setBookings] = useState<Booking[] | []>([]);
  const params = useParams<{ id: string }>();
  const { countries } = useCountries();

  useEffect(() => {
    getClient(params?.id).then((data) => {
      setFormValues(data);
      setCountry(countries.find((country) => country.value === data?.country));
    });
  }, [params?.id, countries]);

  useEffect(() => {
    getBookingsForClient(params?.id).then((data) => {
      if (data && data?.length > 0) {
        setBookings(data || []);
      }
    });
  }, [params?.id]);

  return (
    <ThemeProvider theme={theme}>
      <h1>Client: {formValues?.name}</h1>
      <Box
        component="form"
        sx={{
          maxWidth: 720,
          width: 1,
          mr: 'auto',
          ml: 'auto',
        }}>
        <TextField
          name="name"
          label="Name"
          value={formValues?.name || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
        />
        <TextField
          name="email"
          label="Email"
          value={formValues?.email || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
        />
        <TextField
          name="company"
          label="Company"
          value={formValues?.company || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, company: e.target.value })
          }
        />
        <TextField
          name="phone"
          label="Phone"
          value={formValues?.phone || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, phone: e.target.value })
          }
        />
        <TextField
          name="address"
          label="Address"
          multiline
          maxRows={3}
          value={formValues?.address || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, address: e.target.value })
          }
        />
        <TextField
          name="city"
          label="City"
          value={formValues?.city || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, city: e.target.value })
          }
        />
        <Autocomplete
          options={countries}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} label="Country" />}
          value={country || { value: '', label: '' }}
          onChange={(event, newValue) => {
            setCountry(newValue || country);
            setFormValues({ ...formValues, country: newValue?.value });
          }}
        />
        {bookings.length > 0 && (
          <TextField name="bookings" label="Bookings" select value="">
            {bookings.map((booking) => (
              <MenuItem key={booking.id}>
                <Link
                  href={`/bookings/${booking.id}`}>{`${booking.date}, ${booking.start_time} - ${booking.venue_name}`}</Link>
              </MenuItem>
            ))}
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
