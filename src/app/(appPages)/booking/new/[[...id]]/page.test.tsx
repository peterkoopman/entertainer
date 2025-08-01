import { render } from '@testing-library/react';
import BookingPage from './page';
import { getSetups, getStatuses, getTypes, getTaxTypes } from '../../actions';
import { getClient } from '../../../clients/actions'; // Correct import
import BookingForm from '../../BookingForm';

jest.mock('../../actions', () => ({
  __esModule: true,
  getSetups: jest.fn(),
  getStatuses: jest.fn(),
  getTypes: jest.fn(),
  getTaxTypes: jest.fn(),
}));

// Added a separate, correctly targeted mock for getClient
jest.mock('../../../clients/actions', () => ({
  __esModule: true,
  getClient: jest.fn(),
}));

jest.mock('../../BookingForm', () => {
  const MockBookingForm = jest.fn((props) => (
    <div data-testid="mock-booking-form">
      Mock Booking Form
      {/* Optionally display props for debugging */}
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  ));
  return {
    __esModule: true,
    default: MockBookingForm,
  };
});

const mockSetups = [{ id: 1, name: 'Setup 1', description: 'Description 1' }];
const mockStatuses = [
  { id: 1, name: 'Status 1', description: 'Description 1' },
];
const mockTypes = [{ id: 1, name: 'Type 1', description: 'Description 1' }];
const mockTaxTypes = [
  { id: 1, name: 'TaxType 1', description: 'Description 1' },
];
const mockClient = {
  company: 'Test Company',
  id: 1,
  name: 'Test Client',
};

describe('BookingPage', () => {
  const mockGetSetups = getSetups as jest.Mock;
  const mockGetStatus = getStatuses as jest.Mock;
  const mockGetTypes = getTypes as jest.Mock;
  const mockGetTaxTypes = getTaxTypes as jest.Mock;
  const mockGetClient = getClient as jest.Mock; // This now correctly references the mocked function
  const MockBookingForm = BookingForm as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetSetups.mockResolvedValue(mockSetups);
    mockGetStatus.mockResolvedValue(mockStatuses);
    mockGetTypes.mockResolvedValue(mockTypes);
    mockGetTaxTypes.mockResolvedValue(mockTaxTypes);
    mockGetClient.mockResolvedValue({
      success: true,
      data: { id: 1, name: 'Test Client', company: 'Test Company' },
    });
  });

  it('renders BookingForm for a new booking (no ID)', async () => {
    const params = { clientId: '1' };
    const Page = await BookingPage({ params });
    render(Page);
    expect(MockBookingForm).toHaveBeenCalledTimes(1);

    // Check the props of the first call to the mock component
    const receivedProps = MockBookingForm.mock.calls[0][0];

    expect(receivedProps).toEqual({
      client: mockClient,
      setups: mockSetups,
      statuses: mockStatuses,
      types: mockTypes,
      taxTypes: mockTaxTypes,
    });

    expect(mockGetClient).toHaveBeenCalledTimes(1);
    expect(mockGetSetups).toHaveBeenCalledTimes(1);
    expect(mockGetStatus).toHaveBeenCalledTimes(1);
    expect(mockGetTypes).toHaveBeenCalledTimes(1);
    expect(mockGetTaxTypes).toHaveBeenCalledTimes(1);
  });
});
