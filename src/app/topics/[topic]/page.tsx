import Link from 'next/link';
import { notFound } from 'next/navigation';
import { QuestionExplorer } from '@/components/QuestionExplorer';
import { getQuestionsForTopic } from '@/lib/catalog';

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const questions = await getQuestionsForTopic(topic);

  if (questions.length === 0) {
    notFound();
  }

  const topicLabel = questions[0]?.topic ?? topic.replace(/-/g, ' ');
  const subjectSlug = questions[0]?.subjectSlug ?? '';

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Topic</p>
          <h1 className="text-3xl font-semibold capitalize">{topicLabel}</h1>
        </div>
        <Link href={`/subjects/${subjectSlug}`} className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50">
          Back to subject
        </Link>
      </div>

      <QuestionExplorer subjectSlug={subjectSlug} questions={questions} />
    </main>
  );
}
