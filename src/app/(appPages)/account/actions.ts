'use server';

import { createClient } from '@/utils/supabase/server';

export interface Update {
  success: boolean;
  message?: string;
}

export async function fetchSkills(user_id: string | undefined) {
  const supabase = await createClient();
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
  const supabase = await createClient();

  const { data, error } = await supabase.from('skill').select(`id, name`);

  if (error) {
    console.error('Error fetching all skills:', error.message);
    return null;
  }

  return data;
}

async function updateSkills(user_id: string | undefined, skills: string) {
  const supabase = await createClient();
  const allSkills = await fetchAllSkills();
  const newSkills = skills
    .split(',')
    .map((skill) => allSkills?.find((s) => s.name === skill.trim()));
  const newSkillIds = newSkills.map((skill) => skill?.id);

  const currentSkills = (await fetchSkills(user_id)) || [];
  const currentSkillIds = currentSkills.map((skill) => skill?.id || null);
  const toDelete =
    currentSkillIds.filter((id) => id && !newSkillIds.includes(id)) || [];
  const toAdd = newSkillIds.filter(
    (id) => id && !currentSkillIds?.includes(id)
  );

  // Perform deletions
  if (toDelete.length > 0 && user_id) {
    await supabase
      .from('user_skillset')
      .delete()
      .eq('user_id', user_id)
      .in('skill_id', toDelete);
  }

  // Perform additions
  if (toAdd.length > 0 && user_id) {
    const toInsert = toAdd.map((id) => ({
      user_id: user_id,
      skill_id: id,
    }));
    await supabase.from('user_skillset').insert(toInsert);
  }

  return {
    success: true,
    message: 'Skills updated successfully',
  };
}

async function uploadAvatar(avatar: File) {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!avatar) {
    return { success: false, message: 'Error: No avatar provided' };
  }
  const fileExt = avatar.name.split('.').pop();
  const userId = user.data.user?.id || null; // Use user ID for unique filename

  if (!userId) {
    return { success: false, message: 'Error: User not signed in' };
  }

  try {
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(`${userId}.${fileExt}`, avatar, {
        cacheControl: '0',
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
      .getPublicUrl(`${userId}.${fileExt}`).data.publicUrl;
    await supabase
      .from('userprofile')
      .update({ avatar_url: publicUrl })
      .eq('id', userId);

    return {
      success: true,
      message: `Public url: ${publicUrl}, Data: ${JSON.stringify(data)}`,
    };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, message: 'Error: An unexpected error occurred.' };
  }
}

export async function updateAccount(
  prevState: Update,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return { success: false, message: 'Error: User not authenticated' };
  }
  const avatar = (formData.get('avatar') as File) || null;

  if (avatar) {
    try {
      await uploadAvatar(avatar);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  }

  const skills = formData.get('skillset') as string;
  if (skills) {
    try {
      await updateSkills(user.data.user?.id, skills);
    } catch (error) {
      console.error('Error updating skills:', error);
    }
  }

  try {
    await supabase.from('userprofile').upsert({
      id: user.data.user?.id,
      full_name: formData.get('full_name') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      country: formData.get('country') as string,
      tax_no: formData.get('tax_no') as string,
      withholding_tax: formData.get('withholding_tax') === 'on',
      gst_registered: formData.get('gst_registered') === 'on',
    });
    return {
      success: true,
      message: `Account details saved successfully.`,
    };
  } catch (error) {
    console.error('Error saving account details:', error);
    return {
      success: false,
      message: `Error saving account details: ${error}`,
    };
  }
}
