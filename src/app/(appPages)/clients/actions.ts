'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export interface Client {
  id?: number | null;
  name?: string | null;
  email?: string | null;
  company?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface Booking {
  id: number;
  date?: string | null;
  venue_name?: string | null;
  start_time?: string | null;
  end_time?: string | null;
}

export interface Country {
  value: string;
  label: string;
}

export type RequestResult<T> =
  | { success: true; data: T }
  | { success: true; data: null }
  | { success: false; message: string };

export type SaveResult = { success: boolean; message: string };

export async function getClient(
  id: number | undefined
): Promise<RequestResult<Client>> {
  const supabase = await createClient();

  if (!id) {
    return {
      success: false,
      message: 'No client ID provided.',
    };
  }

  const { data, error } = await supabase
    .from('client')
    .select('*')
    .eq('id', id)
    .maybeSingle<Client | null>();

  if (error) {
    console.error(`Error fetching client: ${JSON.stringify(error)}`);
    return {
      success: false,
      message: `Error fetching client: ${error.message}`,
    };
  }

  if (data === null) {
    return {
      success: true,
      data: null,
    };
  }

  return {
    success: true,
    data: data,
  };
}

export async function clientSearch(
  query: string
): Promise<RequestResult<Client[]>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('client')
    .select('id, name, company')
    .or(`name.ilike.%${query}%, company.ilike.%${query}%`)
    .limit(10);

  if (error) {
    console.error(`Error searching clients: ${JSON.stringify(error)}`);
    return {
      success: false,
      message: `Error searching clients: ${error.message}`,
    };
  }

  if (!data) {
    return {
      success: true,
      data: null,
    };
  }

  return {
    success: true,
    data: data,
  };
}

export async function getRecentClients(): Promise<RequestResult<Client[]>> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('client')
    .select('id, name, company')
    .order('updated_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error(`Error fetching recent clients`, error);
    return {
      success: false,
      message: `Error fetching recent clients: ${error}`,
    };
  }

  if (!data) {
    return {
      success: true,
      data: null,
    };
  }

  return {
    success: true,
    data: data,
  };
}

export async function getBookingsForClient(
  id: number | undefined
): Promise<RequestResult<Booking[]>> {
  if (!id) {
    return {
      success: false,
      message: 'No client ID provided.',
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('booking')
    .select('id, date, venue_name, start_time, end_time')
    .eq('client_id', id);

  if (error) {
    console.error('Error fetching bookings:', error.message);
    return {
      success: false,
      message: `Error fetching bookings: ${error}`,
    };
  }

  if (!data) {
    return {
      success: true,
      data: null,
    };
  }

  return {
    success: true,
    data: data,
  };
}

export async function saveClient(prevState: SaveResult, formData: FormData) {
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
  if (!clientId) {
    redirect(`/clients/${data[0].id}`);
  }

  return {
    success: true,
    message: '',
  };
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

export async function getCountries(): Promise<Country[]> {
  const result = await fetch(
    'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code'
  );

  const data = await result.json();
  return data.countries;
}
