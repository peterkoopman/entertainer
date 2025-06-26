'use client';

import { useUser } from '@/hooks/useUser';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/muiThemes';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Avatar,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  FormControl,
  Chip,
  Button,
  FormGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import style from './account.module.css';

interface UserDetails {
  id?: string;
  full_name?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  tax_no?: string;
  avatar_url?: string;
  witholding_tax?: boolean;
  gst_registered?: boolean;
  skillset?: string[];
}

// TODO: populate from 'skills' table
const skills = ['Bass', 'Guitar', 'Violin', 'Saxophone'];

export default function AccountPage() {
  const { user, profile, loading } = useUser();

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    ...user,
    ...profile,
  });

  useEffect(() => {
    setUserDetails({ ...user, ...profile });
  }, [user, profile]);

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
  const handleSkillsetSelect = (
    event: SelectChangeEvent<typeof selectedSkills>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedSkills(typeof value === 'string' ? value.split(',') : value);
  };

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
        <TextField
          name="full_name"
          label="Name"
          value={userDetails.full_name || ''}
          onChange={(e) =>
            setUserDetails({ ...userDetails, full_name: e.target.value })
          }
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          value={userDetails.email || ''}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
        />
        <TextField
          type="tel"
          name="phone"
          label="Phone"
          value={userDetails.phone || ''}
          onChange={(e) =>
            setUserDetails({ ...userDetails, phone: e.target.value })
          }
        />
        <TextField
          name="address"
          label="Address"
          value={userDetails.address || ''}
          onChange={(e) =>
            setUserDetails({ ...userDetails, address: e.target.value })
          }
        />
        <TextField
          name="city"
          label="City"
          value={userDetails.city || ''}
          onChange={(e) =>
            setUserDetails({ ...userDetails, city: e.target.value })
          }
        />
        <TextField
          name="country"
          label="Country"
          value={userDetails.country || ''}
          onChange={(e) =>
            setUserDetails({ ...userDetails, country: e.target.value })
          }
        />
        <TextField
          name="tax_no"
          label="Tax number"
          value={userDetails.tax_no || ''}
          onChange={(e) =>
            setUserDetails({ ...userDetails, tax_no: e.target.value })
          }
        />
        {/* TODO: Populate skillset */}
        <FormControl sx={{ mt: 2, mb: 2, width: '100%' }}>
          <InputLabel id="multi-select-label">Skillset</InputLabel>
          <Select
            labelId="multi-select-label"
            id="skillset"
            name="skillset"
            multiple // This is the key prop for multi-select
            value={selectedSkills}
            onChange={handleSkillsetSelect}
            input={
              <OutlinedInput id="select-multiple-chip" label="Select Options" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8, // Adjust dropdown height
                  width: 250,
                },
              },
            }}>
            {skills.map((skill) => (
              <MenuItem
                key={skill}
                value={skill}
                // Optional: Add styling for selected items
                // You can use a Checkbox here for a more traditional look
                // selected={selectedOptions.indexOf(option) > -1}
              >
                {skill}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
