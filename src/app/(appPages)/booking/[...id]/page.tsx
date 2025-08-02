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

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  const bookingId = Number(id);
  let booking: Booking | null | undefined;

  const result: BookingResult | null = await getBooking(bookingId);

  if (result && result.success) {
    booking = result.data;
  } else {
    booking = null;
  }

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
