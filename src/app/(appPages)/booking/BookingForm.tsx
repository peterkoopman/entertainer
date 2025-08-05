'use client';

import { useActionState, useEffect, useState, useCallback } from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/muiThemes';
import {
  Box,
  Button,
  CircularProgress,
  FormGroup,
  TextField,
  MenuItem,
  FormControl,
  InputAdornment,
} from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import style from './booking.module.css';
import { Booking, saveBooking, UpdateResult, deleteBooking } from './actions';
import dayjs from 'dayjs';
import 'dayjs/locale/en-nz';
import Link from 'next/link';
import { Client } from '../clients/actions';
import { redirect } from 'next/navigation';

interface DropdownOption {
  id: number | null;
  name: string | null;
  description: string | null;
}

interface BookingFormProps {
  booking?: Booking | null;
  client?: Client | null;
  setups: DropdownOption[] | null;
  statuses: DropdownOption[] | null;
  types: DropdownOption[] | null;
  taxTypes: DropdownOption[] | null;
}

export default function BookingForm({
  booking,
  client,
  setups,
  statuses,
  types,
  taxTypes,
}: BookingFormProps) {
  const [formState, formAction, isPending] = useActionState<
    UpdateResult,
    FormData
  >(saveBooking, {
    success: false,
    message: '',
  });
  const [isDirty, setIsDirty] = useState(false);
  const [bookingData, setBookingData] = useState<Booking | null>(
    booking || null
  );

  // Use dirty form detection to highlight save button
  useEffect(() => {
    if (bookingData) {
      const dirty = Object.keys(bookingData).some(
        (key) =>
          bookingData?.[key as keyof Booking] !==
          booking?.[key as keyof Booking]
      );
      setIsDirty(dirty);
    }
  }, [booking, bookingData]);

  useEffect(() => {
    // Reset save button highlight on Save
    if (formState.success) setIsDirty(false);
  }, [formState]);

  // add time and date field data to formData for saving to database
  const wrappedFormAction = useCallback(
    async (formData: FormData) => {
      formData.set('date', bookingData?.date || '');
      formData.set('load_in', bookingData?.load_in || '');
      formData.set('start_time', bookingData?.start_time || '');
      formData.set('end_time', bookingData?.end_time || '');
      formAction(formData);
    },
    [bookingData, formAction]
  );

  const handleDelete = async () => {
    if (!booking?.id) return;
    if (confirm('Are you sure you want to delete this booking?')) {
      await deleteBooking(booking.id).then((data) => {
        if (data.success) {
          redirect(`/clients/${bookingData?.client_id || ''}`);
        } else {
          alert(data.message);
        }
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1>Booking</h1>
        <h2>
          Client:{' '}
          <Link
            href={`/clients/${bookingData?.client_id || client?.id || ''}`}>{`${
            bookingData?.client?.name || client?.name || ''
          }${
            (bookingData?.client?.name && bookingData?.client?.company) ||
            (client?.name && client?.company)
              ? ', '
              : ''
          }${bookingData?.client?.company || client?.company || ''}`}</Link>
        </h2>
        <Box component="form" className={style.form} action={wrappedFormAction}>
          <input type="hidden" name="id" value={bookingData?.id || ''} />
          <input
            type="hidden"
            name="client_id"
            value={bookingData?.client_id || client?.id || ''}
          />
          <TextField
            required
            name="venue_name"
            label="Venue"
            value={bookingData?.venue_name || ''}
            onChange={(e) =>
              setBookingData({
                ...bookingData,
                venue_name: e.target.value,
              })
            }
          />
          <TextField
            name="address"
            label="Address"
            multiline
            rows={3}
            value={bookingData?.address || ''}
            onChange={(e) =>
              setBookingData({
                ...bookingData,
                address: e.target.value,
              })
            }
          />
          <Box component="div" className={style.dateTimes}>
            <FormGroup className={style.halfWidth}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={'en-nz'}>
                <FormControl sx={{ mt: 2, mb: 2 }}>
                  <DatePicker
                    label="Date"
                    format="DD/MM/YYYY"
                    value={dayjs(bookingData?.date || null)}
                    onChange={(e) => {
                      setBookingData({
                        ...bookingData,
                        date: e?.format('YYYY-MM-DD') || null,
                      });
                    }}
                  />
                </FormControl>
                <FormControl sx={{ mt: 2, mb: 2 }}>
                  <TimePicker
                    label="Load in"
                    ampm={false}
                    value={dayjs(bookingData?.load_in, 'HH:mm')}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        load_in: e?.format('HH:mm:ss'),
                      })
                    }
                  />
                </FormControl>
                <FormControl sx={{ mt: 2, mb: 2 }}>
                  <TimePicker
                    label="Start Time"
                    ampm={false}
                    value={dayjs(bookingData?.start_time, 'HH:mm')}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        start_time: e?.format('HH:mm:ss'),
                      })
                    }
                  />
                </FormControl>
                <FormControl sx={{ mt: 2, mb: 2 }}>
                  <TimePicker
                    label="End Time"
                    ampm={false}
                    value={dayjs(bookingData?.end_time, 'HH:mm')}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        end_time: e?.format('HH:mm:ss'),
                      })
                    }
                  />
                </FormControl>
                <TextField
                  name="setup_id"
                  label="Setup"
                  select
                  value={Number(bookingData?.setup_id) || ''}
                  onChange={(e) =>
                    setBookingData({
                      ...bookingData,
                      setup_id: Number(e.target.value),
                    })
                  }>
                  {setups?.map((setup) => (
                    <MenuItem value={setup.id as number} key={setup.id}>
                      {setup.name}
                    </MenuItem>
                  ))}
                </TextField>
              </LocalizationProvider>
            </FormGroup>
            <FormGroup className={style.halfWidth}>
              <TextField
                label="Fee"
                name="fee"
                type="number"
                value={bookingData?.fee || ''}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    fee: Number(e.target.value),
                  })
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Deposit"
                name="deposit"
                type="number"
                value={bookingData?.deposit || ''}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    deposit: Number(e.target.value),
                  })
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                name="tax_type_id"
                label="Tax type"
                select
                value={Number(bookingData?.tax_type_id) || ''}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    tax_type_id: Number(e.target.value),
                  })
                }>
                {taxTypes?.map((type) => (
                  <MenuItem value={type.id as number} key={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="type_id"
                label="Type"
                select
                value={Number(bookingData?.type_id) || ''}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    type_id: Number(e.target.value),
                  })
                }>
                {types?.map((type) => (
                  <MenuItem value={type.id as number} key={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="status_id"
                label="Status"
                select
                value={Number(bookingData?.status_id) || ''}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    status_id: Number(e.target.value),
                  })
                }>
                {statuses?.map((status) => (
                  <MenuItem value={status.id as number} key={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormGroup>
          </Box>
          <TextField
            name="job_notes"
            label="Job details"
            multiline
            rows={3}
            value={bookingData?.job_notes || ''}
            onChange={(e) =>
              setBookingData({
                ...bookingData,
                job_notes: e.target.value,
              })
            }
          />
          <TextField
            name="personnel_notes"
            label="Performer info"
            multiline
            rows={3}
            value={bookingData?.personnel_notes || ''}
            onChange={(e) =>
              setBookingData({
                ...bookingData,
                personnel_notes: e.target.value,
              })
            }
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button type="submit" variant={isDirty ? 'contained' : 'outlined'}>
              Save
            </Button>
            <Button type="button" variant="outlined" onClick={handleDelete}>
              Delete
            </Button>
            {isPending && <CircularProgress size={32} />}
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

// TODO: Add performer allocations
