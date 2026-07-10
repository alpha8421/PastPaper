import { NextResponse } from 'next/server';
import { runProviderSync, registerSourceAdapter } from '@/lib/ingestion/providers';
import { CambridgePublicAdapter } from '@/lib/ingestion/adapters/cambridge-public-adapter';

registerSourceAdapter(new CambridgePublicAdapter());

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const provider = typeof body.provider === 'string' ? body.provider : 'cambridge-public';

  const result = await runProviderSync(provider);

  return NextResponse.json(result);
}
