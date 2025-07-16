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
  const countries = await getCountries();
  const { id } = await params;
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
  const clientId = Number(id);
  const clientData: RequestResult<Client> | null = await getClient(clientId);

  const bookingsResult = await getBookingsForClient(clientId);
  if (bookingsResult.success === false) {
    return <h2>Error getting bookings for client</h2>;
  }
  const bookings = bookingsResult.data;

  const client = clientData.success && clientData.data;

  if (clientData.success === true && clientData.data === null) {
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
