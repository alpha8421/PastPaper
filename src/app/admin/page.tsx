import { AdminDashboard } from '@/components/AdminDashboard';
import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
  const [subjectCount, topicCount, questionCount] = await Promise.all([
    prisma.subject.count(),
    prisma.topic.count(),
    prisma.question.count(),
  ]);

  return (
    <AdminDashboard
      subjectCount={subjectCount}
      topicCount={topicCount}
      questionCount={questionCount}
    />
  );
}
