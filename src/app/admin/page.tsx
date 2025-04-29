import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminRoot() {
  const cookieStore = cookies();
  const token = (await cookieStore).get('admin_token');

  if (!token) {
    redirect('/admin-login');
    return null;
  }

  redirect('/admin/dashboard');
}