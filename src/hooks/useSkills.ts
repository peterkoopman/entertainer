'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export interface Skill {
  id: string;
  name: string;
  created_at: string;
}

export function useSkills(): { skills: Skill[] | null; loading: boolean } {
  const [skills, setSkills] = useState<Skill[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);

      const { data: skillsData, error: skillsError } = await supabase
        .from('skill')
        .select('*');

      if (skillsError) {
        console.error('Error fetching skills:', skillsError.message);
        setLoading(false);
      } else if (skillsData) {
        setSkills(skillsData);
      }

      setLoading(false);
    };

    fetchSkills();
  }, [supabase]);

  return { skills, loading };
}
