import React from 'react';
import downloadbtn from "../../assets/icons/baseline-get_app-24p.png";
import samplevideo from "../../assets/SampleVideo.mp4";
import playButton from "../../assets/icons/Video_playButton.png";

const Introduction = () => {
  return (
    <div className="w-full flex flex-col items-start px-1 sm:px-1 lg:px-8">
      {/* Existing content */}
      <div className="w-full flex flex-col items-start">
        <span className="font-bold mb-3 text-lg sm:text-xl">Introduction</span>
        <span className="mb-3 text-sm sm:text-base">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
        </span>
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
            <img src={playButton} alt="Play Button" className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          <video id="moduleVideo" className="absolute top-0 left-0 w-full h-full" controls>
            <source src={samplevideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-row justify-end w-full mt-2 items-center">
          <span className="text-sm sm:text-base">Download Transcript</span>
          <img src={downloadbtn} alt="download button" className="ml-1 w-4 h-4 sm:w-6 sm:h-6" />
        </div>
      </div>

      <div className="w-full flex flex-col items-start">
        <span className="my-3 text-sm sm:text-base">
          Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per.
        </span>
      </div>
    </div>
  );
};

export default Introduction;
