'use client';

import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/muiThemes';
import {
  Box,
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

export default function BookingPage() {
  return (
    <ThemeProvider theme={theme}>
      <h1>Booking</h1>
      <h2>Client: {`Peter Koopman, Scribble Design Ltd`}</h2>
      <Box component="form" className={style.form}>
        <TextField name="venue" label="Venue" />
        <TextField name="address" label="Address" multiline rows={3} />
        <Box component="div" className={style.dateTimes}>
          <FormGroup className={style.halfWidth}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl sx={{ mt: 2, mb: 2 }}>
                <DatePicker label="Date" />
              </FormControl>
              <FormControl sx={{ mt: 2, mb: 2 }}>
                <TimePicker label="Start Time" ampm={false} />
              </FormControl>
              <FormControl sx={{ mt: 2, mb: 2 }}>
                <TimePicker label="End Time" ampm={false} />
              </FormControl>
              <FormControl sx={{ mt: 2, mb: 2 }}>
                <TimePicker label="Load in" ampm={false} />
              </FormControl>
              {/* TODO: create a DB table to store this. Edit from settings page */}
              <TextField name="setup" label="Setup" select>
                <MenuItem value="1">TBC</MenuItem>
                <MenuItem value="2">Acoustic</MenuItem>
                <MenuItem value="3">Small PA</MenuItem>
                <MenuItem value="4">PA provided</MenuItem>
              </TextField>
            </LocalizationProvider>
          </FormGroup>
          <FormGroup className={style.halfWidth}>
            <TextField
              label="Fee"
              name="fee"
              type="number"
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
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
              }}
            />
            {/* TODO: Make these controlled components */}
            <TextField name="taxtype" label="Tax type" select>
              <MenuItem value="1">Tax exclusive</MenuItem>
              <MenuItem value="2">Tax inclusive</MenuItem>
              <MenuItem value="3">No tax</MenuItem>
            </TextField>
            {/* TODO: create a DB table to store this. Edit from settings page */}
            <TextField name="type" label="Type" select>
              <MenuItem value="1">TBC</MenuItem>
              <MenuItem value="2">Wedding</MenuItem>
              <MenuItem value="3">Corporate</MenuItem>
            </TextField>
            <TextField name="status" label="Status" select>
              <MenuItem value="1">TBC</MenuItem>
              <MenuItem value="2">Confirmed</MenuItem>
              <MenuItem value="3">Cancelled</MenuItem>
            </TextField>
          </FormGroup>
        </Box>
        <TextField name="jobdetail" label="Job details" multiline rows={3} />
        <TextField
          name="performernotes"
          label="Performer info"
          multiline
          rows={3}
        />
      </Box>
    </ThemeProvider>
  );
}

// TODO: Add performer allocations
