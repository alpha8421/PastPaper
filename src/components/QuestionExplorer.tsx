'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { ExplorerQuestionRecord } from '@/lib/catalog';

export function QuestionExplorer({
  subjectSlug,
  questions,
}: {
  subjectSlug: string;
  questions: ReadonlyArray<ExplorerQuestionRecord>;
}) {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState<string>('all');
  const [session, setSession] = useState<string>('all');
  const [paper, setPaper] = useState<string>('all');
  const [variant, setVariant] = useState<string>('all');
  const [marks, setMarks] = useState<string>('all');

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSubject = !subjectSlug || question.subjectSlug === subjectSlug;
      const matchesQuery =
        query.trim().length === 0 ||
        [question.topic, question.subtopic ?? '', question.paper, question.session, String(question.questionNumber)]
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase());

      const matchesYear = year === 'all' || String(question.year) === year;
      const matchesSession = session === 'all' || question.session === session;
      const matchesPaper = paper === 'all' || question.paper === paper;
      const matchesVariant = variant === 'all' || question.variant === variant;
      const matchesMarks = marks === 'all' || String(question.marks) === marks;

      return matchesSubject && matchesQuery && matchesYear && matchesSession && matchesPaper && matchesVariant && matchesMarks;
    });
  }, [marks, paper, questions, query, session, subjectSlug, variant, year]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-6">
        <Input placeholder="Search topic or question" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2" value={year} onChange={(event) => setYear(event.target.value)}>
          <option value="all">Year</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2" value={session} onChange={(event) => setSession(event.target.value)}>
          <option value="all">Session</option>
          <option value="February/March">February/March</option>
          <option value="May/June">May/June</option>
          <option value="October/November">October/November</option>
        </select>
        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2" value={paper} onChange={(event) => setPaper(event.target.value)}>
          <option value="all">Paper</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
          <option value="P3">P3</option>
          <option value="P4">P4</option>
          <option value="P5">P5</option>
        </select>
        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2" value={variant} onChange={(event) => setVariant(event.target.value)}>
          <option value="all">Variant</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="21">21</option>
          <option value="31">31</option>
        </select>
        <select className="rounded-xl border border-slate-200 bg-white px-3 py-2" value={marks} onChange={(event) => setMarks(event.target.value)}>
          <option value="all">Marks</option>
          <option value="6">6</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="15">15</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredQuestions.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-slate-600">No questions match the current filter combination.</CardContent>
          </Card>
        ) : (
          filteredQuestions.map((question) => (
            <Card key={question.id}>
              <CardHeader className="flex-row items-center justify-between gap-4">
                <CardTitle>
                  {question.topic} · Q{question.questionNumber} · {question.paper} · {question.variant}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge>{question.session}</Badge>
                  <Badge>{question.year}</Badge>
                  <Badge>{question.marks} marks</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-3">
                <Link href={`/questions/${question.id}`} className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200">
                  Open question
                </Link>
                <span className="text-sm text-slate-600">Subtopic: {question.subtopic}</span>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
