import { render } from '@testing-library/react';
import BookingPage from './page';
import {
  getSetups,
  getStatuses,
  getTypes,
  getTaxTypes,
  getBooking,
} from '../actions';
import BookingForm from '../BookingForm';

jest.mock('../actions', () => ({
  __esModule: true,
  getSetups: jest.fn(),
  getStatuses: jest.fn(),
  getTypes: jest.fn(),
  getTaxTypes: jest.fn(),
  getBooking: jest.fn(),
}));

jest.mock('../BookingForm', () => {
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
const mockBooking = {
  id: 1,
  client_id: 1,
  date: '2025-03-31',
  load_in: '15:00:00',
  start_time: '16:00:00',
  end_time: '18:00:00',
  fee: 1000,
  deposit: 100,
  venue_name: 'Test Booking Venue Name',
  address: 'Test Booking Address',
  job_notes: 'Test Booking Job Notes',
  personnel_notes: 'Test Booking Personnel Notes',
  setup_id: 1,
  type_id: 1,
  status_id: 1,
  tax_type_id: 1,
  client: {
    name: 'Test Client',
    company: 'Test Company',
  },
};

describe('BookingPage', () => {
  const mockGetSetups = getSetups as jest.Mock;
  const mockGetStatus = getStatuses as jest.Mock;
  const mockGetTypes = getTypes as jest.Mock;
  const mockGetTaxTypes = getTaxTypes as jest.Mock;
  const mockGetBooking = getBooking as jest.Mock;
  const MockBookingForm = BookingForm as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetSetups.mockResolvedValue(mockSetups);
    mockGetStatus.mockResolvedValue(mockStatuses);
    mockGetTypes.mockResolvedValue(mockTypes);
    mockGetTaxTypes.mockResolvedValue(mockTaxTypes);
    mockGetBooking.mockResolvedValue({
      success: true,
      data: mockBooking,
    });
  });

  it('renders BookingForm for an existing booking', async () => {
    const params = { id: '1' };
    const Page = await BookingPage({ params });
    render(Page);
    expect(MockBookingForm).toHaveBeenCalledTimes(1);

    // Check the props of the first call to the mock component
    const receivedProps = MockBookingForm.mock.calls[0][0];

    expect(receivedProps).toEqual({
      booking: mockBooking,
      setups: mockSetups,
      statuses: mockStatuses,
      types: mockTypes,
      taxTypes: mockTaxTypes,
    });

    expect(mockGetSetups).toHaveBeenCalledTimes(1);
    expect(mockGetStatus).toHaveBeenCalledTimes(1);
    expect(mockGetTypes).toHaveBeenCalledTimes(1);
    expect(mockGetTaxTypes).toHaveBeenCalledTimes(1);
  });
});
