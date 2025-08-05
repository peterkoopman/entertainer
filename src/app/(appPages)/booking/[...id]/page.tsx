'use server';

import {
  getBooking,
  getSetups,
  getStatuses,
  getTypes,
  getTaxTypes,
  Booking,
  BookingResult,
} from '../actions';
import BookingForm from '../BookingForm';
import BookingNotFound from '../not-found';

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  const result: BookingResult | null = await getBooking(Number(id));
  let booking: Booking | null | undefined = null;

  if (result && result.success) booking = result.data;

  if (!booking) return BookingNotFound();

  const setups = await getSetups();
  const statuses = await getStatuses();
  const types = await getTypes();
  const taxTypes = await getTaxTypes();

  return (
    <BookingForm
      booking={booking as Booking | null}
      setups={setups}
      statuses={statuses}
      types={types}
      taxTypes={taxTypes}
    />
  );
}
