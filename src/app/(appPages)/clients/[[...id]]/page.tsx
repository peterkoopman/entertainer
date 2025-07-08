'use client';

import { useEffect, useState, useActionState } from 'react';
import useCountries from '@/hooks/useCountries';
import {
  getBookingsForClient,
  getClient,
  UpdateClient,
  saveClient,
} from '../actions';
import { theme } from '@/utils/muiThemes';
import {
  Box,
  Button,
  CircularProgress,
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
  notes?: string | null;
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
  const [clientExists, setClientExists] = useState(true);
  const [formValues, setFormValues] = useState<Client | Record<string, never>>(
    {}
  );
  const [initialData, setInitialData] = useState<Client | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [country, setCountry] = useState<
    { value: string; label: string } | undefined
  >({ value: '', label: '' });
  const [bookings, setBookings] = useState<Booking[] | []>([]);

  const params = useParams<{ id: string }>();
  const { countries } = useCountries();

  const [formState, formAction, isPending] = useActionState<
    UpdateClient,
    FormData
  >(saveClient, {
    success: false,
    message: '',
  });

  useEffect(() => {
    if (params?.id) {
      getClient(params?.id).then((data) => {
        if (data === null) {
          setClientExists(false);
          return;
        }
        setClientExists(true);
        setFormValues(data);
        setInitialData(data);
        setCountry(
          countries.find((country) => country.value === data?.country)
        );
      });
    }
  }, [params?.id, countries]);

  useEffect(() => {
    getBookingsForClient(params?.id).then((data) => {
      if (data && data?.length > 0) {
        setBookings(data || []);
      }
    });
  }, [params?.id]);

  useEffect(() => {
    if (formState) {
      console.log(formState.message);
    }
    if (formState.success) setIsDirty(false);
  }, [formState]);

  // Use dirty form detection to highlight save button
  useEffect(() => {
    const dirty = Object.keys(formValues).some(
      (key) =>
        formValues?.[key as keyof Client] !== initialData?.[key as keyof Client]
    );
    setIsDirty(dirty);
  }, [initialData, formValues]);

  if (!clientExists) {
    return (
      <ThemeProvider theme={theme}>
        <h2>No client found</h2>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <h1>Client: {formValues?.name}</h1>
      <Box
        component="form"
        action={formAction}
        sx={{
          maxWidth: 720,
          width: 1,
          mr: 'auto',
          ml: 'auto',
        }}>
        <input type="hidden" name="id" value={formValues?.id || ''} />
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
          rows={3}
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
        <TextField
          name="country"
          label="Country"
          select
          value={country?.value || ''}
          onChange={(e) => {
            setCountry({
              value: e.target.value,
              label:
                countries?.find((country) => country?.value === e.target.value)
                  ?.label || '',
            });
            setFormValues({ ...formValues, country: e.target.value });
          }}>
          {countries.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="notes"
          label="Notes"
          multiline
          maxRows={3}
          value={formValues?.notes || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, notes: e.target.value })
          }
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button type="button" variant="contained">
            New Booking
          </Button>
          <Button type="button" variant="outlined">
            Delete
          </Button>
          <Button type="submit" variant={isDirty ? 'contained' : 'outlined'}>
            Save
          </Button>
          {isPending && <CircularProgress size={32} />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
