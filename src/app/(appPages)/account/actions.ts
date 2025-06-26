'use server';

import { createClient } from '@/utils/supabase/server';

export async function getAccount() {
  const supabase = createClient();
  // Get the authenticated user session
  const {
    data: { user },
    error: userError,
  } = (await supabase).auth.getUser();

  console.log(user, userError);
}
