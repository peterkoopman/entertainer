'use server';

import {
  getBooking,
  getSetups,
  getStatuses,
  getTypes,
  getTaxTypes,
} from '../actions';
import BookingForm from '../BookingForm';

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  const bookingId = Number(id);
  const booking = await getBooking(bookingId);

  const setups = await getSetups();
  const statuses = await getStatuses();
  const types = await getTypes();
  const taxTypes = await getTaxTypes();

  return (
    <BookingForm
      booking={booking}
      setups={setups}
      statuses={statuses}
      types={types}
      taxTypes={taxTypes}
      key={bookingId}
    />
  );
}
