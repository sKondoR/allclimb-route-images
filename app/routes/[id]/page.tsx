'use client';

import { useParams } from 'next/navigation';

export default function RoutePage() {
  const { id } = useParams();

  return <div>Route page: {id}</div>;
}