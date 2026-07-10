import { NextResponse } from 'next/server';
import { runProviderSync, registerSourceAdapter } from '@/lib/ingestion/providers';
import { CambridgePublicAdapter } from '@/lib/ingestion/adapters/cambridge-public-adapter';

registerSourceAdapter(new CambridgePublicAdapter());

export async function GET() {
  return NextResponse.json({ message: 'Sync endpoint ready for provider-backed ingestion.' });
}

export async function POST() {
  const result = await runProviderSync('cambridge-public');

  return NextResponse.json(result);
}
