'use client';
import { useParams } from 'next/navigation';

export default function RouteTitle() {
  const { id } = useParams();

  return (
  <>
    Route page: {id}
  </>);
}