import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionExplorer } from '@/components/QuestionExplorer';
import { getQuestionsForSubject, getSubjectBySlug } from '@/lib/catalog';

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = await params;
  const subjectRecord = await getSubjectBySlug(subject);

  if (!subjectRecord) {
    notFound();
  }

  const questions = await getQuestionsForSubject(subjectRecord.slug);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Subject</p>
          <h1 className="text-3xl font-semibold capitalize">{subjectRecord.name}</h1>
        </div>
        <Link href="/" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50">
          Back to home
        </Link>
      </div>

      <div className="mb-6 grid gap-4">
        {subjectRecord.topics.map((topic) => (
          <Card key={topic.slug}>
            <CardHeader className="flex-row items-center justify-between gap-4">
              <CardTitle>{topic.name}</CardTitle>
              <Badge>{topic.questions.length} questions</Badge>
            </CardHeader>
            <CardContent>
              <Link href={`/topics/${topic.slug}`} className="mr-2 inline-flex items-center justify-center rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-200">
                Open topic explorer
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <QuestionExplorer subjectSlug={subjectRecord.slug} questions={questions} />
    </main>
  );
}
