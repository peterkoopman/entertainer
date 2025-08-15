import {
  getClient,
  clientSearch,
  getRecentClients,
  getBookingsForClient,
  saveClient,
  deleteClient,
  getCountries,
  type Client,
  type Booking,
  type Country,
} from './actions';

import { redirect } from 'next/navigation';
import pool from '@/utils/postgres/db';
import { mockDeep } from 'jest-mock-extended';

// Mock the redirect function from next/navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

// Mock the database pool
jest.mock('@/utils/postgres/db', () => ({
  query: jest.fn(),
}));

const mockQuery = pool.query as jest.Mock;

// Mock the fetch API for getCountries
const mockCountries = [
  { value: 'US', label: 'United States 🇺🇸' },
  { value: 'CA', label: 'Canada 🇨🇦' },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        countries: mockCountries,
      }),
  })
) as jest.Mock;

describe('Server Actions', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  // Example data for testing
  const mockClient: Client = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Example Corp',
    phone: '555-1234',
    address: '123 Main St',
    city: 'Anytown',
    country: 'US',
    notes: 'A great client.',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  };

  const mockBooking: Booking = {
    id: 101,
    date: '2025-02-15',
    venue_name: 'The Grand Hall',
    start_time: '19:00',
    end_time: '22:00',
  };

  // Test suite for getClient
  describe('getClient', () => {
    it('should return a client if found', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [mockClient] });
      const result = await getClient(1);
      expect(result).toEqual({ success: true, data: mockClient });
    });

    it('should return null if no client is found', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });
      const result = await getClient(2);
      expect(result).toEqual({ success: true, data: null });
    });

    it('should handle missing client ID', async () => {
      const result = await getClient(undefined);
      expect(result).toEqual({
        success: false,
        message: 'No client ID provided.',
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed');
      mockQuery.mockRejectedValueOnce(error);
      const result = await getClient(1);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Database connection failed');
    });
  });

  // Test suite for clientSearch
  describe('clientSearch', () => {
    it('should return a list of clients matching the search query', async () => {
      const searchResults = [
        {
          id: 1,
          name: 'John Doe',
          company: 'Doe Enterprises',
        },
      ];
      mockQuery.mockResolvedValueOnce({ rows: searchResults });
      const result = await clientSearch('john');
      expect(result).toEqual({
        success: true,
        data: searchResults,
      });
    });

    it('should return null if no clients match the search query', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });
      const result = await clientSearch('xyz');
      expect(result).toEqual({
        success: true,
        data: null,
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Search query failed');
      mockQuery.mockRejectedValueOnce(error);
      const result = await clientSearch('john');
      expect(result.success).toBe(false);
      expect(result.message).toContain('Search query failed');
    });
  });

  // Test suite for getRecentClients
  describe('getRecentClients', () => {
    it('should return a list of recent clients', async () => {
      const recentClients = [
        { id: 3, name: 'Charlie', company: 'C Corp' },
        { id: 2, name: 'Bob', company: 'B Inc' },
      ];
      mockQuery.mockResolvedValueOnce({ rows: recentClients });
      const result = await getRecentClients();
      expect(result).toEqual({
        success: true,
        data: recentClients,
      });
    });

    it('should return null if no recent clients are found', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });
      const result = await getRecentClients();
      expect(result).toEqual({
        success: true,
        data: null,
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Failed to fetch recent clients');
      mockQuery.mockRejectedValueOnce(error);
      const result = await getRecentClients();
      expect(result.success).toBe(false);
      expect(result.message).toContain('Failed to fetch recent clients');
    });
  });

  // Test suite for getBookingsForClient
  describe('getBookingsForClient', () => {
    it('should return a list of bookings for a client', async () => {
      const clientBookings = [mockBooking];
      mockQuery.mockResolvedValueOnce({ rows: clientBookings });
      const result = await getBookingsForClient(1);
      expect(result).toEqual({
        success: true,
        data: clientBookings,
      });
    });

    it('should return null if no bookings are found', async () => {
      mockQuery.mockResolvedValueOnce({ rows: [] });
      const result = await getBookingsForClient(1);
      expect(result).toEqual({
        success: true,
        data: null,
      });
    });

    it('should handle missing client ID', async () => {
      const result = await getBookingsForClient(undefined);
      expect(result).toEqual({
        success: false,
        message: 'No client ID provided.',
      });
    });

    it('should handle database errors', async () => {
      const error = new Error('Booking fetch failed');
      mockQuery.mockRejectedValueOnce(error);
      const result = await getBookingsForClient(1);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Booking fetch failed');
    });
  });

  // Test suite for saveClient
  describe('saveClient', () => {
    it('should create a new client and redirect to the client page', async () => {
      const formData = new FormData();
      formData.append('name', 'New Client');
      formData.append('email', 'new@example.com');
      // Add other form data fields as needed

      mockQuery.mockResolvedValueOnce({
        rows: [{ ...mockClient, id: 123, name: 'New Client' }],
      });

      await saveClient({ success: false, message: '' }, formData);
      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(redirect).toHaveBeenCalledWith('/clients/123');
    });

    it('should update an existing client without redirecting', async () => {
      const formData = new FormData();
      formData.append('id', '1');
      formData.append('name', 'Updated Client');
      formData.append('email', 'updated@example.com');
      // Add other form data fields as needed

      mockQuery.mockResolvedValueOnce({
        rows: [{ ...mockClient, name: 'Updated Client' }],
      });

      const result = await saveClient({ success: true, message: '' }, formData);
      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(redirect).not.toHaveBeenCalled();
      expect(result).toEqual({
        success: true,
        message: '',
      });
    });

    it('should handle database errors during save', async () => {
      const formData = new FormData();
      formData.append('name', 'Error Client');
      const error = new Error('Save operation failed');
      mockQuery.mockRejectedValueOnce(error);

      const result = await saveClient(
        { success: false, message: '' },
        formData
      );
      expect(result.success).toBe(false);
      expect(result.message).toContain('Save operation failed');
    });
  });

  // Test suite for deleteClient
  describe('deleteClient', () => {
    it('should successfully delete a client', async () => {
      mockQuery.mockResolvedValueOnce({});
      const result = await deleteClient(1);
      expect(result).toEqual({
        success: true,
        message: 'Client deleted successfully.',
      });
      expect(mockQuery).toHaveBeenCalledWith(
        'DELETE FROM client WHERE id = $1',
        [1]
      );
    });

    it('should redirect if no client ID is provided', async () => {
      await deleteClient(undefined);
      expect(redirect).toHaveBeenCalledWith('/clients');
    });

    it('should handle database errors during deletion', async () => {
      const error = new Error('Deletion failed');
      mockQuery.mockRejectedValueOnce(error);
      const result = await deleteClient(1);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Deletion failed');
    });
  });

  // Test suite for getCountries
  describe('getCountries', () => {
    it('should return a list of countries', async () => {
      const result = await getCountries();
      expect(result).toEqual(mockCountries);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code'
      );
    });
  });
});
