import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const questionId = Number.parseInt(id, 10);

  if (Number.isNaN(questionId)) {
    return NextResponse.json({ message: 'Invalid question id.' }, { status: 400 });
  }

  const question = await prisma.question.findUnique({ where: { id: questionId } });

  if (!question) {
    return NextResponse.json({ message: 'Question not found.' }, { status: 404 });
  }

  const subject = typeof body.subject === 'string' ? body.subject : null;
  const topic = typeof body.topic === 'string' ? body.topic : null;
  const subtopic = typeof body.subtopic === 'string' ? body.subtopic : null;
  const paper = typeof body.paper === 'string' ? body.paper : null;
  const variant = typeof body.variant === 'string' ? body.variant : null;
  const marks = typeof body.marks === 'number' ? body.marks : null;

  if (subject) {
    const subjectRecord = await prisma.subject.upsert({
      where: { slug: subject.toLowerCase().replace(/\s+/g, '-') },
      update: { name: subject },
      create: { code: subject.slice(0, 4).toUpperCase(), name: subject, slug: subject.toLowerCase().replace(/\s+/g, '-') },
    });

    await prisma.question.update({ where: { id: question.id }, data: { subjectId: subjectRecord.id } });
  }

  if (topic) {
    const topicRecord = await prisma.topic.upsert({
      where: { subjectId_slug: { subjectId: question.subjectId, slug: topic.toLowerCase().replace(/\s+/g, '-') } },
      update: { name: topic },
      create: { subjectId: question.subjectId, code: topic.slice(0, 4).toLowerCase(), name: topic, slug: topic.toLowerCase().replace(/\s+/g, '-') },
    });

    await prisma.question.update({ where: { id: question.id }, data: { topicId: topicRecord.id } });
  }

  if (subtopic) {
    const topicRecord = await prisma.topic.findUnique({ where: { id: question.topicId } });
    const subtopicRecord = await prisma.subtopic.upsert({
      where: { topicId_slug: { topicId: topicRecord!.id, slug: subtopic.toLowerCase().replace(/\s+/g, '-') } },
      update: { name: subtopic },
      create: { topicId: topicRecord!.id, code: subtopic.slice(0, 4).toLowerCase(), name: subtopic, slug: subtopic.toLowerCase().replace(/\s+/g, '-') },
    });

    await prisma.question.update({ where: { id: question.id }, data: { subtopicId: subtopicRecord.id } });
  }

  if (paper) {
    const paperRecord = await prisma.paper.upsert({
      where: { code: paper },
      update: { label: paper },
      create: { code: paper, label: paper },
    });

    await prisma.question.update({ where: { id: question.id }, data: { paperId: paperRecord.id } });
  }

  if (variant) {
    const variantRecord = await prisma.variant.upsert({
      where: { code: variant },
      update: { label: variant },
      create: { code: variant, label: variant },
    });

    await prisma.question.update({ where: { id: question.id }, data: { variantId: variantRecord.id } });
  }

  if (marks !== null) {
    await prisma.question.update({ where: { id: question.id }, data: { marks } });
  }

  return NextResponse.json({ message: 'Question metadata updated.' });
}
