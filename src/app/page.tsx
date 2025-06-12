import { redirect } from 'next/navigation';

export default function Home() {
  // TODO: determine whether user is logged in. Redirect to dsahboard or login page
  redirect('/dashboard');
}
