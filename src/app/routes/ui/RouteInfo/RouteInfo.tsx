'use client';
import { useParams } from 'next/navigation';

export default function RoutePage() {
  const { id } = useParams();

  return (
  <>
    Route page: {id}
  </>);
}