import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import AvatarFeedback from './AvatarFeedback';

const ItemTypes = {
  TEXT: 'text',
};

interface DragItem {
  id: string;
  text: string;
  type: string;
}

// 'James Message content with highlighted sections
const letterSections = [
  { id: 'greeting', text: 'Hi Brett', type: 'normal' },
  { id: 'thanks', text: 'Thanks so much the message.', type: 'normal' },
  { id: 'reflection', text: 'I watched the TikTok video you sent about the potential of Ivermectin to cure your mom’s cancer. ', type: 'draggable', color: 'bg-purple-200' },
  { id: 'concern', text: 'I am concerned about the credibility of this information because there aren’t studies showing it is safe or effective to treat cancer in humans.', type: 'draggable', color: 'bg-green-200' },
  { id: 'separator', text: '', type: 'separator' }, // New separator
  { id: 'understanding', text: "Like you, I want to see your mom’s cancer treated in the best way possible.", type: 'draggable', color: 'bg-blue-200' },
  { id: 'verification', text: "I will share this with your mom, and we can talk to her doctor about it at our next appointment.", type: 'draggable', color: 'bg-red-200' },
  { id: 'separator', text: '', type: 'separator' }, // New separator
  { id: 'closing', text: 'Thanks again and we’ll let you know what the doctor says. ', type: 'normal' },
  { id: 'signature', text: 'James', type: 'normal' }
];

const questions = [
  {
    id: 'understanding',
    text: "Which part shows that James is trying to understand the other’s point of view? ",
    correctAnswer: "Like you, I want to see your mom’s cancer treated in the best way possible.",
    color: 'border-blue-400'
  },
  {
    id: 'acknowledgment',
    text: 'Which part of the message acknowledges the take home message?',
    correctAnswer: 'I watched the TikTok video you sent about the potential of Ivermectin to cure your mom’s cancer. ',
    color: 'border-purple-400'
  },
  {
    id: 'verification',
    text: 'Which part shows James outlining the verification steps he will take?',
    correctAnswer: "I will share this with your mom, and we can talk to her doctor about it at our next appointment.",
    color: 'border-red-400'
  },
  {
    id: 'reflection',
    text: 'Which part of the message reflects and describes?',
    correctAnswer: 'I am concerned about the credibility of this information because there aren’t studies showing it is safe or effective to treat cancer in humans.',
    color: 'border-green-400'
  }
];

interface DropZoneProps {
  question: typeof questions[0];
  droppedText: string | null;
  onDrop: (questionId: string, text: string) => void;
  isCorrect: boolean | null;
}

const DropZone: React.FC<DropZoneProps> = ({ question, droppedText, onDrop, isCorrect }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TEXT,
    drop: (item: DragItem) => {
      onDrop(question.id, item.text);
    },
  });

  return (
    <div
      ref={drop}
      className={`min-h-24  p-4 border-2 border-dashed rounded-lg transition-all duration-200 ${
        droppedText 
          ? `bg-gray-50 ${question.color} border-solid` 
          : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <div className="text-sm font-medium text-gray-700 mb-2">
        {question.text}
      </div>
      {droppedText && (
        <div className="flex items-start gap-2">
          <div className="flex-1 text-sm bg-white p-2 rounded border">
            {droppedText}
          </div>
          {isCorrect !== null && (
            <div className="flex-shrink-0">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface DraggableTextProps {
  section: typeof letterSections[0];
  isDragged: boolean;
}



const DraggableText: React.FC<DraggableTextProps> = ({ section, isDragged }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TEXT,
    item: { id: section.id, text: section.text, type: ItemTypes.TEXT },
    canDrag: section.type === 'draggable',
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (section.type === 'separator') {
    return <div className="my-4"></div>; // Adds a line space
  }

  if (section.type === 'normal') {
    return <div className="block mb-2">{section.text}</div>;
  }

  return (
    <span
      ref={drag}
      className={`inline cursor-move transition-all duration-200 px-1 rounded mb-2 ${
        isDragged 
          ? 'opacity-40 bg-gray-200' 
          : isDragging 
            ? 'opacity-60 scale-105' 
            : `${section.color} hover:shadow-md`
      }`}
    >
      {section.text}{' '}
    </span>
  );
};

export default function MarcoLetterActivity() {
  const [droppedAnswers, setDroppedAnswers] = useState<Record<string, string>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState('Hi this is Anna, Your helper for this activity, lets see how you do!');
  const [emotion, setEmotion] = useState<'correct' | 'wrong'>('correct');

  const handleDrop = (questionId: string, text: string) => {
    // Remove the text from any previous location
    const newAnswers = { ...droppedAnswers };
    Object.keys(newAnswers).forEach(key => {
      if (newAnswers[key] === text) {
        delete newAnswers[key];
      }
    });
    
    // Add to new location
    newAnswers[questionId] = text;
    setDroppedAnswers(newAnswers);
    
    // Clear results when answers change
    setShowResults(false);
    setCheckedAnswers({});
  };

  const checkAnswers = () => {
    const results: Record<string, boolean> = {};
    questions.forEach(question => {
      const userAnswer = droppedAnswers[question.id];
      results[question.id] = userAnswer === question.correctAnswer;
    });
    setCheckedAnswers(results);
    setShowResults(true);
    if(Object.values(results).filter(Boolean).length === questions.length){
       setFeedback("Excellent! You've correctly identified all the communication elements in James's message.")
       setEmotion('correct');
      }else{
       setFeedback("Good effort! Review the incorrect answers and try again to improve your understanding.")
       setEmotion('wrong');}
  };

  const resetActivity = () => {
    setDroppedAnswers({});
    setCheckedAnswers({});
    setShowResults(false);
    setFeedback('Okay, lets try again! ');
    setEmotion("correct")
  };

  const allAnswered = questions.every(q => droppedAnswers[q.id]);
  const correctCount = Object.values(checkedAnswers).filter(Boolean).length;
  const draggedTexts = new Set(Object.values(droppedAnswers));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Letter Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">James Message</h2>
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg border-l-4 border-orange-300 shadow-sm">
                  <div className="font-handwriting text-lg leading-relaxed text-gray-800">
                    {letterSections.map((section, index) => (
                      <DraggableText
                        key={section.id}
                        section={section}
                        isDragged={draggedTexts.has(section.text)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  <strong>Instructions:</strong> Drag the highlighted sentences from James Message to match them with the correct communication concepts below.
                </p>
              </div>
            </div>

            {/* Questions Section */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Communication Analysis</h2>
              
              <div className="space-y-4">
                {questions.map((question) => (
                  <DropZone
                    key={question.id}
                    question={question}
                    droppedText={droppedAnswers[question.id] || null}
                    onDrop={handleDrop}
                    isCorrect={showResults ? checkedAnswers[question.id] : null}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={checkAnswers}
                  disabled={!allAnswered}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    allAnswered
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Check Answers
                </button>
                
                <button
                  onClick={resetActivity}
                  className="flex items-center gap-2 py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              {/* Results */}
              {showResults && (
                <div className={`p-4 rounded-lg border-2 ${
                  correctCount === questions.length 
                    ? 'bg-green-50 border-green-300' 
                    : 'bg-yellow-50 border-yellow-300'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {correctCount === questions.length ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-yellow-600" />
                    )}
                    <span className="font-semibold">
                      Results: {correctCount} out of {questions.length} correct
                    </span>
                  </div>
                    
                </div>
              )}
            </div>
            
          </div>
        </div>
        <AvatarFeedback feedback={feedback} emotion={emotion} />
      </div>
    </DndProvider>
  );
}