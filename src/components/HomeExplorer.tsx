'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { SubjectSummary } from '@/lib/catalog';

export function HomeExplorer({ initialSubjects }: { initialSubjects: ReadonlyArray<SubjectSummary> }) {
  const [query, setQuery] = useState('');

  const filteredSubjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return initialSubjects;
    }

    return initialSubjects.filter((subject) => {
      return [subject.name, subject.code, subject.description ?? '']
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [initialSubjects, query]);

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-10 md:px-8">
      <section className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Topical Cambridge</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">Search Cambridge past paper questions by topic instantly.</h1>
          <p className="max-w-2xl text-base text-slate-600 md:text-lg">
            A focused, browser-first database for Cambridge International AS & A Level students. Browse official question sets by subject, topic, subtopic, paper, series, and year without opening PDFs one by one.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="mb-2 block text-sm font-medium text-slate-700">Global search</label>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none ring-0"
            placeholder="Search topic, paper, question, marks..."
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {filteredSubjects.map((subject) => (
          <article key={subject.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-slate-900">{subject.name}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{subject.code}</span>
            </div>
            <p className="mb-4 text-sm text-slate-600">{subject.description ?? 'No description available yet.'}</p>
            <div className="mb-4 flex items-center justify-between text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              <span>Questions</span>
              <span>{subject.questionCount}</span>
            </div>
            <Link
              href={`/subjects/${subject.slug}`}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Browse topics
            </Link>
          </article>
        ))}
      </section>

      {filteredSubjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
          No subject matches the current query.
        </div>
      ) : null}
    </main>
  );
}
