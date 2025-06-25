'use client';

import { useUser } from '@/hooks/useUser';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/muiThemes';
import Link from 'next/link';
import {
  Avatar,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  FormGroup,
} from '@mui/material';
import style from './account.module.css';

export default function AccountPage() {
  const { user, profile, loading } = useUser();
  const userDetails = { ...user, ...profile };
  console.log(userDetails);

  if (loading && !user) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return (
      <div>
        <h2>
          Please <Link href="/login">log in</Link> to view the dashboard
        </h2>
      </div>
    );
  }

  const uploadAvatar = () => {};
  const resetPassword = () => {};

  return (
    <ThemeProvider theme={theme}>
      <h2>My account</h2>
      <p>Manage your user profile</p>
      <Box
        component="form"
        sx={{
          maxWidth: 720,
          width: 1,
          mr: 'auto',
          ml: 'auto',
        }}>
        <label className={style.avatarContainer}>
          <Avatar
            src={userDetails.avatar_url}
            sx={{ width: 120, height: 120 }}
            className={style.avatar}
          />
          <div className={`${style.avatarOverlay} material-symbols-outlined`}>
            edit
          </div>
          <input
            type="file"
            name="avatar"
            className={style.fileInput}
            onChange={uploadAvatar}
          />
        </label>
        <TextField name="full_name" label="Name" />
        <TextField name="company" label="Company" />
        <TextField name="email" label="Email" />
        <TextField name="phone" label="Phone" />
        <TextField name="address" label="Address" />
        <TextField name="city" label="City" />
        <TextField name="country" label="Country" />
        <TextField name="tax_no" label="Tax number" />
        <FormGroup
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            mb: 2,
          }}>
          <FormControlLabel
            control={<Checkbox name="witholding_tax" />}
            label="Witholding tax?"
          />
          <FormControlLabel
            control={<Checkbox name="witholding_tax" />}
            label="GST Registered?"
          />
        </FormGroup>
        <Button type="button" variant="outlined" onClick={resetPassword}>
          Reset password
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </ThemeProvider>
  );
}
