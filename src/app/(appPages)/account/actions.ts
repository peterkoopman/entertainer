'use server';

import { createClient } from '@/utils/supabase/server';

interface RawData {
  avatar?: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  tax_no?: string;
  skillset: string[];
  withholding_tax: boolean;
  gst_registered: boolean;
}

interface Update {
  success: boolean;
  state?: RawData;
  message?: string;
}

export async function fetchSkills(user_id: string | undefined) {
  const supabase = createClient();
  if (!user_id) {
    return null;
  }

  const { data, error } = await (await supabase)
    .from('user_skillset')
    .select(`skill(id, name)`)
    .eq('user_id', user_id);

  if (error) {
    console.error('Error fetching skills:', error.message);
    return null;
  }

  const skills = data.map((item) => item.skill);
  return skills;
}

export async function fetchAllSkills() {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from('skill')
    .select(`id, name`);

  if (error) {
    console.error('Error fetching all skills:', error.message);
    return null;
  }

  return data;
}

export async function updateAccount(
  prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return { success: false, message: 'Error: User not authenticated' };
  }
  console.log(formData);
  const avatar = (formData.get('avatar') as File) || null;

  if (!avatar) {
    return { success: false, message: 'Error: No avatar provided' };
  }
  const fileExt = avatar.name.split('.').pop();
  const fileName = user.data.user.id; // Use user ID for unique filename

  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`${fileName}.${fileExt}`, avatar, {
        cacheControl: '3600',
        upsert: true, // Overwrite if avatar already exists
        contentType: avatar.type,
      });

    if (error) {
      console.error('Error uploading avatar:', error);
      return { success: false, message: `Error: ${error.message}` };
    }

    // Update user profile table with avatar URL
    const publicUrl = supabase.storage
      .from('avatars')
      .getPublicUrl(`${fileName}.${fileExt}`).data.publicUrl;
    await supabase
      .from('userprofile')
      .update({ avatar_url: publicUrl })
      .eq('id', user.data.user.id);

    return {
      success: true,
      message: `Avatar uploaded successfully. Public url: ${publicUrl}`,
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, message: 'Error: An unexpected error occurred.' };
  }
}

// Server Action or API route to get signed URL
export async function getSignedAvatarUrl(userId, extension) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from('avatars')
    .createSignedUrl(`${userId}.${extension}`, 60 * 5); // URL valid for 5 minutes

  if (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }
  return data.signedUrl;
}
