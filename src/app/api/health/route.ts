import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // 1. Test DB connection
    await db.execute('SELECT NOW()');

    // 2. Check if 'settings' table exists
    const result = await db.execute<{
      tablename: string;
    }>('SELECT tablename FROM pg_tables WHERE tablename = $1 ', ['settings']);

    if (!result.rows || result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Database connected, but "settings" table does NOT exist.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Database and "settings" table are ready!',
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'DB error',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}