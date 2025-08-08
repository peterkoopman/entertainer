interface Client {
  id?: number;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  notes?: string;
}

interface Booking {
  id: number;
  date: string;
  start_time: string;
  venue_name: string;
  client_id: number;
}

interface Country {
  value: string;
  label: string;
}

export const mockCountries: Country[] = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
];

export const mockClient: Client = {
  id: 1,
  name: 'Test Client',
  email: 'test@example.com',
  company: 'Test Inc.',
  phone: '1234567890',
  address: '123 Test St',
  city: 'Testville',
  country: 'US',
  notes: 'Some notes',
};

export const mockBookings: Booking[] = [
  {
    id: 101,
    date: '2024-01-01',
    start_time: '10:00',
    venue_name: 'Venue 1',
    client_id: 1,
  },
];
