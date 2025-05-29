import React from 'react';
import Button from './Button';

interface ProgressBarProps {
  progress: number; // Progress percentage (0-100)
  onPrevious: () => void; // Callback for the "Previous" button
  onNext: () => void; // Callback for the "Next" button
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, onPrevious, onNext }) => {
  progress = Math.floor(progress);
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 space-y-4 sm:space-y-0 sm:space-x-4">
      <Button
        name="Previous"
        arrow={true}
        link="#"
        color="red"
        arrowPosition="left"
        onClick={onPrevious}
      />

      <div className="w-full bg-gray-300 h-5 rounded-xl flex-grow">
        <div
          className="bg-(--HCPRRed) h-full flex flex-row justify-end font-bold rounded-l-xl"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>

      <Button
        name="Next"
        arrow={true}
        link="#"
        color="red"
        arrowPosition="right"
        onClick={onNext}
      />
    </div>
  );
};

export default ProgressBar;