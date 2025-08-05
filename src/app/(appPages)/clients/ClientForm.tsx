'use client';

import { useEffect, useState, useActionState, MouseEvent } from 'react';
import { ThemeProvider } from '@emotion/react';
import { useFormContext } from '@/context/FormSaveContext';
import { theme } from '@/utils/muiThemes';
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from '@mui/material';
import { saveClient, deleteClient, Country } from './actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Client, Booking } from './actions';

interface ClientFormProps {
  client?: Client | null;
  countries: Country[];
  bookings: Booking[];
}

const ClientForm = ({ client, countries, bookings }: ClientFormProps) => {
  const [formValues, setFormValues] = useState<Client>(client || {});
  const [initialData, setInitialData] = useState<Client>(client || {});
  const [isDirty, setIsDirty] = useState(false);

  const [formState, formAction, isPending] = useActionState(saveClient, {
    success: false,
    message: '',
  });

  const { triggerSidebarUpdate } = useFormContext();

  useEffect(() => {
    if (formState.success) {
      setIsDirty(false);
      // After a successful save, the current form values are the new initial state.
      setInitialData(formValues);
    }
  }, [formState, formValues]);

  // Effect to reset the form when the client prop changes
  useEffect(() => {
    setInitialData(client || {});
    setFormValues(client || {});
  }, [client]);

  // Use dirty form detection to highlight save button
  useEffect(() => {
    const dirty = Object.keys(formValues).some(
      (key) =>
        formValues?.[key as keyof Client] !== initialData?.[key as keyof Client]
    );
    setIsDirty(dirty);
  }, [initialData, formValues]);

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (client?.id) {
      if (confirm('Are you sure you want to delete this client?')) {
        deleteClient(Number(client?.id));
        triggerSidebarUpdate();
        redirect('/clients');
      }
    } else {
      alert('No client found');
    }
  };

  const handleNewBooking = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    triggerSidebarUpdate();
    if (client?.id) {
      redirect(`/booking/new/${client?.id}`);
    } else {
      alert('No client found');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <h1>{formValues?.id ? `Client: ${formValues?.name}` : 'New Client'}</h1>
      <Box
        component="form"
        action={formAction}
        onSubmit={triggerSidebarUpdate}
        sx={{
          maxWidth: 720,
          width: 1,
          mr: 'auto',
          ml: 'auto',
        }}>
        <input type="hidden" name="id" value={formValues?.id || ''} />
        <TextField
          required
          name="name"
          label="Name"
          value={formValues?.name || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
        />
        <TextField
          required
          name="email"
          label="Email"
          value={formValues?.email || ''}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          slotProps={{
            htmlInput: {
              type: 'email',
            },
          }}
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
          value={formValues?.country || ''}
          onChange={(e) => {
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
                  href={`/booking/${booking.id}`}>{`${booking.date}, ${booking.start_time} - ${booking.venue_name}`}</Link>
              </MenuItem>
            ))}
          </TextField>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Button type="button" variant="contained" onClick={handleNewBooking}>
            New Booking
          </Button>
          <Button type="button" variant="outlined" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            data-testid="saveButton"
            type="submit"
            variant={isDirty ? 'contained' : 'outlined'}>
            Save
          </Button>
          {isPending && <CircularProgress size={32} />}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ClientForm;
