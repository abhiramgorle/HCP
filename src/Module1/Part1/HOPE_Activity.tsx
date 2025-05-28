import React,{useState} from 'react';
import activityicon from "../../assets/icons/Layer_2.png"

const HOPE_Activity = () => {

    const [responses, setResponses] = useState<{ [key: string]: { [dimension: string]: string } }>({});

  const activityData = [
    {
      id: 'message1',
      author: 'COPD Organization (Washington, DC)',
      message: 'Hi @Sarah, regular exercise can help! Aerobic exercise can improve your circulation to help the body better use oxygen. It can also build energy levels so you can do more in activities without becoming tired. Take a look at this website for physical activity in COPD.',
      honestivity: 'High',
      objectivity: 'Low',
      practicality: 'High',
      expertise: 'Low',
    },
    {
      id: 'message2',
      author: 'Dr. Cortez (Tampa, FL)',
      message: '@Sarah: Smoking cessation and light aerobic activity may help give you more energy and improve your symptoms. I recommend you speak with your healthcare provider to set up a plan to help you quit smoking and start exercising.',
      honestivity: 'Low',
      objectivity: 'Low',
      practicality: 'Low',
      expertise: 'High',
    },
    {
      id: 'message3',
      author: 'Anna (Logan, UT)',
      message: '@Sarah: My mom was diagnosed with COPD almost 6 years ago now after having coughed daily for almost 10 years. Her medicine doesn’t work. If it weren’t for an herbal medication then she wouldn’t have been able to get rid of the disease. Private message me to get the information for this herbal medicine man. It’s a 100% guarantee that you will be totally cured.',
      honestivity: 'Low',
      objectivity: 'High',
      practicality: 'Low',
      expertise: 'Low',
    },
    {
      id: 'message4',
      author: 'John (Lafayette, IN)',
      message: '@Sarah: The best thing I did was quit smoking. It’s not easy, but I joined an online support group. Things got worse before they got better. But now I feel in control of my life, and it’s easier to get up off my feet. Let me know how I can help.',
      honestivity: 'High',
      objectivity: 'Low',
      practicality: 'High',
      expertise: 'High',
    },
  ];

  const dimensions = ['Honesty', 'Objectivity', 'Practicality', 'Expertise'];

  const handleResponse = (messageId: string, dimension: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        [dimension]: value,
      },
    }));}
  return (
    <div className="w-full mt-8">
        <h2 className="font-bold text-lg mb-4">Activity</h2>
        <p className="mb-4">
          The message board messages below show messages from four distinct sources: organization, caregiver, patient, physician. Rate each message as high or low on each of the four dimensions of HOPE (Honesty, Objectivity, Practicality, Expertise) and receive feedback on your response.
        </p>
        <div className='flex flex-row items-center mb-4 shadow-md p-4 bg-white gap-4'>
            <img src={activityicon} alt='activity icon' className='w-1/10 h-auto mr-2'/>
            <div className='flex flex-col gap-2'>
                <span className='font-bold text-sm'>Sarah(Philadelphia, pa)</span>
                <span className='text-sm'>I’m a current smoker (20+ years) with a constant cough. I’m exhausted and can’t breathe well. I was just diagnosed with COPD. Doc says I can’t be cured. 
                What can I do to feel better? </span>


            </div>

        </div>

        <div className='w-9/10 ml-auto'>
        {activityData.map((activity) => (
            <div className='flex flex-col shadow-md p-4 mb-4 bg-white' key={activity.id} >
                <div className='flex flex-row items-center mb-4  gap-4'>
                <img src={activityicon} alt='activity icon' className='w-1/10 h-auto mr-2'/>
                <div className='flex flex-col gap-2'>
                <span className='font-bold text-sm'>{activity.author}</span>
                <span className='text-sm'>{activity.message} </span>
                </div>
                
                </div>
                <div className='bg-gray-100 flex flex-row items-center p-2 rounded-lg gap-4'>
                    <div className='flex flex-col items-start w-4/8'>
                        <span className='font-bold text-sm'>Directions</span>
                        <span className='font-light'>Rate the message as high or low on each of the four dimensions.</span>

                    </div>
                    {dimensions.map((dimension) => (
                        <div className='flex flex-col w-3/8 gap-1' key={dimension}>
                            <span className='text-sm font-bold m-auto uppercase'>{dimension}</span>
                            <div className='flex flex-row  h-8 items-center justify-around'>
                                <button
                                    className={`text-black px-3 font-extralight text-center ${
                                        responses[activity.id]?.[dimension] === 'Low'
                                            ? activity[dimension.toLowerCase() as keyof typeof activity] === 'Low'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-red-500 text-white'
                                            : 'bg-gray-300'
                                    }`}
                                    onClick={() => handleResponse(activity.id, dimension, 'Low')}
                                >
                                    Low
                                </button>
                                <button
                                    className={`text-black px-3 font-extralight text-center ${
                                        responses[activity.id]?.[dimension] === 'High'
                                            ? activity[dimension.toLowerCase() as keyof typeof activity] === 'High'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-red-500 text-white'
                                            : 'bg-gray-300'
                                    }`}
                                    onClick={() => handleResponse(activity.id, dimension, 'High')}
                                >
                                    High
                                </button>
                            </div>
                        </div>
                    ))}
                   
                   
                </div>
            </div>
                
        ))}
        </div>
        
      </div>
  )
}

export default HOPE_Activity