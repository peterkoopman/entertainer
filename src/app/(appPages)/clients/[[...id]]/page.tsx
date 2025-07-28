'use server';

import Link from 'next/link';
import {
  getBookingsForClient,
  getClient,
  getCountries,
  RequestResult,
  Client,
} from '../actions';
import ClientForm from '../ClientForm';

export default async function ClientPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  const clientId = Number(id);

  const [countries, clientResult, bookingsResult] = await Promise.all([
    getCountries(),
    getClient(clientId),
    getBookingsForClient(clientId),
  ]);
  if (!id) {
    return (
      <ClientForm
        client={null}
        countries={countries}
        bookings={[]}
        key={undefined}
      />
    );
  }

  if (clientResult.success === false) {
    return <h2>Error getting client</h2>;
  }

  if (bookingsResult.success === false) {
    return <h2>Error getting bookings for client</h2>;
  }
  const bookings = bookingsResult.data;

  const client = clientResult.success && clientResult.data;

  if (clientResult.success === true && clientResult.data === null) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Client not found</h2>
        <p>
          <Link href="/">Home</Link>
        </p>
      </div>
    );
  }

  return (
    <ClientForm
      client={client as Client | null}
      countries={countries}
      bookings={bookings || []}
      key={clientId}
    />
  );
}
