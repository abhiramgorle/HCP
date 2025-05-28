
import Button from '../Components/Button';
import fdbckbtn from "../assets/icons/baseline-report-24px.png"
const Communicative_ehealth_task = () => {
  return (
    <div className="w-full mt-8">
            <h2 className="font-bold text-lg mb-4">Activity</h2>
            <p className="mb-4">If you were Marco, how would you reply? Type your message out below.</p>
            <textarea className="w-full h-32 border border-gray-300 p-2 mb-4 bg-gray-100" placeholder="Type your response here..."></textarea>
            <div className='flex flex-row justify-between w-full ml-5'>
                <div id="feedbackDiv" className='flex flex-col items-start justify-start invisible'>
                    <span className='text-black font-bold flex flex-row'><img src={fdbckbtn} alt='feedback'/>Feedback: Great Response! Another way to respond is:</span>
                    <span className='text-black ml-5'>sent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</span>
                </div>
                <a
                    className="px-10 w-fit py-2 m-5 bg-[#CE2A35] rounded-3xl flex flex-row items-center justify-center cursor-pointer"
                    onClick={() => {
                        const feedbackDiv = document.getElementById('feedbackDiv');
                        if (feedbackDiv) {
                            feedbackDiv.classList.remove('invisible');
                        }
                    }}
                >
                    <span className="text-sm font-(family-name:--font-open-sans) font-extrabold text-white uppercase">Submit Response</span>
                </a>

            </div>
        </div>
  )
}

export default Communicative_ehealth_task