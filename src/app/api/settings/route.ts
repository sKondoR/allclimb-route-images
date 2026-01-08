import { NextRequest, NextResponse } from 'next/server';
import { SettingsService } from '@/lib/services/settings.service';

export async function GET(request: NextRequest) {
  try {

    const settings = await SettingsService.find();
    // console.log('✅ Settings fetched:', settings);
    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    // console.error('❌ Error in GET /api/settings:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';
    const stack = error instanceof Error ? error.stack : undefined;

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch settings ',
        message,
        stack,
      },
      { status: 500 }
    );
  }
}
