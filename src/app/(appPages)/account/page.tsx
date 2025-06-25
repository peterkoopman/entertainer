'use client';

import { useUser } from '@/hooks/useUser';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/muiThemes';
import { useState } from 'react';
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

// TODO: populate from 'skills' table
const skills = ['Bass', 'Guitar', 'Violin', 'Saxophone'];

export default function AccountPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { user, profile, loading } = useUser();
  const userDetails = { ...user, ...profile };

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
        <TextField name="full_name" label="Name" />
        <TextField name="company" label="Company" />
        <TextField name="email" label="Email" />
        <TextField name="phone" label="Phone" />
        <TextField name="address" label="Address" />
        <TextField name="city" label="City" />
        <TextField name="country" label="Country" />
        <TextField name="tax_no" label="Tax number" />
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
