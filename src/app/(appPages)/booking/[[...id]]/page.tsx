'use client';

import { useActionState, useEffect, useState } from 'react';
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
import { useParams } from 'next/navigation';
import {
  getBooking,
  saveBooking,
  UpdateBooking,
  getSetups,
  getStatuses,
  getTaxTypes,
  getTypes,
} from '../actions';
import dayjs from 'dayjs';
import 'dayjs/locale/en-nz';
import Link from 'next/link';
interface Booking {
  id?: number | null;
  client_id?: number | null;
  date?: string | null;
  load_in?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  fee?: number | null;
  deposit?: number | null;
  venue_name?: string | null;
  address?: string | null;
  job_notes?: string | null;
  personnel_notes?: string | null;
  setup_id?: number | null;
  type_id?: number | null;
  status_id?: number | null;
  tax_type_id?: number | null;
  client?: {
    name: string | null;
    company: string | null;
  } | null;
}

interface DropdownOption {
  id: number | null;
  name: string | null;
  description: string | null;
}

export default function BookingPage() {
  const [formState, formAction, isPending] = useActionState<
    UpdateBooking,
    FormData
  >(saveBooking, {
    success: false,
    message: '',
  });
  const [booking, setBooking] = useState<Booking | null>();
  const [initialData, setInitialData] = useState<Booking | null>();
  const [isDirty, setIsDirty] = useState(false);
  const [setups, setSetups] = useState<DropdownOption[] | null>([]);
  const [statuses, setStatuses] = useState<DropdownOption[] | null>([]);
  const [types, setTypes] = useState<DropdownOption[] | null>([]);
  const [taxTypes, setTaxTypes] = useState<DropdownOption[] | null>([]);

  const params = useParams<{ id: string }>();
  const bookingId = Number(params?.id);

  useEffect(() => {
    getSetups().then((data) => {
      setSetups(data);
    });
    getStatuses().then((data) => {
      setStatuses(data);
    });
    getTypes().then((data) => {
      setTypes(data);
    });
    getTaxTypes().then((data) => {
      setTaxTypes(data);
    });
  }, []);

  useEffect(() => {
    if (bookingId) {
      getBooking(bookingId).then((data) => {
        setBooking(data);
        setInitialData(data);
      });
    }
  }, [bookingId]);
  // Use dirty form detection to highlight save button
  useEffect(() => {
    if (booking) {
      const dirty = Object.keys(booking).some(
        (key) =>
          booking?.[key as keyof Booking] !==
          initialData?.[key as keyof Booking]
      );
      setIsDirty(dirty);
    }
  }, [initialData, booking]);

  useEffect(() => {
    // Reset save button highlight on Save
    if (formState.success) setIsDirty(false);
  }, [formState]);

  if (!bookingId) {
    return (
      <ThemeProvider theme={theme}>
        <h2>No booking found</h2>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1>Booking</h1>
        <h2>Client: {`Peter Koopman, Scribble Design Ltd`}</h2>
        <Box component="form" className={style.form} action={formAction}>
          <input type="hidden" name="id" value={booking?.id || ''} />
          <TextField
            name="venue"
            label="Venue"
            value={booking?.venue_name || ''}
            onChange={(e) =>
              setBooking({ ...booking, venue_name: e.target.value })
            }
          />
          <TextField
            name="address"
            label="Address"
            multiline
            rows={3}
            value={booking?.address || ''}
            onChange={(e) =>
              setBooking({ ...booking, address: e.target.value })
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
                    value={dayjs(booking?.date)}
                    onChange={(e) => {
                      setBooking({
                        ...booking,
                        date: e?.format('YYYY-MM-DD') || null,
                      });
                    }}
                  />
                </FormControl>
                <FormControl sx={{ mt: 2, mb: 2 }}>
                  <TimePicker
                    label="Load in"
                    ampm={false}
                    value={dayjs(booking?.load_in, 'HH:mm')}
                    onChange={(e) =>
                      setBooking({ ...booking, load_in: e?.format('HH:mm:ss') })
                    }
                  />
                </FormControl>
                <FormControl sx={{ mt: 2, mb: 2 }}>
                  <TimePicker
                    label="Start Time"
                    ampm={false}
                    value={dayjs(booking?.start_time, 'HH:mm')}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        start_time: e?.format('HH:mm:ss'),
                      })
                    }
                  />
                </FormControl>
                <FormControl sx={{ mt: 2, mb: 2 }}>
                  <TimePicker
                    label="End Time"
                    ampm={false}
                    value={dayjs(booking?.end_time, 'HH:mm')}
                    onChange={(e) =>
                      setBooking({
                        ...booking,
                        end_time: e?.format('HH:mm:ss'),
                      })
                    }
                  />
                </FormControl>
                <TextField
                  name="setup"
                  label="Setup"
                  select
                  value={Number(booking?.setup_id) || ''}
                  onChange={(e) =>
                    setBooking({ ...booking, setup_id: Number(e.target.value) })
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
                value={booking?.fee || ''}
                onChange={(e) =>
                  setBooking({ ...booking, fee: Number(e.target.value) })
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
                value={booking?.deposit || ''}
                onChange={(e) =>
                  setBooking({ ...booking, deposit: Number(e.target.value) })
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
                name="taxtype"
                label="Tax type"
                select
                value={Number(booking?.tax_type_id) || ''}
                onChange={(e) =>
                  setBooking({
                    ...booking,
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
                name="type"
                label="Type"
                select
                value={Number(booking?.type_id) || ''}
                onChange={(e) =>
                  setBooking({ ...booking, type_id: Number(e.target.value) })
                }>
                {types?.map((type) => (
                  <MenuItem value={type.id as number} key={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                name="status"
                label="Status"
                select
                value={Number(booking?.status_id) || ''}
                onChange={(e) =>
                  setBooking({ ...booking, status_id: Number(e.target.value) })
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
            name="jobdetail"
            label="Job details"
            multiline
            rows={3}
            value={booking?.job_notes || ''}
            onChange={(e) =>
              setBooking({ ...booking, job_notes: e.target.value })
            }
          />
          <TextField
            name="performernotes"
            label="Performer info"
            multiline
            rows={3}
            value={booking?.personnel_notes || ''}
            onChange={(e) =>
              setBooking({ ...booking, personnel_notes: e.target.value })
            }
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button type="submit" variant={isDirty ? 'contained' : 'outlined'}>
              Save
            </Button>
            <Button type="button" variant="outlined">
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
