import ModuleHead from '../Components/ModuleHead';
import Breadcrumb from '../Components/Breadcrumb';
import playButton from '../assets/icons/Video_playButton.png';
import samplevideo from '../assets/SampleVideo.mp4';
import Button from '../Components/Button';

const Module = () => {
  const breadcrumbPaths = [
    { name: 'Home', link: '/' },
    { name: 'Modules', link: '/modules' },
    { name: 'Module 1', link: '/module1' },
  ];

  return (
    <div>
      <ModuleHead
        leftButtonText="Return Home"
        headingText="Module 1: Improving Healthcare Communication Online and In-Person"
        rightButtonText="Begin Module 1"
      />
      <div className="flex flex-col justify-between align-middle p-[25px]">
        
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
          <video
            id="moduleVideo"
            className="absolute top-0 left-0 w-full h-full"
            controls
          >
            <source src={samplevideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="items-center justify-center flex flex-col">
          <Button name="Next Module" arrow={true} link="/module1" color="red" arrowPosition="right" />
        </div>
      </div>
    </div>
  );
};

export default Module;
