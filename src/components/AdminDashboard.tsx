'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function AdminDashboard({
  subjectCount,
  topicCount,
  questionCount,
}: {
  subjectCount: number;
  topicCount: number;
  questionCount: number;
}) {
  const [syncResult, setSyncResult] = useState<string>('');
  const [metadataResult, setMetadataResult] = useState<string>('');
  const [uploadResult, setUploadResult] = useState<string>('');
  const [questionId, setQuestionId] = useState('1');
  const [subject, setSubject] = useState('Chemistry');
  const [topic, setTopic] = useState('Atomic structure');
  const [subtopic, setSubtopic] = useState('Atoms');
  const [paper, setPaper] = useState('P1');
  const [variant, setVariant] = useState('11');
  const [marks, setMarks] = useState('10');
  const [file, setFile] = useState<File | null>(null);

  const runSync = async () => {
    const response = await fetch('/api/admin/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider: 'cambridge-public' }),
    });

    const payload = await response.json();
    setSyncResult(`Synced ${payload.upserted ?? 0} records from ${payload.source ?? 'cambridge-public'}.`);
  };

  const updateMetadata = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(`/api/admin/questions/${questionId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject,
        topic,
        subtopic,
        paper,
        variant,
        marks: Number.parseInt(marks, 10),
      }),
    });

    const payload = await response.json();
    setMetadataResult(payload.message ?? 'Metadata updated.');
  };

  const uploadImage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setUploadResult('Choose an image file first.');
      return;
    }

    const formData = new FormData();
    formData.append('questionId', questionId);
    formData.append('image', file);

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    const payload = await response.json();
    setUploadResult(payload.message ?? 'Upload complete.');
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Admin dashboard</p>
          <h1 className="text-3xl font-semibold">Bulk import and metadata correction</h1>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
          {subjectCount} subjects · {topicCount} topics · {questionCount} questions
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bulk import</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input value="cambridge-public" readOnly />
            <Input value="https://www.cambridgeinternational.org" readOnly />
            <Button onClick={runSync}>Run synchronization</Button>
            {syncResult ? <p className="text-sm text-slate-600">{syncResult}</p> : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Edit metadata</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={updateMetadata}>
              <Input placeholder="Question ID" value={questionId} onChange={(event) => setQuestionId(event.target.value)} />
              <Input placeholder="Subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
              <Input placeholder="Topic" value={topic} onChange={(event) => setTopic(event.target.value)} />
              <Input placeholder="Subtopic" value={subtopic} onChange={(event) => setSubtopic(event.target.value)} />
              <Input placeholder="Paper" value={paper} onChange={(event) => setPaper(event.target.value)} />
              <Input placeholder="Variant" value={variant} onChange={(event) => setVariant(event.target.value)} />
              <Input placeholder="Marks" value={marks} onChange={(event) => setMarks(event.target.value)} />
              <Button type="submit" variant="secondary">Save metadata</Button>
              {metadataResult ? <p className="text-sm text-slate-600">{metadataResult}</p> : null}
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload image</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={uploadImage}>
              <Input placeholder="Question ID" value={questionId} onChange={(event) => setQuestionId(event.target.value)} />
              <Input type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
              <Button type="submit" variant="secondary">Upload image</Button>
              {uploadResult ? <p className="text-sm text-slate-600">{uploadResult}</p> : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
