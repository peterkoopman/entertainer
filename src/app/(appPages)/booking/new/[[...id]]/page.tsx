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
import { Box } from '@mui/material';
import Link from 'next/link';

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  const setups = await getSetups();
  const statuses = await getStatuses();
  const types = await getTypes();
  const taxTypes = await getTaxTypes();

  const clientResult: RequestResult<Client> = await getClient(Number(id));
  const client = clientResult.success ? clientResult.data : null;

  return client ? (
    <BookingForm
      client={client as Client | null}
      setups={setups}
      statuses={statuses}
      types={types}
      taxTypes={taxTypes}
    />
  ) : (
    <>
      <h2>{`That client id does not exist.`}</h2>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Link href="/">Home</Link>
      </Box>
    </>
  );
}
