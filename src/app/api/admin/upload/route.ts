import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const formData = await request.formData();
  const questionId = Number.parseInt(String(formData.get('questionId') ?? ''), 10);
  const file = formData.get('image');

  if (Number.isNaN(questionId) || !(file instanceof Blob)) {
    return NextResponse.json({ message: 'Invalid upload payload.' }, { status: 400 });
  }

  const question = await prisma.question.findUnique({ where: { id: questionId } });

  if (!question) {
    return NextResponse.json({ message: 'Question not found.' }, { status: 404 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const storageKey = `question-${question.id}-${Date.now()}-${file.name}`;

  await prisma.questionImage.upsert({
    where: { questionId },
    update: {
      url: `/uploads/${storageKey}`,
      storageKey,
      mimeType: file.type || 'application/octet-stream',
      width: 1200,
      height: 1600,
    },
    create: {
      questionId,
      url: `/uploads/${storageKey}`,
      storageKey,
      mimeType: file.type || 'application/octet-stream',
      width: 1200,
      height: 1600,
    },
  });

  return NextResponse.json({ message: 'Image reference stored for question.' });
}
