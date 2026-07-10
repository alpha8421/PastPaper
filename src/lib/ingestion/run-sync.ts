import { prisma } from '@/lib/prisma';
import type { SyncRunResult } from '@/lib/ingestion/types';

export async function runPaperSync(): Promise<SyncRunResult> {
  const result: SyncRunResult = {
    source: 'placeholder-adapter',
    discovered: 0,
    upserted: 0,
    duplicates: 0,
    skipped: 0,
  };

  await prisma.$connect();
  await prisma.$disconnect();

  return result;
}

void runPaperSync();
