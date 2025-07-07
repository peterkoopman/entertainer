'use server';

import { createClient } from '@/utils/supabase/server';

export async function getClient(id: string | undefined) {
  const supabase = await createClient();

  if (!id) {
    return null;
  }

  const { data, error } = await supabase
    .from('client')
    .select('*')
    .eq('id', Number(id))
    .single();

  if (error) {
    console.error('Error fetching client:', error.message);
    return null;
  }

  return data;
}

export async function getBookingsForClient(id: string | undefined) {
  if (!id) {
    return null;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('booking')
    .select('id, date, venue_name, start_time, end_time')
    .eq('client_id', Number(id));

  if (error) {
    console.error('Error fetching bookings:', error.message);
    return null;
  }

  return data;
}
