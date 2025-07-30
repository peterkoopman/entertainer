import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientForm from './ClientForm';
import { deleteClient } from './actions';
import { redirect } from 'next/navigation';

// Define types used by the component for test clarity
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

// Mock the modules
jest.mock('./actions', () => ({
  saveClient: jest.fn(),
  deleteClient: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

// Mock useActionState
const mockUseActionState = jest.fn();
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useActionState: (action: unknown, initialState: unknown) =>
      mockUseActionState(action, initialState),
  };
});

const mockCountries: Country[] = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
];

const mockClient: Client = {
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

const mockBookings: Booking[] = [
  {
    id: 101,
    date: '2024-01-01',
    start_time: '10:00',
    venue_name: 'Venue 1',
    client_id: 1,
  },
];

describe('ClientForm', () => {
  let formAction: jest.Mock;
  let formState: { success: boolean; message: string };
  let isPending: boolean;

  beforeEach(() => {
    jest.clearAllMocks();
    formAction = jest.fn((state, payload) =>
      Promise.resolve({ success: true, message: 'Saved' })
    );
    formState = { success: false, message: '' };
    isPending = false;
    mockUseActionState.mockReturnValue([formState, formAction, isPending]);
    // Mock window.confirm for deletion tests
    window.confirm = jest.fn(() => true);
  });

  it('renders correctly for a new client', () => {
    render(<ClientForm countries={mockCountries} bookings={[]} />);
    expect(
      screen.getByRole('heading', { name: /new client/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
    expect(screen.queryByLabelText(/bookings/i)).not.toBeInTheDocument();
  });

  it('renders correctly for an existing client with bookings', () => {
    render(
      <ClientForm
        client={mockClient}
        countries={mockCountries}
        bookings={mockBookings}
      />
    );

    expect(
      screen.getByRole('heading', { name: /client: test client/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue('Test Client');
    expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/bookings/i)).toBeInTheDocument();
  });

  it('highlights save button when form is dirty', async () => {
    render(<ClientForm countries={mockCountries} bookings={[]} />);
    const nameInput = screen.getByLabelText(/name/i);
    const saveButton = screen.getByTestId('saveButton');
    expect(saveButton).toHaveClass('MuiButton-outlined');

    fireEvent.change(nameInput, { target: { value: 'New Name' } });

    await waitFor(() => {
      expect(saveButton).toHaveClass('MuiButton-contained');
    });
  });

  it('submits the form when save is clicked', async () => {
    render(<ClientForm countries={mockCountries} bookings={[]} />);
    const nameInput = screen.getByLabelText(/name/i);
    const saveButton = screen.getByRole('button', { name: /save/i });

    fireEvent.change(nameInput, { target: { value: 'New Client Name' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(formAction).toHaveBeenCalled();
    });
  });

  it('shows loading indicator during submission', () => {
    isPending = true;
    mockUseActionState.mockReturnValue([formState, formAction, isPending]);

    render(<ClientForm countries={mockCountries} bookings={[]} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('handles client deletion', async () => {
    render(
      <ClientForm client={mockClient} countries={mockCountries} bookings={[]} />
    );
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this client?'
    );

    await waitFor(() => {
      expect(deleteClient).toHaveBeenCalledWith(1);
    });
    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith('/clients');
    });
  });

  it('does not delete client if confirmation is cancelled', () => {
    (window.confirm as jest.Mock).mockReturnValue(false);

    render(
      <ClientForm client={mockClient} countries={mockCountries} bookings={[]} />
    );
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this client?'
    );
    expect(deleteClient).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('redirects to new booking page', () => {
    render(
      <ClientForm client={mockClient} countries={mockCountries} bookings={[]} />
    );
    const newBookingButton = screen.getByRole('button', {
      name: /new booking/i,
    });
    fireEvent.click(newBookingButton);

    expect(redirect).toHaveBeenCalledWith('/booking/new/1');
  });

  it('renders bookings with correct links', () => {
    render(
      <ClientForm
        client={mockClient}
        countries={mockCountries}
        bookings={mockBookings}
      />
    );

    // Open the select dropdown
    fireEvent.mouseDown(screen.getByLabelText(/bookings/i));

    const bookingLink = screen.getByRole('link', {
      name: /2024-01-01, 10:00 - venue 1/i,
    });
    expect(bookingLink).toBeInTheDocument();
    expect(bookingLink).toHaveAttribute('href', '/booking/101');
  });

  it('resets dirty state after successful save', async () => {
    const { rerender } = render(
      <ClientForm countries={mockCountries} bookings={[]} />
    );
    const nameInput = screen.getByLabelText(/name/i);
    const saveButton = screen.getByRole('button', { name: /save/i });

    // Make form dirty
    fireEvent.change(nameInput, { target: { value: 'New Name' } });
    await waitFor(() => {
      expect(saveButton).toHaveClass('MuiButton-contained');
    });

    // Simulate successful save by updating the formState from the mock
    const newFormState = { success: true, message: 'Saved!' };
    mockUseActionState.mockReturnValue([newFormState, formAction, false]);

    rerender(<ClientForm countries={mockCountries} bookings={[]} />);

    // The form should no longer be dirty
    await waitFor(() => {
      expect(saveButton).toHaveClass('MuiButton-outlined');
    });
  });
});
