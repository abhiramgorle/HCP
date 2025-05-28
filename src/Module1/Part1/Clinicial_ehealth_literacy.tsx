
import bg from "../../assets/BgActivity.png"

const Clinicial_ehealth_literacy = () => {
    const Question = [
        {
            question: "I read through the information you sent about the potential of shark cartilage to cure cancer.",
            options: [
                "I will talk with my Dad’s doctor about it at our next appointment.",
                "This message acknowledges the take home message.",
                "Marco outlining the verification steps he will take.",
                "This message reflects and describes."
            ],
            correct: "Marco outlining the verification steps he will take."
        },
        {
            question: "I am concerned about the credibility of this information since it comes from a website that is trying to sell it.",
            options: [
                "I will talk with my Dad’s doctor about it at our next appointment.",
                "This message acknowledges the take home message.",
                "Marco outlining the verification steps he will take.",
                "This message reflects and describes."
            ],
            correct: "Marco outlining the verification steps he will take."
        },
        {
            question: "I’d be interested to know more about how you came across this article or if you know anyone who has had experience with this treatment.",
            options: [
                "I will talk with my Dad’s doctor about it at our next appointment.",
                "This message acknowledges the take home message.",
                "Marco outlining the verification steps he will take.",
                "This message reflects and describes."
            ],
            correct: "Marco outlining the verification steps he will take."
        },
        {
            question: "I will talk with my Dad’s doctor about it at our next appointment.",
            options: [
                "I will talk with my Dad’s doctor about it at our next appointment.",
                "This message acknowledges the take home message.",
                "Marco outlining the verification steps he will take.",
                "This message reflects and describes."
            ],
            correct: "Marco outlining the verification steps he will take."
        }
    ];
  return (
    <div className='flex flex-col'>
        <div className='flex flex-col gap-4'>
            <span className='font-bold text-sm'>Responding to Marcos' cousin</span>
            <span className='font-bold text-4xl'>Message Activity</span>
        </div>
        <div className='flex shadow-xl bg-white p-4 rounded-xl mt-4'>
            <span>Please read the following message that Marco wrote to his cousin Brett. Then respond to the questions below the message by choosing the best answer from the dropdown.</span> 
        </div>
        <div style={{ backgroundImage: `url(${bg})` }} className='bg-cover mt-8'>
        <div className='p-4 rounded-lg'>
            <div className='flex flex-col'>
            <span className='font-bold font-bol'>Hi Bret,</span>
            <span className='font-bold mt-2'>Thank you so much for thinking about me and my Dad.</span>
            </div>
            <div className='mt-4 space-y-4'>
                {Question.map((q, index) => (
                    <div key={index} className='flex items-center'>
                        <span className='border border-black bg-white p-2 w-2/5 rounded-lg'>{q.question}</span>
                        <hr className='border border-gray-500 w-1/10' />
                        <div 
                            className='grid bg-white shadow-lg w-2/5 p-2 justify-between relative cursor-pointer' 
                            onClick={(e) => {
                                const selectElement = (e.currentTarget.querySelector('select') as HTMLSelectElement);
                                if (selectElement) {
                                    selectElement.focus();
                                    selectElement.size = selectElement.options.length; // Expand dropdown
                                    selectElement.addEventListener('blur', () => {
                                        selectElement.size = 0; // Collapse dropdown on blur
                                    }, { once: true });
                                }
                            }}
                        >
                            <select 
                                className='col-start-1 row-start-1 appearance-none bg-white w-full absolute top-0 left-0 h-full cursor-pointer text-black' 
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    
                                    const parentDiv = e.currentTarget.parentElement;
                                    if (parentDiv) {
                                        if (selectedValue === q.correct) {
                                            parentDiv.classList.remove('border-red-500');
                                            parentDiv.classList.add('border-green-500');
                                        } else {
                                            parentDiv.classList.remove('border-green-500');
                                            parentDiv.classList.add('border-red-500');
                                        }
                                    }
                                    e.currentTarget.size = 0; // Collapse dropdown on selection
                                }}
                            >
                                <option value=''></option>
                                {q.options.map((option, i) => (
                                    <option key={i} value={option}>{option}</option>
                                ))}
                            </select>
                            <svg className='col-start-2 row-start-1 z-0' height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg" >
                                <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"/><path d="M0-.75h48v48h-48z" fill="none"/></svg>
                           
                        </div>
                    </div>
                    
                ))}
            </div>
        </div>
    </div>
    </div>
  )
}

export default Clinicial_ehealth_literacy