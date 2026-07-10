import Link from 'next/link';
import { notFound } from 'next/navigation';
import { QuestionViewer } from '@/components/QuestionViewer';
import { getQuestionById, getQuestionsForSubject } from '@/lib/catalog';

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const questionId = Number.parseInt(id, 10);

  if (Number.isNaN(questionId)) {
    notFound();
  }

  const question = await getQuestionById(questionId);

  if (!question) {
    notFound();
  }

  const questions = await getQuestionsForSubject(question.subject.slug);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Question viewer</p>
          <h1 className="text-3xl font-semibold">{question.subject.name} · {question.topic.name}</h1>
        </div>
        <Link href={`/subjects/${question.subject.slug}`} className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50">
          Back to topics
        </Link>
      </div>

      <QuestionViewer questions={questions} initialQuestionId={question.id} />
    </main>
  );
}
