'use server';

import { createClient } from '@/utils/supabase/server';

export interface Skillset {
  id: string;
  name: string;
}

export async function fetchSkills(
  user_id: string | undefined
): Promise<Skillset[] | null> {
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

  const skills: Skillset[] = data.map((item) => item.skill as Skillset);
  console.log(skills);
  return skills;
}

export async function fetchAllSkills(): Promise<Skillset[] | null> {
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
