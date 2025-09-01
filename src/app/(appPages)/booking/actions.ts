'use server';

import { redirect } from 'next/navigation';
import pool from '@/utils/postgres/db';

type BookingResultTrue = { success: true; data: Booking | null };
type BookingResultFalse = { success: false; message: string };
export type BookingResult = BookingResultTrue | BookingResultFalse;

export type UpdateResult = { success: boolean; message: string };
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
  if (!id)
    return {
      success: false,
      message: 'No booking ID provided.',
    } as BookingResult;

  const qry = `SELECT *, c.name AS client_name, c.company AS client_company 
                FROM booking b LEFT JOIN client c 
                ON b.client_id = c.id 
                WHERE b.id = $1`;
  const values = [id];

  try {
    const { rows, rowCount } = await pool.query(qry, values);

    if (rowCount === 0) {
      return {
        success: true,
        data: null,
      } as BookingResult;
    }

    return {
      success: true,
      data: rows[0],
    } as BookingResult;
  } catch (error) {
    console.error('Error fetching booking:', error);
    return {
      success: false,
      message: `Error fetching booking: ${error}`,
    } as BookingResult;
  }
}

export async function saveBooking(prevData: UpdateResult, formData: FormData) {
  const id = formData.get('id') ? Number(formData.get('id')) : undefined;

  const qry = `INSERT INTO booking (id, venue_name, address, client_id, setup_id, type_id, status_id, tax_type_id, date, load_in, start_time, end_time, fee, deposit, job_notes, personnel_notes) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
              ON CONFLICT (id) DO UPDATE 
              SET venue_name = $2, 
                  address = $3
                  client_id = $4, 
                  setup_id = $5, 
                  type_id = $6, 
                  status_id = $7, 
                  tax_type_id = $8,
                  date = $9, 
                  load_in = $10, 
                  start_time = $11, 
                  end_time = $12, 
                  fee = $13, 
                  deposit = $14, 
                  job_notes = $15, 
                  personnel_notes = $16
              RETURNING *`;
  const values = [
    id,
    formData.get('venue_name') as string,
    formData.get('address') as string,
    Number(formData.get('client_id')) || null,
    Number(formData.get('setup_id')) || null,
    Number(formData.get('type_id')) || null,
    Number(formData.get('status_id')) || null,
    Number(formData.get('tax_type_id')) || null,
    formData.get('date') || null,
    formData.get('load_in') || null,
    formData.get('start_time') || null,
    formData.get('end_time') || null,
    Number(formData.get('fee')) || null,
    Number(formData.get('deposit')) || null,
    formData.get('job_notes') as string,
    formData.get('personnel_notes') as string,
  ];

  try {
    const { rows } = await pool.query(qry, values);

    if (!id) {
      redirect(`/booking/${rows[0].id}`);
    }

    return {
      success: true,
      message: `Booking updated successfully.`,
    };
  } catch (error) {
    console.error('Error saving booking:', error);
    return {
      success: false,
      message: `Error saving booking: ${error}`,
    };
  }
}

export async function deleteBooking(id: number) {
  const qry = `DELETE FROM booking WHERE id = $1`;
  const values = [id];

  try {
    const { rowCount } = await pool.query(qry, values);

    if (rowCount && rowCount > 0) {
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
  } catch (error) {
    console.error('Error deleting booking', error);
    return {
      success: false,
      message: `Error deleting booking: ${error}`,
    };
  }
}

export async function getSetups() {
  const qry = 'SELECT * FROM booking_setup';

  try {
    const { rows } = await pool.query(qry);
    return rows;
  } catch (error) {
    console.error('Error fetching setups:', error);
    return null;
  }
}

export async function getStatuses() {
  const qry = 'SELECT * FROM booking_status';

  try {
    const { rows } = await pool.query(qry);
    return rows;
  } catch (error) {
    console.error('Error fetching statuses:', error);
    return null;
  }
}

export async function getTypes() {
  const qry = 'SELECT * FROM booking_type';

  try {
    const { rows } = await pool.query(qry);
    return rows;
  } catch (error) {
    console.error('Error fetching types:', error);
    return null;
  }
}

export async function getTaxTypes() {
  const qry = 'SELECT * FROM booking_tax_type';

  try {
    const { rows } = await pool.query(qry);
    return rows;
  } catch (error) {
    console.error('Error fetching tax types:', error);
    return null;
  }
}
