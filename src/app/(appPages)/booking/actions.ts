'use server';

import { createClient } from '@/utils/supabase/server';

export interface UpdateBooking {
  success: boolean;
  message?: string;
}

export async function getBooking(id: number | undefined) {
  if (!id) return null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('booking')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching booking:', error.message);
    return null;
  }

  return data;
}

export async function saveBooking(prevData: UpdateBooking, formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') ? Number(formData.get('id')) : undefined;

  const { error } = await supabase
    .from('booking')
    .upsert({
      id: id,
      client_id: Number(formData.get('client_id')),
      setup_id: Number(formData.get('setup_id')),
      type_id: Number(formData.get('type_id')),
      status_id: Number(formData.get('status_id')),
      date: formData.get('date') as string,
      start_time: formData.get('start_time') as string,
      end_time: formData.get('end_time') as string,
      notes: formData.get('notes') as string,
    })
    .select();

  if (error) {
    console.error('Error saving booking:', error.message);
    return {
      success: false,
      message: `Error saving booking: ${error}`,
    };
  }
  return {
    success: true,
    message: `Booking updated successfully.`,
  };
}

export async function getSetups() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('booking_setup').select('*');

  if (error) {
    console.error('Error fetching setups:', error.message);
    return null;
  }

  return data;
}

export async function getStatuses() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('booking_status').select('*');

  if (error) {
    console.error('Error fetching statuses:', error.message);
    return null;
  }

  return data;
}

export async function getTypes() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('booking_type').select('*');

  if (error) {
    console.error('Error fetching types:', error.message);
    return null;
  }

  return data;
}

export async function getTaxTypes() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tax_type').select('*');

  if (error) {
    console.error('Error fetching tax types:', error.message);
    return null;
  }

  return data;
}
