'use server';

import { redirect } from 'next/navigation';
import pool from '@/utils/postgres/db';

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

export async function getClient(id: number | undefined) {
  if (!id) {
    return {
      success: false,
      message: 'No client ID provided.',
    };
  }

  const qry = 'SELECT * FROM client WHERE id = $1';
  const values = [id];

  try {
    const { rows } = await pool.query(qry, values);
    console.log(rows);
    if (rows.length !== 1) {
      return {
        success: true,
        data: null,
      };
    } else {
      return {
        success: true,
        data: rows[0],
      };
    }

    return {
      success: true,
      data: rows[0],
    };
  } catch (error) {
    console.error('Failed to fetch client:', error);

    return {
      success: false,
      message: `Error fetching client: ${error}`,
    };
  }
}

export async function clientSearch(
  query: string
): Promise<RequestResult<Client[]>> {
  const qry =
    'SELECT id, name, company FROM client WHERE name ILIKE $1 OR company ILIKE $1 LIMIT 10';
  const values = [`%${query}%`];

  try {
    const { rows } = await pool.query(qry, values);
    if (rows.length === 0) {
      return {
        success: true,
        data: null,
      };
    }

    return {
      success: true,
      data: rows,
    };
  } catch (error) {
    console.error(`Error searching clients: ${error}`);
    return {
      success: false,
      message: `Error searching clients: ${error}`,
    };
  }
}

export async function getRecentClients(): Promise<RequestResult<Client[]>> {
  const qry = 'SELECT * FROM client ORDER BY updated_at DESC LIMIT 5';

  try {
    const { rows } = await pool.query(qry);
    if (rows.length === 0) {
      return {
        success: true,
        data: null,
      };
    }

    return {
      success: true,
      data: rows,
    };
  } catch (error) {
    console.error('Failed to fetch recent clients', error);

    return {
      success: false,
      message: `Error fetching recent clients: ${error}`,
    };
  }
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

  const qry = 'SELECT * FROM booking WHERE client_id = $1';
  const values = [id];

  try {
    const { rows } = await pool.query(qry, values);
    if (rows.length === 0) {
      return {
        success: true,
        data: null,
      };
    }

    return {
      success: true,
      data: rows,
    };
  } catch (error) {
    console.error('Failed to fetch client bookings', error);

    return {
      success: false,
      message: `Error fetching client bookings: ${error}`,
    };
  }
}

export async function saveClient(prevState: SaveResult, formData: FormData) {
  const clientId = formData.get('id') ? Number(formData.get('id')) : undefined;
  const qry = `INSERT INTO client (id, name, email, company, phone, address, city, country, notes) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (id) DO UPDATE SET name = $2, email = $3, company = $4, phone = $5, address = $6, city = $7, country = $8, notes = $9
                RETURNING *`;
  const values = [
    clientId,
    formData.get('name') as string,
    formData.get('email') as string,
    formData.get('company') as string,
    formData.get('phone') as string,
    formData.get('address') as string,
    formData.get('city') as string,
    formData.get('country') as string,
    formData.get('notes') as string,
  ];

  try {
    const { rows } = await pool.query(qry, values);
    console.log(rows);

    if (!clientId) {
      redirect(`/clients/${rows[0].id}`);
    }

    return {
      success: true,
      message: '',
    };
  } catch (error) {
    console.error('Error saving client:', error);
    return {
      success: false,
      message: `Error saving client: ${error}`,
    };
  }
}

export async function deleteClient(clientId: number | undefined) {
  if (!clientId) return redirect('/clients');

  // const { error } = await supabase.from('client').delete().eq('id', clientId);
  const qry = 'DELETE FROM client WHERE id = $1';
  const values = [clientId];

  try {
    await pool.query(qry, values);
    return {
      success: true,
      message: `Client deleted successfully.`,
    };
  } catch (error) {
    console.error('Error deleting client:', error);
    return {
      success: false,
      message: `Error deleting client: ${error}`,
    };
  }
}

export async function getCountries(): Promise<Country[]> {
  const result = await fetch(
    'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code'
  );

  const data = await result.json();
  return data.countries;
}
