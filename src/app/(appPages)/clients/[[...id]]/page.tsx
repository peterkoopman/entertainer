'use server';

import {
  getBookingsForClient,
  getClient,
  getCountries,
  RequestResult,
  Client,
} from '../actions';
import { theme } from '@/utils/muiThemes';
import { ThemeProvider } from '@mui/material';
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

  if (client) {
    return (
      <ClientForm
        client={client}
        countries={countries}
        bookings={bookings || []}
        key={clientId}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <h2>No client found</h2>
    </ThemeProvider>
  );
}
