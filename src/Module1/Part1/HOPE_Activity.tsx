import React,{useState} from 'react';
import activityicon from "../../assets/icons/mod_tealicon2.png"
import bloodIcon from "../../assets/icons/mod_bloodicon2.png";
import greenIcon from "../../assets/icons/mod_greenicon2.png";
import purpleIcon from "../../assets/icons/mod_purpleicon2.png";
import orangeIcon from "../../assets/icons/mod_orangeicon2.png";
import AvatarFeedback from '../../Components/AvatarFeedback';

const iconMap: { [key: string]: string } = {
  "../../assets/icons/mod_bloodicon2.png": bloodIcon,
  "../../assets/icons/mod_greenicon2.png": greenIcon,
  "../../assets/icons/mod_purpleicon2.png": purpleIcon,
  "../../assets/icons/mod_orangeicon2.png": orangeIcon,
};

const HOPE_Activity = () => {

  const [feedback, setFeedback] = useState('Hi this is Anna, Your helper for this activity, lets see how you do!');
  const [emotion, setEmotion] = useState<'correct' | 'wrong'>('correct');

  const handleRating = (dimension: string, value: string, author:string) => {
    if (dimension === 'Honesty') {
      if( author === "Blood Cancer Foundation (BCF)" ) {
        if( value === 'high') {
        setFeedback("That's correct, In addition, the doctor's and patient's responses are honest and trustworthy.");
        setEmotion('correct');
      }else{
        setFeedback("Let's rethink this, that does not seem right. The Blood Cancer Foundation is a reputable organization.");
        setEmotion('wrong');
        };
    }else if (author == "Dr.Cortez (Tampa, FL)") {
      if( value === 'high') {
        setFeedback("That's correct! In addition, the Blood Cancer Foundation and patient's response are honest and trustworthy.");
        setEmotion('correct');
      }else{
        setFeedback("Let's rethink this, that does not seem right. Dr. Cortez is a physician and his response is honest and trustworthy.");
        setEmotion('wrong');
        };
    } else if(author == "Morgan (Tempe, AZ)") {
      if( value === 'high') {
        setFeedback("That's correct! Morgan may be an Honest source. Be sure to confirm the accuracy of information on a reputable site like cdc.gov or nih.gov.");
        setEmotion('correct');
      }else{
        setFeedback("Let's rethink this, that does not seem right.");
        setEmotion('wrong');
      }
    } else if (author == "Taylor (Ann Arbor, MI)") {
      if( value === 'high') {
        setFeedback("Let's rethink this...The caregiver is talking about an over-the-counter product to cure cancer. There is no scientific evidence or website to support this claim.");
        setEmotion('wrong');
      }else{
        setFeedback("That's correct! The caregiver is talking about an over-the-counter product to cure cancer. There is no scientific evidence or website to support this claim. ");
        setEmotion('correct');
      }
    }
    
  } else if (dimension === 'Objectivity') {
    if( author === "Blood Cancer Foundation (BCF)" ) {
      if( value === 'high') {
      setFeedback("That's correct!  The Blood Cancer Foundation's response recognizes that some complementary treatments can be used in cancer, but questions the effectiveness of green tea extract. The foundation further directs the user to a reputable website with information about complementary treatments to learn more.  The doctor is another example of providing an objective response.");
      setEmotion('correct');
    }else{
      setFeedback("Let's rethink this, that does not seem right. The Blood Cancer Foundation is a reputable organization.");
      setEmotion('wrong');
      };
  }else if (author == "Dr.Cortez (Tampa, FL)") {
    if( value === 'high') {
      setFeedback("That's correct!  The doctor's responses demonstrate objectivity. The doctor recommends that Chris speaks to their doctor about clinical trials. She suggests that clinical trials are a good medical practice, but also recognizes that clinical trials don't always work for everyone.  Another example of an objective response is from the Blood Cancer Foundation.");
      setEmotion('correct');
    }else{
      setFeedback("Let's rethink this, that does not seem right. Dr. Cortez is a physician and his response is objective.");
      setEmotion('wrong');
      };
  } else if(author == "Morgan (Tempe, AZ)") {
    if( value === 'high') {
      setFeedback("Wait a minute...  The patient presents only details about their own personal experience, so this would not be considered objective.  If you're looking for objective information, consider the responses from the Blood Cancer Foundation and the doctor.");
      setEmotion('wrong');
    }else{
      setFeedback("Thats Correct! ");
      setEmotion('correct');
    }
  } else if (author == "Taylor (Ann Arbor, MI)") {
    if( value === 'high') {
      setFeedback("Let's think about this...  The caregiver only presents their parent's experience and asks Chris to private message for more information about the product and its cost. Based on the HOPE Model, you should always use caution with this information. It's likely biased and driven by ulterior motives.");
      setEmotion('wrong');
    }else{
      setFeedback("That's correct! ");
      setEmotion('correct');
    }
  }
  
  } else if (dimension === 'Practicality') {
    if( author === "Blood Cancer Foundation (BCF)" ) {
      if( value === 'high') {
      setFeedback("That's correct!  The Blood Cancer Foundation's response recommends the user to refer to a website where they can learn more information about clinical trials and complementary treatments.");
      setEmotion('correct');
    }else{
      setFeedback("Let's rethink this, that does not seem right. The Blood Cancer Foundation is a reputable organization.");
      setEmotion('wrong');
      };
  }else if (author == "Dr.Cortez (Tampa, FL)") {
    if( value === 'high') {
      setFeedback("That's correct!  The doctor's message encourages the user to go to their own healthcare provider with questions about clinical trials.");
      setEmotion('correct');
    }else{
      setFeedback("Let's rethink this, that does not seem right. Dr. Cortez is a physician and his response is Practical.");
      setEmotion('wrong');
      };
  } else if(author == "Morgan (Tempe, AZ)") {
    if( value === 'high') {
      setFeedback("Wait a minute... The patient described their experience but didn't provide any instructions or next steps.");
      setEmotion('wrong');
    }else{
      setFeedback("Thats Correct! ");
      setEmotion('correct');
    }
  } else if (author == "Taylor (Ann Arbor, MI)") {
    if( value === 'high') {
      setFeedback("This one is tricky...The caregiver is recommending the user tries green tea extract and asks them to reach out to her for more information. This is a practical message. However, please use caution before acting or sharing upon the recommended action! As we saw earlier, the message is neither honest nor objective.");
      setEmotion('wrong');
    }else{
      setFeedback("That's correct! ");
      setEmotion('correct');
    }
  }
} else if (dimension === 'Practicality') {
    if( author === "Blood Cancer Foundation (BCF)" ) {
      if( value === 'high') {
      setFeedback("That's correct!  The Blood Cancer Foundation's response recommends the user to refer to a website where they can learn more information about clinical trials and complementary treatments.");
      setEmotion('correct');
    }else{
      setFeedback("Let's rethink this, that does not seem right. The Blood Cancer Foundation is a reputable organization.");
      setEmotion('wrong');
      };
  }else if (author == "Dr.Cortez (Tampa, FL)") {
    if( value === 'high') {
      setFeedback("That's correct!  The doctor's message encourages the user to go to their own healthcare provider with questions about clinical trials.");
      setEmotion('correct');
    }else{
      setFeedback("Let's rethink this, that does not seem right. Dr. Cortez is a physician and his response is Practical.");
      setEmotion('wrong');
      };
  } else if(author == "Morgan (Tempe, AZ)") {
    if( value === 'high') {
      setFeedback("Wait a minute... The patient described their experience but didn't provide any instructions or next steps.");
      setEmotion('wrong');
    }else{
      setFeedback("Thats Correct! ");
      setEmotion('correct');
    }
  } else if (author == "Taylor (Ann Arbor, MI)") {
    if( value === 'high') {
      setFeedback("This one is tricky...The caregiver is recommending the user tries green tea extract and asks them to reach out to her for more information. This is a practical message. However, please use caution before acting or sharing upon the recommended action! As we saw earlier, the message is neither honest nor objective.");
      setEmotion('wrong');
    }else{
      setFeedback("That's correct! ");
      setEmotion('correct');
    }
  }
} else{
  if(value == "high"){
    if( author === "Morgan (Tempe, AZ)" || author === "Taylor (Ann Arbor, MI)") {
      setFeedback("That's correct!  That's right. Patients have their own level of non-medical expertise.");
      setEmotion('correct');
  }else{
    setEmotion("correct");
    setFeedback("That's correct!  Physicians and organizations like the Blood Cancer Foundation have medical expertise.");
  }
}
else{
  if( author === "Morgan (Tempe, AZ)" || author === "Taylor (Ann Arbor, MI)") {
    setFeedback(" Well, actually... patients have their own level of non-medical expertise. Had this patient included websites from a reputable source or provided a recommendation cited by a scientific site, then we would feel more confident in the value of their expertise.");
    setEmotion('wrong');
}else{
  setEmotion("wrong");
  setFeedback("Let's rethink this, that does not seem right.");
}

}
}
};

    const [responses, setResponses] = useState<{ [key: string]: { [dimension: string]: string } }>({});
    

  const activityData = [
    {
      id: 'message1',
      icon:"../../assets/icons/mod_bloodicon2.png",
      author: 'Blood Cancer Foundation (BCF)',
      message: "We have a clinical trial support center. Feel free to check out our website here and contact us for more information.",
      honestivity: 'High',
      objectivity: 'High',
      practicality: 'High',
      expertise: 'High',
      sub:false,
    },
    {
      id: 'message2',
      icon:"../../assets/icons/mod_greenicon2.png",
      author: 'Dr.Cortez (Tampa, FL)',
      message: "I would recommend that you talk to your oncologist about clinical trials. They can help you figure out if there is a trial that's right for you.",
      honestivity: 'High',
      objectivity: 'High',
      practicality: 'High',
      expertise: 'High',
      sub:false,
    },
    {
      id: 'message3',
      icon:"../../assets/icons/mod_purpleicon2.png",
      author: 'Morgan (Tempe, AZ)',
      message: "I participated in a clinical trial and it didn't help me at all. Honestly, I am not sure if was worth all the extra visits and time.",
      honestivity: 'Low',
      objectivity: 'High',
      practicality: 'Low',
      expertise: 'High',
      sub:false,
    },
    {
      id: 'message4',
      icon:"../../assets/icons/mod_greenicon2.png",
      author: 'Dr.Cortez (Tampa, FL)',
      message: 'Thanks for sharing your experience. Clinical trials are not the best option for every patient. I would still recommend anyone who is interested talk with their doctor to see if there is a trial that is right for them.',
      honestivity: 'High',
      objectivity: 'Low',
      practicality: 'High',
      expertise: 'High',
      sub:true,
    },
    {
      id: 'message5',
      icon:"../../assets/icons/mod_orangeicon2.png",
      author: 'Taylor (Ann Arbor, MI)',
      message: "Instead of a clinical trial, why don't you consider green tea extract? My husband used this and he is cancer free! Private message me for more information on where to buy this.",
      honestivity: 'High',
      objectivity: 'Low',
      practicality: 'High',
      expertise: 'High',
      sub:false,
    },
    {
      id: 'message6',
      icon:"../../assets/icons/mod_bloodicon2.png",
      author: 'Blood Cancer Foundation (BCF)',
      message: 'Thanks for sharing your experience. Clinical trials are not the best option for every patient. I would still recommend anyone who is interested talk with their doctor to see if there is a trial that is right for them.',
      honestivity: 'High',
      objectivity: 'Low',
      practicality: 'High',
      expertise: 'High',
      sub:true,
    },
  ];

  const dimensions = [
    { label: "Honesty", key: "honestivity" },
    { label: "Objectivity", key: "objectivity" },
    { label: "Practicality", key: "practicality" },
    { label: "Expertise", key: "expertise" },
  ];

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
                <span className='font-bold text-sm'>Chris (Philadelphia, PA)</span>
                <span className='text-sm'>I was recently diagnosed with acute leukemia. 
                  I've seen on this message board that some patients get put on a clinical trial. 
                  My doctor hasn't mentioned anything about a clinical trial. Do any of you have experience with clinical trials for leukemia? Should I look into this?

                </span>


            </div>

        </div>

        <div className='w-9/10 ml-auto'>
        {activityData.map((activity) => (
            <div className={`flex flex-col shadow-md p-4 mb-4 bg-white ${activity.sub? 'ml-10':''}`} key={activity.id} >
                <div className='flex flex-row items-center mb-4 gap-4'>
                <img src={iconMap[activity.icon]} alt='activity icon' className='w-1/10 h-auto mr-2'/>
                <div className='flex flex-col gap-2'>
                <span className='font-bold text-sm'>{activity.author}</span>
                <span className='text-sm'>{activity.message}</span>
                </div>
                </div>
                <div className="bg-gray-100 flex flex-col sm:flex-row items-center p-2 rounded-lg gap-4">
              <div className="flex flex-col items-start w-full sm:w-4/8">
                <span className="font-bold text-sm">Directions</span>
                <span className="font-light">Rate the message as high or low on each of the four dimensions.</span>
              </div>
              {dimensions.map(({ label, key }) => (
                <div className="flex flex-col w-full sm:w-3/8 gap-1" key={key}>
                  <span className="text-sm font-bold m-auto uppercase">{label}</span>
                  <div className="flex flex-row h-8 items-center justify-around">
                    <button
                      className={`text-black px-3 font-extralight text-center ${
                        responses[activity.id]?.[label] === 'Low'
                          ? activity[key as keyof typeof activity] === 'Low'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-gray-300'
                      }`}
                      onClick={() => {
                        handleResponse(activity.id, label, 'Low');
                        handleRating(label, 'low',activity.author);
                      }}
                    >
                      Low
                    </button>
                    <button
                      className={`text-black px-3 font-extralight text-center ${
                        responses[activity.id]?.[label] === 'High'
                          ? activity[key as keyof typeof activity] === 'High'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-gray-300'
                      }`}
                      onClick={() => {handleResponse(activity.id, label, 'High');handleRating(label, 'high',activity.author);} }
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
        <AvatarFeedback feedback={feedback} emotion={emotion} />
      </div>
  )
}

export default HOPE_Activity