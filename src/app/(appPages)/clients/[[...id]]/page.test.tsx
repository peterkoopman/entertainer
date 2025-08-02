import { render } from '@testing-library/react';
import ClientPage from './page';
import { getCountries, getClient, getBookingsForClient } from '../actions';
import ClientForm from '../ClientForm';

jest.mock('../actions', () => ({
  __esModule: true,
  getCountries: jest.fn(),
  getClient: jest.fn(),
  getBookingsForClient: jest.fn(),
}));

jest.mock('../ClientForm', () => {
  const MockClientForm = jest.fn((props) => (
    <div data-testid="mock-client-form">
      Mock Client Form
      {/* Optionally display props for debugging */}
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  ));
  return {
    __esModule: true,
    default: MockClientForm,
  };
});

describe('ClientPage', () => {
  const mockGetCountries = getCountries as jest.Mock;
  const mockGetClient = getClient as jest.Mock;
  const mockGetBookingsForClient = getBookingsForClient as jest.Mock;
  const MockClientForm = ClientForm as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCountries.mockResolvedValue([
      { value: 'NZ', label: 'New Zealand' },
      { value: 'CA', label: 'Canada' },
    ]);
    mockGetClient.mockResolvedValue({
      success: true,
      data: { id: 1, name: 'Test Client' },
    });
    mockGetBookingsForClient.mockResolvedValue({ success: true, data: [] }); // Default to empty bookings
  });

  it('renders empty ClientForm for a new client (no ID)', async () => {
    const Page = await ClientPage({ params: Promise.resolve({}) });
    render(Page);
    expect(MockClientForm).toHaveBeenCalledTimes(1);

    // Check the props of the first call to the mock component
    const receivedProps = MockClientForm.mock.calls[0][0];
    expect(receivedProps).toEqual({
      client: null,
      countries: [
        { value: 'NZ', label: 'New Zealand' },
        { value: 'CA', label: 'Canada' },
      ],
      bookings: [],
    });
    expect(mockGetClient).not.toHaveBeenCalled();
    expect(mockGetBookingsForClient).not.toHaveBeenCalled();
    // getCountries should still be called to populate the dropdown
    expect(mockGetCountries).toHaveBeenCalledTimes(1);
  });
});
