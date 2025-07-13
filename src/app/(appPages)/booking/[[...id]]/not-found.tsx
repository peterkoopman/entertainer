import Link from 'next/link';

export default function BookingNotFound() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '50px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}>
      <h2>Booking Not Found!</h2>
      <p>We couldn&apos;t locate a booking with that specific ID.</p>
      <p>It might have been deleted or never existed.</p>
      <Link
        href="/my-bookings"
        style={{
          display: 'inline-block',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
        }}>
        View Your Bookings
      </Link>
      <br />
      <Link
        href="/"
        style={{
          display: 'inline-block',
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#6c757d',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
        }}>
        Go to Home
      </Link>
    </div>
  );
}
