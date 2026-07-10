export type SessionCode = 'FebMar' | 'MayJun' | 'OctNov';

export interface PublicPaperDescriptor {
  source: string;
  url: string;
  fileName: string;
  subjectCode: string;
  year: number;
  session: SessionCode;
  paperNumber: string;
  variant?: string;
  questionNumber?: number;
  marks?: number;
  checksum?: string;
}

export interface SourceAdapter {
  name: string;
  fetchPublicPapers(): Promise<PublicPaperDescriptor[]>;
  validatePaperFile(fileName: string, buffer: Buffer): Promise<boolean>;
  extractMetadata(fileName: string): Partial<PublicPaperDescriptor>;
}

export interface SyncRunResult {
  source: string;
  discovered: number;
  upserted: number;
  duplicates: number;
  skipped: number;
}
