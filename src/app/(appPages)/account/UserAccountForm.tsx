'use client';

import {
  useActionState,
  useContext,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';

import { Update, updateAccount } from './actions';
import { AvatarContext } from '@/context/AvatarContext';
import { Skill, UserDetails } from './page';

import {
  Avatar,
  Box,
  TextField,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Button,
  FormGroup,
} from '@mui/material';

import style from './account.module.css';
import SkillSelect from './SkillSelect';

interface FormProps {
  userDetails: UserDetails;
  setUserDetails: React.Dispatch<React.SetStateAction<UserDetails>>;
  selectedSkills: Skill[] | null;
  setSelectedSkills: React.Dispatch<React.SetStateAction<Skill[] | null>>;
}
const AVATAR_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const AVATAR_MAX_SIZE = 2 * 1024 * 1024; // 2MB

const UserAccountForm = ({
  userDetails,
  setUserDetails,
  selectedSkills,
  setSelectedSkills,
}: FormProps) => {
  const [formState, formAction, isPending] = useActionState<Update, FormData>(
    updateAccount,
    {
      success: false,
      message: '',
    }
  );
  const initialData = userDetails;
  const [isDirty, setIsDirty] = useState(false);

  const { avatarUrl, updateAvatarUrl, avatarPreview, updateAvatarPreview } =
    useContext(AvatarContext);

  useEffect(() => {
    if (formState) {
      console.log(formState.message);
    }
    if (formState.success) setIsDirty(false);
  }, [formState]);

  useEffect(() => {
    if (userDetails?.avatar_url) {
      updateAvatarUrl(userDetails.avatar_url);
      updateAvatarPreview(`/avatars/${userDetails.avatar_url}?t=${Date.now()}`);
    }
  }, [userDetails, updateAvatarUrl, updateAvatarPreview]);

  // Use dirty form detection to highlight save button
  useEffect(() => {
    const dirty = Object.keys(userDetails).some(
      (key) =>
        userDetails[key as keyof UserDetails] !==
        initialData[key as keyof UserDetails]
    );
    setIsDirty(dirty);
  }, [initialData, userDetails]);

  // Create a dataurl to immediately preview a newly selected avatar
  const previewAvatarFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      updateAvatarPreview(`${reader.result as string}`);
    };
    reader.readAsDataURL(file);
  };

  // Preview changed avatar file
  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!AVATAR_ALLOWED_TYPES.includes(file.type)) {
      alert('Only JPEG, PNG, and GIF images are allowed.');
      return;
    }

    if (file.size > AVATAR_MAX_SIZE) {
      alert('File size exceeds 2MB limit.');
      return;
    }

    previewAvatarFile(file);
  };

  return (
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
      <SkillSelect
        selectedSkills={selectedSkills}
        setIsDirty={setIsDirty}
        setSelectedSkills={setSelectedSkills}
      />
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
        {/* TODO: Reset Password */}
        {/* <Button type="button" variant="outlined" onClick={resetPassword}>
                Reset password
              </Button> */}
        <Button type="submit" variant={isDirty ? 'contained' : 'outlined'}>
          Save
        </Button>
        {isPending && <CircularProgress size={32} />}
      </Box>
    </Box>
  );
};

export default UserAccountForm;
