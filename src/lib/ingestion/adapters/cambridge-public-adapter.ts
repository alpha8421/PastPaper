import type { PublicPaperDescriptor, SourceAdapter } from '@/lib/ingestion/types';

const CAMBRIDGE_SOURCE = 'cambridge-public';

export class CambridgePublicAdapter implements SourceAdapter {
  name = CAMBRIDGE_SOURCE;

  async fetchPublicPapers(): Promise<PublicPaperDescriptor[]> {
    return [
      {
        source: CAMBRIDGE_SOURCE,
        url: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-chemistry-9701/past-papers/',
        fileName: '9701_s23_qp_11.pdf',
        subjectCode: '9701',
        year: 2023,
        session: 'MayJun',
        paperNumber: 'P1',
        variant: '11',
      },
    ];
  }

  async validatePaperFile(_fileName: string, _buffer: Buffer): Promise<boolean> {
    return true;
  }

  extractMetadata(fileName: string): Partial<PublicPaperDescriptor> {
    const pieces = fileName.split('_');

    return {
      fileName,
      subjectCode: pieces[0] ?? '9701',
      year: pieces[1] ? Number.parseInt(pieces[1].replace(/[^0-9]/g, ''), 10) : new Date().getFullYear(),
      session: pieces[1]?.toLowerCase().includes('m') ? 'MayJun' : 'OctNov',
      paperNumber: pieces[3] ?? 'P1',
      variant: pieces[4]?.replace(/[^0-9]/g, '') || undefined,
    };
  }
}
