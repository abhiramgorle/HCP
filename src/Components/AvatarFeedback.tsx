// src/components/AvatarFeedback.tsx
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import wrongAnim from '../assets/animations/Animation - correct.json';
import correctAnim from '../assets/animations/Animation - wrong.json';

interface Props {
  feedback: string;
  emotion: 'correct' | 'wrong' ;
}

const emotionMap = {
  correct: correctAnim,
  wrong: wrongAnim,
};

export default function AvatarFeedback({ feedback, emotion }: Props) {
  return (
    <div className="fixed bottom-4 right-4 flex items-end justify-end ">
      <div className="ml-3 bg-white text-gray-800 p-3 rounded-xl shadow-lg max-w-xs border border-gray-300">
        {feedback}
      </div>. <div className="w-30 h-30">
        <Lottie animationData={emotionMap[emotion]} loop={false} />
      </div>
    </div>
  );
}
