import { prisma } from '@/lib/prisma';

const subjectSeed = [
  {
    code: '9701',
    name: 'Chemistry',
    slug: 'chemistry',
    description: 'Organic, physical, and inorganic chemistry topics aligned to the Cambridge AS & A Level syllabus.',
  },
  {
    code: '9702',
    name: 'Physics',
    slug: 'physics',
    description: 'Mechanics, electricity, waves, and modern physics topics indexed for fast retrieval.',
  },
  {
    code: '9709',
    name: 'Mathematics',
    slug: 'mathematics',
    description: 'Pure mathematics, mechanics, and probability & statistics topics mapped by paper and series.',
  },
] as const;

const topicSeed = [
  {
    subjectSlug: 'chemistry',
    code: 'atomic-structure',
    name: 'Atomic structure',
    slug: 'atomic-structure',
    subtopics: ['Atoms', 'Electron structure'],
  },
  {
    subjectSlug: 'chemistry',
    code: 'energetics',
    name: 'Energetics',
    slug: 'energetics',
    subtopics: ['Enthalpy', 'Bond energies'],
  },
  {
    subjectSlug: 'physics',
    code: 'mechanics',
    name: 'Mechanics',
    slug: 'mechanics',
    subtopics: ['Kinematics', 'Forces'],
  },
  {
    subjectSlug: 'physics',
    code: 'electricity',
    name: 'Electricity',
    slug: 'electricity',
    subtopics: ['Current', 'Resistance'],
  },
  {
    subjectSlug: 'mathematics',
    code: 'functions',
    name: 'Functions',
    slug: 'functions',
    subtopics: ['Transformations', 'Inverse functions'],
  },
  {
    subjectSlug: 'mathematics',
    code: 'probability',
    name: 'Probability',
    slug: 'probability',
    subtopics: ['Discrete distributions', 'Conditional probability'],
  },
] as const;

const sessionSeed = [
  { code: 'FebMar', label: 'February/March' },
  { code: 'MayJun', label: 'May/June' },
  { code: 'OctNov', label: 'October/November' },
] as const;

const yearSeed = [2022, 2023, 2024, 2025] as const;
const paperSeed = [
  { code: 'P1', label: 'P1' },
  { code: 'P2', label: 'P2' },
  { code: 'P3', label: 'P3' },
  { code: 'P4', label: 'P4' },
  { code: 'P5', label: 'P5' },
] as const;

const variantSeed = [
  { code: '11', label: '11' },
  { code: '12', label: '12' },
  { code: '13', label: '13' },
  { code: '21', label: '21' },
  { code: '22', label: '22' },
  { code: '31', label: '31' },
  { code: '32', label: '32' },
] as const;

const questionSeed = [
  {
    subjectSlug: 'chemistry',
    topicSlug: 'atomic-structure',
    subtopicName: 'Atoms',
    sessionCode: 'MayJun',
    year: 2024,
    paperCode: 'P1',
    variantCode: '11',
    questionNumber: 5,
    marks: 10,
    canonicalKey: 'chemistry-atomic-structure-2024-MayJun-P1-11-5',
  },
  {
    subjectSlug: 'chemistry',
    topicSlug: 'energetics',
    subtopicName: 'Enthalpy',
    sessionCode: 'OctNov',
    year: 2023,
    paperCode: 'P2',
    variantCode: '12',
    questionNumber: 9,
    marks: 12,
    canonicalKey: 'chemistry-energetics-2023-OctNov-P2-12-9',
  },
  {
    subjectSlug: 'chemistry',
    topicSlug: 'atomic-structure',
    subtopicName: 'Electron structure',
    sessionCode: 'FebMar',
    year: 2022,
    paperCode: 'P3',
    variantCode: '13',
    questionNumber: 3,
    marks: 8,
    canonicalKey: 'chemistry-atomic-structure-2022-FebMar-P3-13-3',
  },
  {
    subjectSlug: 'physics',
    topicSlug: 'mechanics',
    subtopicName: 'Kinematics',
    sessionCode: 'MayJun',
    year: 2024,
    paperCode: 'P1',
    variantCode: '21',
    questionNumber: 7,
    marks: 9,
    canonicalKey: 'physics-mechanics-2024-MayJun-P1-21-7',
  },
  {
    subjectSlug: 'physics',
    topicSlug: 'electricity',
    subtopicName: 'Current',
    sessionCode: 'OctNov',
    year: 2024,
    paperCode: 'P4',
    variantCode: '22',
    questionNumber: 4,
    marks: 14,
    canonicalKey: 'physics-electricity-2024-OctNov-P4-22-4',
  },
  {
    subjectSlug: 'mathematics',
    topicSlug: 'functions',
    subtopicName: 'Transformations',
    sessionCode: 'MayJun',
    year: 2025,
    paperCode: 'P1',
    variantCode: '31',
    questionNumber: 1,
    marks: 15,
    canonicalKey: 'mathematics-functions-2025-MayJun-P1-31-1',
  },
  {
    subjectSlug: 'mathematics',
    topicSlug: 'probability',
    subtopicName: 'Conditional probability',
    sessionCode: 'FebMar',
    year: 2024,
    paperCode: 'P5',
    variantCode: '32',
    questionNumber: 12,
    marks: 6,
    canonicalKey: 'mathematics-probability-2024-FebMar-P5-32-12',
  },
] as const;

async function main() {
  for (const subject of subjectSeed) {
    await prisma.subject.upsert({
      where: { slug: subject.slug },
      update: subject,
      create: subject,
    });
  }

  for (const session of sessionSeed) {
    await prisma.session.upsert({
      where: { code: session.code },
      update: session,
      create: session,
    });
  }

  for (const year of yearSeed) {
    await prisma.year.upsert({
      where: { value: year },
      update: { value: year },
      create: { value: year },
    });
  }

  for (const paper of paperSeed) {
    await prisma.paper.upsert({
      where: { code: paper.code },
      update: paper,
      create: paper,
    });
  }

  for (const variant of variantSeed) {
    await prisma.variant.upsert({
      where: { code: variant.code },
      update: variant,
      create: variant,
    });
  }

  for (const topic of topicSeed) {
    const subject = await prisma.subject.findUnique({ where: { slug: topic.subjectSlug } });

    if (!subject) {
      continue;
    }

    await prisma.topic.upsert({
      where: { subjectId_slug: { subjectId: subject.id, slug: topic.slug } },
      update: { code: topic.code, name: topic.name, slug: topic.slug, description: null },
      create: { subjectId: subject.id, code: topic.code, name: topic.name, slug: topic.slug },
    });

    for (const subtopicName of topic.subtopics) {
      const topicRecord = await prisma.topic.findUnique({ where: { subjectId_slug: { subjectId: subject.id, slug: topic.slug } } });

      if (!topicRecord) {
        continue;
      }

      await prisma.subtopic.upsert({
        where: { topicId_slug: { topicId: topicRecord.id, slug: subtopicName.toLowerCase().replace(/\s+/g, '-') } },
        update: { name: subtopicName },
        create: {
          topicId: topicRecord.id,
          code: subtopicName.toLowerCase().replace(/\s+/g, '-'),
          name: subtopicName,
          slug: subtopicName.toLowerCase().replace(/\s+/g, '-'),
        },
      });
    }
  }

  for (const item of questionSeed) {
    const subject = await prisma.subject.findUnique({ where: { slug: item.subjectSlug } });
    const topic = await prisma.topic.findUnique({ where: { subjectId_slug: { subjectId: subject!.id, slug: item.topicSlug } } });
    const subtopic = await prisma.subtopic.findUnique({ where: { topicId_slug: { topicId: topic!.id, slug: item.subtopicName.toLowerCase().replace(/\s+/g, '-') } } });
    const session = await prisma.session.findUnique({ where: { code: item.sessionCode } });
    const year = await prisma.year.findUnique({ where: { value: item.year } });
    const paper = await prisma.paper.findUnique({ where: { code: item.paperCode } });
    const variant = await prisma.variant.findUnique({ where: { code: item.variantCode } });

    if (!subject || !topic || !session || !year || !paper || !variant) {
      continue;
    }

    await prisma.question.upsert({
      where: { canonicalKey: item.canonicalKey },
      update: {
        subjectId: subject.id,
        topicId: topic.id,
        subtopicId: subtopic?.id ?? null,
        sessionId: session.id,
        yearId: year.id,
        paperId: paper.id,
        variantId: variant.id,
        questionNumber: item.questionNumber,
        marks: item.marks,
      },
      create: {
        subjectId: subject.id,
        topicId: topic.id,
        subtopicId: subtopic?.id ?? null,
        sessionId: session.id,
        yearId: year.id,
        paperId: paper.id,
        variantId: variant.id,
        questionNumber: item.questionNumber,
        marks: item.marks,
        canonicalKey: item.canonicalKey,
      },
    });
  }
}

void main().finally(async () => {
  await prisma.$disconnect();
});
