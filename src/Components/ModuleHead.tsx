import React from 'react'
import Button from './Button';

interface ModuleHeadProps {
    leftButtonText: string;
    headingText: string;
    subHeadingText?: string;
    rightButtonText: string;
    onPrevious: () => void; // Callback for the "Previous" button
    onNext: () => void; // Callback for the "Next" button
}

const ModuleHead: React.FC<ModuleHeadProps> = ({
    leftButtonText,
    headingText,
    subHeadingText,
    rightButtonText,
    onPrevious, 
    onNext
}) => {
    return (
        <div className='flex flex-row justify-between items-center p-[10px]' >
            <Button name={leftButtonText} arrow={true} link="" color='red' arrowPosition='left' onClick={onPrevious}/>
            
            <div className="text-center" >
                <span className='m-0 text-red-500 text-[24px] font-bold' >{headingText}</span>
                <h2 className='m-0 text-black text-[16px] ' >{subHeadingText}</h2>
            </div>
            <Button name={rightButtonText} arrow={true}  link="" color='red' arrowPosition='right' onClick={onNext}/>
            
        </div>
    );
};

export default ModuleHead