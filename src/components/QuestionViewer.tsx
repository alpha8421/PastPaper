'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const placeholderQuestionImage = '/images/question-placeholder.svg';
const placeholderMarkScheme = '/images/mark-scheme-placeholder.svg';

export function QuestionViewer({
  questions,
  initialQuestionId,
}: {
  questions: ReadonlyArray<{ id: number; questionNumber: number; paper: string; variant: string; topic: string }>;
  initialQuestionId?: number;
}) {
  const initialIndex = Math.max(
    0,
    questions.findIndex((question) => question.id === initialQuestionId),
  );
  const [currentIndex, setCurrentIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [zoom, setZoom] = useState(100);

  const currentQuestion = questions[currentIndex] ?? questions[0];

  if (!currentQuestion) {
    return null;
  }

  const navigate = (direction: 'next' | 'prev') => {
    setCurrentIndex((state) => {
      if (direction === 'next') {
        return state + 1 >= questions.length ? 0 : state + 1;
      }

      return state - 1 < 0 ? questions.length - 1 : state - 1;
    });
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      return;
    }

    await document.exitFullscreen();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Question viewer</p>
          <h2 className="text-xl font-semibold">
            {currentQuestion.topic} · Q{currentQuestion.questionNumber} · {currentQuestion.paper} · Variant {currentQuestion.variant}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => navigate('prev')}>Previous</Button>
          <Button variant="secondary" onClick={() => navigate('next')}>Next</Button>
          <Button variant="secondary" onClick={() => setZoom((value) => Math.max(80, Math.min(180, value + 10)))}>Zoom +</Button>
          <Button variant="secondary" onClick={() => setZoom((value) => Math.max(80, Math.min(180, value - 10)))}>Zoom -</Button>
          <Button variant="secondary" onClick={toggleFullscreen}>Fullscreen</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
            <span>Official question</span>
            <span>{zoom}%</span>
          </div>
          <div className="overflow-auto rounded-xl bg-slate-50 p-2">
            <Image
              src={placeholderQuestionImage}
              alt="Official question"
              width={1200}
              height={1600}
              sizes="(min-width: 768px) 50vw, 100vw"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="mb-3 text-sm text-slate-600">Official mark scheme</div>
          <div className="overflow-auto rounded-xl bg-slate-50 p-2">
            <Image
              src={placeholderMarkScheme}
              alt="Official mark scheme"
              width={1200}
              height={1600}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
