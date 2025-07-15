'use server';

import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

export interface UpdateBooking {
  success: boolean;
  message?: string;
}

export interface Booking {
  id?: number;
  client_id?: number | null;
  date?: string | null;
  load_in?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  fee?: number | null;
  deposit?: number | null;
  venue_name?: string | null;
  address?: string | null;
  job_notes?: string | null;
  personnel_notes?: string | null;
  setup_id?: number | null;
  type_id?: number | null;
  status_id?: number | null;
  tax_type_id?: number | null;
  client?: {
    name: string | null;
    company: string | null;
  } | null;
}

export async function getBooking(id: number | undefined) {
  if (!id) return null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('booking')
    .select('*, client(name, company)')
    .eq('id', id)
    .single();

  console.log(`Data: ${JSON.stringify(data)}`);

  // if (data === null) {
  //   return null;
  // } else if (error) {
  //   console.log(`Error: ${JSON.stringify(error)}`);

  //   return {
  //     success: false,
  //     message: `Error fetching booking: ${error.message}`,
  //   };
  // }

  return data;
}

export async function saveBooking(prevData: UpdateBooking, formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') ? Number(formData.get('id')) : undefined;
  console.log(formData);
  const { data, error } = await supabase
    .from('booking')
    .upsert({
      id: id || undefined,
      venue_name: formData.get('venue_name') as string,
      address: formData.get('address') as string,
      client_id: Number(formData.get('client_id')) || null,
      setup_id: Number(formData.get('setup_id')) || null,
      type_id: Number(formData.get('type_id')) || null,
      status_id: Number(formData.get('status_id')) || null,
      tax_type_id: Number(formData.get('tax_type_id')) || null,
      date: formData.get('date') || null,
      load_in: formData.get('load_in') || null,
      start_time: formData.get('start_time') || null,
      end_time: formData.get('end_time') || null,
      fee: Number(formData.get('fee')) || null,
      deposit: Number(formData.get('deposit')) || null,
      job_notes: formData.get('job_notes') as string,
      personnel_notes: formData.get('personnel_notes') as string,
    } as Booking)
    .select();

  if (error) {
    console.error('Error saving booking:', error.message);
    return {
      success: false,
      message: `Error saving booking: ${error}`,
    };
  }
  console.log(data);
  return {
    success: true,
    message: `Booking updated successfully.`,
  };
}

export async function deleteBooking(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('booking')
    .delete()
    .eq('id', id)
    .select('*');

  if (error) {
    console.error('Error deleting booking:', error.message);
    return {
      success: false,
      message: `Error deleting booking: ${error}`,
    };
  }

  if (data && data.length > 0) {
    return {
      success: true,
      message: `Booking deleted successfully.`,
    };
  } else {
    return {
      success: false,
      message: `Booking not found, or you do not have the required permissions.`,
    };
  }
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
