'use client';

import {
  useState,
  useEffect,
  ChangeEvent,
  useActionState,
  useContext,
} from 'react';
import { useUser } from '@/hooks/useUser';
import { AvatarContext } from '@/context/AvatarContext';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/muiThemes';
import Link from 'next/link';
import {
  Avatar,
  Box,
  TextField,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Button,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  MenuItem,
  Chip,
} from '@mui/material';
import style from './account.module.css';
import { fetchAllSkills, fetchSkills, Update, updateAccount } from './actions';

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
  withholding_tax?: boolean;
  gst_registered?: boolean;
  skillset?: string[];
}

interface Skill {
  id: number;
  name: string | null;
}

export default function AccountPage() {
  const { user, profile, loading } = useUser();
  const { avatarUrl, updateAvatarUrl, avatarPreview, updateAvatarPreview } =
    useContext(AvatarContext);

  const [skills, setSkills] = useState<Skill[] | null>([]);
  const [selectedSkills, setSelectedSkills] = useState<(string | null)[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    id: user?.id,
    email: user?.email,
    ...profile,
  });
  const [initialData, setInitialData] = useState<UserDetails>({
    id: user?.id,
    email: user?.email,
    ...profile,
  });

  const [formState, formAction, isPending] = useActionState<Update, FormData>(
    updateAccount,
    {
      success: false,
      message: '',
    }
  );

  useEffect(() => {
    const dirty = Object.keys(userDetails).some(
      (key) =>
        userDetails[key as keyof UserDetails] !==
        initialData[key as keyof UserDetails]
    );
    setIsDirty(dirty);
  }, [initialData, userDetails]);

  useEffect(() => {
    if (formState) {
      console.log(formState.message);
    }
    if (formState.success) setIsDirty(false);
  }, [formState]);

  useEffect(() => {
    setUserDetails({ ...user, ...profile });
    setInitialData({ ...user, ...profile });
    if (profile) {
      updateAvatarUrl(profile.avatar_url);
      updateAvatarPreview(profile.avatar_url);
    }
  }, [user, profile, updateAvatarUrl, updateAvatarPreview]);

  useEffect(() => {
    fetchSkills(user?.id).then((data) => {
      if (data) setSelectedSkills(data.map((skill) => skill && skill.name));
    });
  }, [user, profile]);

  useEffect(() => {
    fetchAllSkills().then((data) => {
      setSkills(data);
    });
  }, []);

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

  // Filename must include user uuid for correct access
  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, PNG, and GIF images are allowed.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      // 2MB limit
      alert('File size exceeds 2MB limit.');
      return;
    }

    previewAvatarFile(file);
    setIsDirty(true);
  };

  const previewAvatarFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      updateAvatarPreview(`${reader.result as string}`);
    };
    reader.readAsDataURL(file);
  };

  const handleSkillSelect = (
    event: SelectChangeEvent<typeof selectedSkills>
  ) => {
    const {
      target: { value },
    } = event;
    setIsDirty(true);
    setSelectedSkills(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <ThemeProvider theme={theme}>
      <h2>My account</h2>
      <p>Manage your user profile</p>
      <Box
        component="form"
        action={formAction}
        sx={{
          maxWidth: 720,
          width: 1,
          mr: 'auto',
          ml: 'auto',
        }}>
        <label className={`${style.avatarContainer}`}>
          <Avatar src={avatarPreview || ''} sx={{ width: 120, height: 120 }} />
          <div className={`${style.avatarOverlay} material-symbols-outlined`}>
            edit
          </div>
          <input
            type="file"
            name="avatar"
            className={style.fileInput}
            onChange={handleAvatarChange}
          />
        </label>
        <input type="hidden" name="avatar_url" value={avatarUrl || ''} />
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
          slotProps={{
            htmlInput: {
              // Targeting the native HTML <input> or <textarea> element
              readOnly: true,
            },
          }}
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
        <FormControl sx={{ mt: 2, mb: 2, width: '100%' }}>
          <InputLabel id="multi-select-label">Skillset</InputLabel>
          <Select
            labelId="multi-select-label"
            id="skillset"
            name="skillset"
            multiple // This is the key prop for multi-select
            value={selectedSkills?.map((skill) => skill) || []}
            onChange={handleSkillSelect}
            input={
              <OutlinedInput id="select-multiple-chip" label="Select Options" />
            }
            renderValue={(selectedSkills) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selectedSkills &&
                  selectedSkills.map((value) => {
                    return <Chip key={value} label={value} />;
                  })}
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
            {skills &&
              skills.map((skill) => (
                <MenuItem
                  key={skill.id}
                  value={skill.name || ''}
                  // Optional: Add styling for selected items
                  // You can use a Checkbox here for a more traditional look
                  // selected={selectedOptions.indexOf(option) > -1}
                >
                  {skill.name}
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
            control={
              <Checkbox
                name="withholding_tax"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    withholding_tax: e.target.checked,
                  })
                }
                checked={userDetails.withholding_tax || false}
              />
            }
            label="Withholding tax?"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="gst_registered"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    gst_registered: e.target.checked,
                  })
                }
                checked={userDetails.gst_registered || false}
              />
            }
            label="GST Registered?"
          />
        </FormGroup>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          {/* <Button type="button" variant="outlined" onClick={resetPassword}>
            Reset password
          </Button> */}
          <Button type="submit" variant={isDirty ? 'contained' : 'outlined'}>
            Save
          </Button>
          {isPending && <CircularProgress size={32} />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
