import React, { useState } from 'react';
import downloadbtn from "../../assets/icons/baseline-get_app-24p.png";
import samplevideo from "../../assets/SampleVideo.mp4";
import playButton from "../../assets/icons/Video_playButton.png";
import audiofile from "../../assets/Arthur.mp3"
import playBtn from "../../assets/icons/baseline-play_arrow-.png"

const ChallengesCommunication = () => {
  
  

  return (
    <div className="w-full flex flex-col items-start">
      {/* Existing content */}
      <div className="w-full flex flex-col items-start">
        <span className="font-bold mb-3">Introduction</span>
        <span className="mb-3">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
        </span>
        {/* Audio content */}
        <div className='w-full flex flex-col items-start mb-5'>
            <span className='font-bold'> In this module you will:</span>
            <span>Learn how to apply e-health literacy skills in online health information activities.</span>
            <div className='w-full flex flex-col items-start mt-4 w-full bg-gray-300 p-1'>
                <div className='w-full flex items-center'>
                    <span
                        className='  rounded-full cursor-pointer'
                        onClick={() => {
                            const audio = document.getElementById('audio-player') as HTMLAudioElement;
                            if (audio.paused) {
                                audio.play();
                            } else {
                                audio.pause();
                            }
                        }}
                    >
                        <img src={playBtn} alt="Play" className='' />
                    </span>
                    <input
                        type='range'
                        className='mx-4 flex-grow'
                        min='0'
                        max='100'
                        value='0'
                        onChange={(e) => {
                            const audio = document.getElementById('audio-player') as HTMLAudioElement;
                            const value = parseInt(e.target.value, 10);
                            audio.currentTime = (value / 100) * audio.duration;
                        }}
                    />
                    <span className='text-sm' id='current-time'>0:00</span>
                    <span className='mx-2 text-sm'>/</span>
                    <span className='text-sm' id='total-time'>0:00</span>
                </div>
                <audio
                    id='audio-player'
                    src={audiofile}
                    onTimeUpdate={() => {
                        const audio = document.getElementById('audio-player') as HTMLAudioElement;
                        const currentTime = document.getElementById('current-time');
                        const progress = document.querySelector('input[type="range"]') as HTMLInputElement;
                        if (currentTime && progress) {
                            const minutes = Math.floor(audio.currentTime / 60);
                            const seconds = Math.floor(audio.currentTime % 60);
                            currentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                            progress.value = ((audio.currentTime / audio.duration) * 100).toString();
                        }
                    }}
                    onLoadedMetadata={() => {
                        const audio = document.getElementById('audio-player') as HTMLAudioElement;
                        const totalTime = document.getElementById('total-time');
                        if (totalTime) {
                            const minutes = Math.floor(audio.duration / 60);
                            const seconds = Math.floor(audio.duration % 60);
                            totalTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                        }
                    }}
                />
            </div>
            <div className='flex flex-row justify-end w-full mt-2 '>
                <span>Download Transcript</span>
                <img src={downloadbtn} alt='download button'  className='ml-1'/>
            </div>
        </div>
        {/* Video Section */}
        <div className="relative w-full pt-[56.25%] bg-white">
          <div
            id="playButtonOverlay"
            className="absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer z-20"
            onClick={() => {
              const videoElement = document.getElementById('moduleVideo') as HTMLVideoElement;
              if (videoElement) {
                videoElement.play();
                document.getElementById('playButtonOverlay')!.style.display = 'none';
              }
            }}
          >
            <img src={playButton} alt="Play Button" className="w-1/10 h-auto" />
          </div>
          <video id="moduleVideo" className="absolute top-0 left-0 w-full h-full" controls>
            <source src={samplevideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-row justify-end w-full mt-2">
          <span>Download Transcript</span>
          <img src={downloadbtn} alt="download button" className="ml-1" />
        </div>
      </div>
      {/* Text Section */}
      <div className='w-full flex flex-col items-start'>
            <span className="my-3">Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per.</span>
      </div>
      {/* Music content */}
      <div className='w-full flex flex-col items-start mb-5'>
            <span>Learn how to apply e-health literacy skills in online health information activities.</span>
            <div className='w-full flex flex-col items-start mt-4 w-full bg-gray-300 p-1'>
                <div className='w-full flex items-center'>
                    <span
                        className='  rounded-full cursor-pointer'
                        onClick={() => {
                            const audio = document.getElementById('audio-player') as HTMLAudioElement;
                            if (audio.paused) {
                                audio.play();
                            } else {
                                audio.pause();
                            }
                        }}
                    >
                        <img src={playBtn} alt="Play" className='' />
                    </span>
                    <input
                        type='range'
                        className='mx-4 flex-grow'
                        min='0'
                        max='100'
                        value='0'
                        onChange={(e) => {
                            const audio = document.getElementById('audio-player') as HTMLAudioElement;
                            const value = parseInt(e.target.value, 10);
                            audio.currentTime = (value / 100) * audio.duration;
                        }}
                    />
                    <span className='text-sm' id='current-time'>0:00</span>
                    <span className='mx-2 text-sm'>/</span>
                    <span className='text-sm' id='total-time'>0:00</span>
                </div>
                <audio
                    id='audio-player'
                    src={audiofile}
                    onTimeUpdate={() => {
                        const audio = document.getElementById('audio-player') as HTMLAudioElement;
                        const currentTime = document.getElementById('current-time');
                        const progress = document.querySelector('input[type="range"]') as HTMLInputElement;
                        if (currentTime && progress) {
                            const minutes = Math.floor(audio.currentTime / 60);
                            const seconds = Math.floor(audio.currentTime % 60);
                            currentTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                            progress.value = ((audio.currentTime / audio.duration) * 100).toString();
                        }
                    }}
                    onLoadedMetadata={() => {
                        const audio = document.getElementById('audio-player') as HTMLAudioElement;
                        const totalTime = document.getElementById('total-time');
                        if (totalTime) {
                            const minutes = Math.floor(audio.duration / 60);
                            const seconds = Math.floor(audio.duration % 60);
                            totalTime.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                        }
                    }}
                />
            </div>
            <div className='flex flex-row justify-end w-full mt-2 '>
                <span>Download Transcript</span>
                <img src={downloadbtn} alt='download button'  className='ml-1'/>
            </div>
        </div>

    </div>
    

  );
};

export default ChallengesCommunication;