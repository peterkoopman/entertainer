'use server';

import { createClient } from '@/utils/supabase/server';

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
