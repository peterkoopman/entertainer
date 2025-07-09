'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export interface UpdateClient {
  success: boolean;
  message?: string;
}

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

export async function saveClient(prevState: UpdateClient, formData: FormData) {
  const supabase = await createClient();
  const clientId = formData.get('id') ? Number(formData.get('id')) : undefined;

  const { data, error } = await supabase
    .from('client')
    .upsert({
      id: clientId,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      country: formData.get('country') as string,
      notes: formData.get('notes') as string,
    })
    .select();

  if (error) {
    console.error('Error saving client:', error.message);
    return {
      success: false,
      message: `Error saving client: ${error}`,
    };
  }

  // If it's a new client (i.e. no client id), redirect to the new client page
  if (clientId) {
    return {
      success: true,
      message: `Client updated successfully.`,
    };
  } else {
    return redirect(`/clients/${data[0].id}`);
  }
}

export async function deleteClient(clientId: number | undefined) {
  const supabase = await createClient();

  if (!clientId) return redirect('/clients');

  const { error } = await supabase.from('client').delete().eq('id', clientId);

  return {
    success: !error,
    message: error
      ? `Error deleting client: ${error}`
      : `Client deleted successfully.`,
  };
}

export async function createNewBooking(clientId: number | undefined) {
  const supabase = await createClient();
  if (!clientId) return null;
  const { data, error } = await supabase
    .from('booking')
    .insert({ client_id: clientId })
    .select();

  console.log(data, error);
  if (error) {
    console.error('Error creating new booking:', error.message);
    return null;
  }
  redirect(`/booking/${data && data.length > 0 && data?.[0].id}`);
}
