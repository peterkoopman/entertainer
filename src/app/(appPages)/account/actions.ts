'use server';
import pool from '@/utils/postgres/db';

export interface Update {
  success: boolean;
  message?: string;
}

export async function fetchProfile(user_id: string | undefined) {
  const qry = 'SELECT * FROM users WHERE id = $1';
  const values = [user_id];

  if (!user_id) {
    return null;
  }

  try {
    const { rows, rowCount } = await pool.query(qry, values);
    if (rowCount === 0) {
      return null;
    } else {
      return rows[0];
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function fetchSkills(user_id: string | undefined) {
  const qry =
    'SELECT * FROM skill WHERE id IN (SELECT skill_id FROM user_skillset WHERE user_id = $1)';
  const values = [user_id];

  if (!user_id) {
    return null;
  }

  try {
    const { rows, rowCount } = await pool.query(qry, values);
    if (rowCount === 0) {
      return null;
    } else {
      return rows;
    }
  } catch (error) {
    console.error('Error fetching skills:', error);
    return null;
  }
}

export async function fetchAllSkills() {
  const qry = 'SELECT * FROM skill';

  try {
    const { rows } = await pool.query(qry);
    return rows;
  } catch (error) {
    console.error('Error fetching all skills:', error);
    return null;
  }
}

/**
 * skills is passed as a comma separated string of ids
 * Removes all existing skills and adds selected skills
 * @param user_id
 * @param skills
 */
async function updateSkills(user_id: string | undefined, skills: string) {
  const allSkills = await fetchAllSkills();
  const newSkills = skills
    .split(',')
    .map((skill) => allSkills?.find((s) => s.name === skill.trim()));
  const newSkillIds = newSkills.map((skill) => skill?.id);

  console.log(newSkillIds);

  const deleteQry = `DELETE FROM user_skillset WHERE user_id = $1;`;
  const deleteValues = [user_id];
  const insertQry = `INSERT INTO user_skillset (user_id, skill_id) SELECT $1, unnest($2::int[]);`;
  const insertValues = [user_id, newSkillIds];

  try {
    await pool.query(`BEGIN;`);
    await pool.query(deleteQry, deleteValues);
    await pool.query(insertQry, insertValues);
    await pool.query(`COMMIT;`);

    return {
      success: true,
      message: 'Skills updated successfully',
    };
  } catch (error) {
    await pool.query(`ROLLBACK;`);
    console.error('Error updating skills:', error);
  }
}

// async function uploadAvatar(avatar: File) {
//   const user = await supabase.auth.getUser();

//   if (!avatar) {
//     return { success: false, message: 'Error: No avatar provided' };
//   }
//   const fileExt = avatar.name.split('.').pop();
//   const userId = user.data.user?.id || null; // Use user ID for unique filename

//   if (!userId) {
//     return { success: false, message: 'Error: User not signed in' };
//   }

//   try {
//     const { data, error } = await supabase.storage
//       .from('avatars')
//       .upload(`${userId}.${fileExt}`, avatar, {
//         cacheControl: '0',
//         upsert: true, // Overwrite if avatar already exists
//         contentType: avatar.type,
//       });

//     if (error) {
//       console.error('Error uploading avatar:', error);
//       return { success: false, message: `Error: ${error.message}` };
//     }

//     // Update user profile table with avatar URL
//     const publicUrl = supabase.storage
//       .from('avatars')
//       .getPublicUrl(`${userId}.${fileExt}`).data.publicUrl;
//     await supabase
//       .from('userprofile')
//       .update({ avatar_url: publicUrl })
//       .eq('id', userId);

//     return {
//       success: true,
//       message: `Public url: ${publicUrl}, Data: ${JSON.stringify(data)}`,
//     };
//   } catch (error) {
//     console.error('Unexpected error:', error);
//     return { success: false, message: 'Error: An unexpected error occurred.' };
//   }
// }

export async function updateAccount(
  prevState: Update,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  // TODO: replace with auth user check
  const user_id = `c17f9dd9-dbe3-4496-856a-1de66321c676`;

  // const avatar = (formData.get('avatar') as File) || null;

  // if (avatar) {
  //   try {
  //     await uploadAvatar(avatar);
  //   } catch (error) {
  //     console.error('Error uploading avatar:', error);
  //   }
  // }

  const skills = formData.get('skillset') as string;
  if (skills) {
    try {
      await updateSkills(user_id.toString(), skills);
    } catch (error) {
      console.error('Error updating skills:', error);
    }
  }

  const qry = `UPDATE users SET full_name = $1, phone = $2, address = $3, city = $4, country = $5, tax_no = $6, witholding_tax = $7, gst_registered = $8 
                WHERE id = $9
                RETURNING *`;
  const values = [
    formData.get('full_name') as string,
    formData.get('phone') as string,
    formData.get('address') as string,
    formData.get('city') as string,
    formData.get('country') as string,
    formData.get('tax_no') as string,
    formData.get('witholding_tax') === 'on',
    formData.get('gst_registered') === 'on',
    user_id,
  ];

  try {
    const { rowCount } = await pool.query(qry, values);

    if (rowCount && rowCount > 0) {
      return {
        success: true,
        message: `Account details saved successfully.`,
      };
    } else {
      return {
        success: false,
        message: `Nothing to update.`,
      };
    }
  } catch (error) {
    console.error('Error saving account details:', error);
    return {
      success: false,
      message: `Error saving account details: ${error}`,
    };
  }
}
