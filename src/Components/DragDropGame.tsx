import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const ItemTypes = {
  TEXT: 'text',
};

interface DragItem {
  id: string;
  text: string;
  type: string;
}

interface PlaceholderProps {
  id: number;
  text: string | null;
  label: string;
  onDrop: (id: number, item: DragItem) => void;
  onMove: (targetId: number, sourceId: number) => void;
}

const Placeholder: React.FC<PlaceholderProps> = ({ id, text, label, onDrop, onMove }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.TEXT,
    drop: (item: DragItem) => onDrop(id, item),
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TEXT,
    item: { id, text: text || '', type: ItemTypes.TEXT },
    canDrag: !!text,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={` w-48 h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center ${
        text ? 'bg-gray-100 border-gray-400' : 'border-gray-300'
      } ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      {text ? (
        <>
          <div className="text-xs text-gray-600 mb-1 text-center">{label}</div>
          <div>{text}</div>
        </>
      ) : (
        label
      )}
    </div>
  );
};

interface DraggableTextProps {
  id: number;
  text: string;
}

const DraggableText: React.FC<DraggableTextProps> = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TEXT,
    item: { id, text, type: ItemTypes.TEXT },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`w-32 h-32 bg-blue-200 border border-blue-500 rounded-md flex items-center justify-center cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {text}
    </div>
  );
};

interface DragDropGameProps {
  texts: string[];
  correctAnswers: string[];
  questions: string[];
}

export default function DragDropGame({
  texts = ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  correctAnswers = ['Item 3', 'Item 1', 'Item 4', 'Item 2'],
  questions = ['Which part shows Marco is trying to understand the others point of view?', 'Which part shows Marco is trying to understand the others point of point?', 'Explain Z.', 'Describe W.']
}: DragDropGameProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [placedTexts, setPlacedTexts] = useState<(string | null)[]>([null, null, null, null]);
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState({ correct: 0, wrong: 0 });

  const handleDrop = (placeholderId: number, item: DragItem) => {
    const newPlacedTexts = [...placedTexts];
    const sourceIndex = newPlacedTexts.findIndex(text => text === item.text);

    if (sourceIndex !== -1 && sourceIndex !== placeholderId) {
      const temp = newPlacedTexts[placeholderId];
      newPlacedTexts[placeholderId] = item.text;
      newPlacedTexts[sourceIndex] = temp;
    } else {
      newPlacedTexts[placeholderId] = item.text;
    }

    setPlacedTexts(newPlacedTexts);

    if (currentTextIndex < texts.length && item.text === texts[currentTextIndex]) {
      setCurrentTextIndex(prev => prev + 1);
    }
  };

  const handleMove = (targetId: number, sourceId: number) => {
    const newPlacedTexts = [...placedTexts];
    const sourceText = newPlacedTexts[sourceId];
    newPlacedTexts[sourceId] = newPlacedTexts[targetId];
    newPlacedTexts[targetId] = sourceText;
    setPlacedTexts(newPlacedTexts);
  };

  const handleCheck = () => {
    let correct = 0;
    let wrong = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (placedTexts[i] === correctAnswers[i]) correct++;
      else wrong++;
    }
    setResults({ correct, wrong });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center justify-center bg-gray-100 w-[80%]">
        <div className="flex justify-center space-x-4 mb-8">
          {placedTexts.map((text, index) => (
            <Placeholder
              key={index}
              id={index}
              text={text}
              label={questions[index] || `Question ${index + 1}`}
              onDrop={handleDrop}
              onMove={handleMove}
            />
          ))}
        </div>

        <div className="mb-8">
          {currentTextIndex < texts.length ? (
            <DraggableText id={currentTextIndex} text={texts[currentTextIndex]} />
          ) : null}
        </div>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCheck}
          disabled={currentTextIndex < texts.length || placedTexts.includes(null)}
        >
          Check Results
        </button>

        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md">
              <h2 className="text-2xl font-bold mb-4">Results</h2>
              <p className="text-lg">Correct: {results.correct}</p>
              <p className="text-lg">Wrong: {results.wrong}</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
