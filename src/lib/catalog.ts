import { prisma } from '@/lib/prisma';

export type SubjectSummary = {
  code: string;
  name: string;
  slug: string;
  description: string | null;
  questionCount: number;
};

export type ExplorerQuestionRecord = {
  id: number;
  subject: string;
  subjectSlug: string;
  topic: string;
  subtopic: string | null;
  year: number;
  session: string;
  paper: string;
  variant: string;
  questionNumber: number;
  marks: number;
};

function normalizeQuestionRecord(question: {
  id: number;
  subject: { name: string; slug: string };
  topic: { name: string };
  subtopic: { name: string } | null;
  session: { label: string };
  year: { value: number };
  paper: { label: string };
  variant: { label: string };
  questionNumber: number;
  marks: number;
}): ExplorerQuestionRecord {
  return {
    id: question.id,
    subject: question.subject.name,
    subjectSlug: question.subject.slug,
    topic: question.topic.name,
    subtopic: question.subtopic?.name ?? null,
    year: question.year.value,
    session: question.session.label,
    paper: question.paper.label,
    variant: question.variant.label,
    questionNumber: question.questionNumber,
    marks: question.marks,
  };
}

export async function getSubjects(): Promise<SubjectSummary[]> {
  const subjects = await prisma.subject.findMany({
    orderBy: { name: 'asc' },
    select: {
      code: true,
      name: true,
      slug: true,
      description: true,
      _count: { select: { questions: true } },
    },
  });

  return subjects.map((subject) => ({
    code: subject.code,
    name: subject.name,
    slug: subject.slug,
    description: subject.description,
    questionCount: subject._count.questions,
  }));
}

export async function getSubjectBySlug(slug: string) {
  return prisma.subject.findUnique({
    where: { slug },
    include: {
      topics: {
        orderBy: { name: 'asc' },
        include: {
          questions: {
            select: { id: true },
          },
        },
      },
    },
  });
}

export async function getQuestionsForSubject(subjectSlug: string): Promise<ExplorerQuestionRecord[]> {
  const questions = await prisma.question.findMany({
    where: { subject: { slug: subjectSlug } },
    orderBy: [{ year: { value: 'desc' } }, { questionNumber: 'asc' }],
    include: {
      subject: true,
      topic: true,
      subtopic: true,
      session: true,
      year: true,
      paper: true,
      variant: true,
    },
  });

  return questions.map(normalizeQuestionRecord);
}

export async function getQuestionById(id: number) {
  return prisma.question.findUnique({
    where: { id },
    include: {
      subject: true,
      topic: true,
      subtopic: true,
      session: true,
      year: true,
      paper: true,
      variant: true,
    },
  });
}

export async function getQuestionsForTopic(topicSlug: string): Promise<ExplorerQuestionRecord[]> {
  const questions = await prisma.question.findMany({
    where: { topic: { slug: topicSlug } },
    orderBy: [{ year: { value: 'desc' } }, { questionNumber: 'asc' }],
    include: {
      subject: true,
      topic: true,
      subtopic: true,
      session: true,
      year: true,
      paper: true,
      variant: true,
    },
  });

  return questions.map(normalizeQuestionRecord);
}
