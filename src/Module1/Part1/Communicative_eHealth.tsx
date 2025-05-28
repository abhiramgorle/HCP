
import downloadbtn from "../../assets/icons/baseline-get_app-24p.png";
import samplevideo from "../../assets/SampleVideo.mp4";
import playButton from "../../assets/icons/Video_playButton.png";
import Button from '../../Components/Button';
import fdbckbtn from "../../assets/icons/baseline-report-24px.png"

const Communicative_eHealth = () => {
  return (
    <div className="w-full flex flex-col items-start">
      {/* Existing content */}
      <div className="w-full flex flex-col items-start">
        <span className="font-bold mb-3">Introduction</span>
        <span className="mb-3">
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

      <div className='w-full flex flex-col items-start'>
            <span className="my-3">Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per.</span>
            <div className='flex flex-row w-full'>
                <div className="relative w-4/7 pt-[28.25%] bg-white">
                    <div
                        id="playButtonOverlay2"
                        className="absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer z-20"
                        onClick={() => {
                        const videoElement = document.getElementById('moduleVideo2') as HTMLVideoElement;
                        if (videoElement) {
                    videoElement.play();
                    document.getElementById('playButtonOverlay2')!.style.display = 'none';
                        }
                        }}
                    >
                        <img src={playButton} alt="Play Button" className="w-1/10 h-auto" />
                    </div>
                    <video
                        id="moduleVideo2"
                        className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
                        controls
                    >
                        <source src={samplevideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className='w-3/7 flex flex-col items-center ml-3 bg-red-500 text-white p-3 rounded-lg'>
                    <span className='font-bold mb-3'> Dr. Samantha Paige:</span>
                    <span className="mb-3 ">Dr. Samantha Paige is a health behavioral scientist who studies how to improve the ways that people access and communication about online health information to make informed health decisions.  .</span>

                </div>

            </div>
            <div className='flex flex-row justify-center w-full mt-2 '>
                <span>Download Transcript</span>
                <img src={downloadbtn} alt='download button'  className='ml-1'/>
            </div>
        </div> 
    
       
    </div>
  )
}

export default Communicative_eHealth