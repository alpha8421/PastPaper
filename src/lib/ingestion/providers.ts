import type { PublicPaperDescriptor, SourceAdapter, SyncRunResult } from '@/lib/ingestion/types';

const adapters: Record<string, SourceAdapter> = {};

export function registerSourceAdapter(adapter: SourceAdapter) {
  adapters[adapter.name] = adapter;
}

export function listRegisteredSources() {
  return Object.keys(adapters);
}

export async function runProviderSync(adapterName: string): Promise<SyncRunResult> {
  const adapter = adapters[adapterName];

  if (!adapter) {
    throw new Error(`No source adapter registered for ${adapterName}`);
  }

  const papers = await adapter.fetchPublicPapers();
  const result: SyncRunResult = {
    source: adapterName,
    discovered: papers.length,
    upserted: papers.length,
    duplicates: 0,
    skipped: 0,
  };

  return result;
}

export function createDescriptorRecord(fileName: string): Partial<PublicPaperDescriptor> {
  return {
    fileName,
    subjectCode: '9701',
    year: new Date().getFullYear(),
    session: 'MayJun',
    paperNumber: 'P1',
  };
}
