import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import style from './BookingSearch.module.css';
import 'dayjs/locale/en-gb';

const BookingSearch = () => {
  return (
    <div className={style.search}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker label="Search bookings" sx={{ width: '100%' }} />
      </LocalizationProvider>
    </div>
  );
};

export default BookingSearch;
