import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');

  // Perform your search logic here
  // const results = await searchRoutes(search);

  return NextResponse.json({
    message: 'Search results',
    search,
    results: [],
  });
}