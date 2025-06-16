'use client';

import { useParams } from 'next/navigation';

export default function ClientPage() {
  const params = useParams<{ id: string[] }>();

  return <div>Client page {params?.id || 'No id provided'}</div>;
}
