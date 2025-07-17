'use server';

import {
  getSetups,
  getStatuses,
  getTypes,
  getTaxTypes,
} from '@/app/(appPages)/booking/actions';
import {
  getClient,
  RequestResult,
  Client,
} from '@/app/(appPages)/clients/actions';
import BookingForm from '@/app/(appPages)/booking/BookingForm';

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  const clientId = Number(id);
  const setups = await getSetups();
  const statuses = await getStatuses();
  const types = await getTypes();
  const taxTypes = await getTaxTypes();

  const clientResult: RequestResult<Client> | null = await getClient(clientId);
  const client = clientResult.success && clientResult.data;

  return (
    <BookingForm
      client={client as Client | null}
      setups={setups}
      statuses={statuses}
      types={types}
      taxTypes={taxTypes}
      key={clientId}
    />
  );
}
