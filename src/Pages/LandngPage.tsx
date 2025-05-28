import React from 'react';
import img1 from "../assets/Container4.png"
import sec2icon1 from "../assets/icons/Container-5.png"
import sec2icon2 from "../assets/icons/Container-6.png"
import sec2icon3 from "../assets/icons/Container-7.png"
import sec2icon4 from "../assets/icons/Container-8.png"
import sec3icon1 from "../assets/icons/Container-9.png"
import sec3icon2 from "../assets/icons/Container-10.png"
import sec3icon3 from "../assets/icons/Container-11.png"
import sec3icon4 from "../assets/icons/Container-12.png"
import img2 from "../assets/Container-13.png"
import img3 from "../assets/Container-14.png"

const LandingPage: React.FC = () => {
  return (
    <div className="font-sans text-black">
      {/* Hero Section */}
      <section className="bg-[#8C2B1D] text-white py-16  text-center relative flex flex-row justify-around">
        <div className='flex flex-col items-start my-auto'>
        <h1 className="text-4xl font-bold mb-4 max-w-xl ">
          Empower Lives Through Healthy Communication
        </h1>
        <p className="mb-6 max-w-lg  text-start">
          Effective conversations can transform cancer journeys. Learn, share, support – start with us today.
        </p>
        <div className="flex justify-start gap-4">
          <button className="bg-[#F1685E] text-white px-7 py-3 rounded-full font-bold text-sm">Explore Resources</button>
          <button className="bg-white text-[#8C2B1D] px-7 py-3 rounded-full font-bold text-sm">Donate to Support</button>
        </div>

        </div>
        <div className='flex min-w-fit'>
            <img src={img1} alt="Hero Image"/>
        </div>
      </section>

      {/* Why Healthy Communication */}
      <section className="bg-[#FFF6F6] py-16 px-16 flex flex-row justify-around">
        <div className='w-1/3 mr-4 my-auto'>
        <h1 className="text-xl font-bold mb-2">Why Healthy Communication?</h1>
        <p className="mb-8 text-sm text-gray-600">Communication skills are crucial during cancer diagnosis and treatment.</p>
        </div>
        <div className="grid grid-rows-2 md:grid-cols-2 gap-6 mr-5">
          <div className="bg-white p-14 rounded shadow text-center flex flex-col items-center">
            <div className="text-3xl mb-2"><img src={sec2icon1} alt='icon1' /></div>
            <p>Supports Mental Health</p>
          </div>
          <div className="bg-white p-14 rounded shadow text-center flex flex-col items-center">
            <div className="text-3xl mb-2"><img src={sec2icon2} alt='icon1' /></div>
            <p>Asking Open-Ended Questions</p>
          </div>
          <div className="bg-white p-14 rounded shadow text-center flex flex-col items-center">
            <div className="text-3xl mb-2"><img src={sec2icon3} alt='icon1' /></div>
            <p>Sharing Emotions Respectfully</p>
          </div>
          <div className="bg-white p-14 rounded shadow text-center flex flex-col items-center">
            <div className="text-3xl mb-2"><img src={sec2icon4} alt='icon1' /></div>
            <p>Recognizing Non-Verbal Cues</p>
          </div>
        </div>
      </section>

      {/* Practice Skills */}
      <section className="bg-[#FFFFFF] py-16 px-16 flex flex-row justify-around flex-row-reverse">
        <div className='w-1/3 mr-4 my-auto'>
        <h2 className="text-4xl font-bold mb-2">Practice the Skills That Matter</h2>
        <p className="mb-8 text-sm text-gray-600">Communication skills are crucial during cancer diagnosis and treatment.</p>
        </div>
        <div className="grid grid-rows-2 md:grid-cols-2 gap-6 mr-5">
          <div className="bg-[#FFF6F6] p-14 rounded shadow text-center flex flex-col items-center">
            <div className="text-3xl mb-2"><img src={sec3icon1} alt='icon1' /></div>
            <p>Supports Mental Health</p>
          </div>
          <div className="bg-[#FFF6F6] p-14 rounded shadow text-center flex flex-col items-center">
            <div className="text-3xl mb-2"><img src={sec3icon2} alt='icon1' /></div>
            <p>Asking Open-Ended Questions</p>
          </div>
          <div className="bg-[#FFF6F6] p-14 rounded shadow text-center flex flex-col items-center">
            <div className="text-3xl mb-2"><img src={sec3icon3} alt='icon1' /></div>
            <p>Sharing Emotions Respectfully</p>
          </div>
          <div className="bg-[#FFF6F6] p-14 rounded shadow text-center flex flex-col items-center">
            <div className="text-3xl mb-2"><img src={sec3icon4} alt='icon1' /></div>
            <p>Recognizing Non-Verbal Cues</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
    <section className="bg-[#FFC1BD] py-12 text-center relative">
      <h2 className="text-2xl font-bold mb-4">Who It's For</h2>
      <p className="max-w-xl mx-auto italic">"Talking to my doctor without fear changed everything."<br /><span className="block mt-2 font-semibold">— Survivor, FL</span></p>
      {/* <div className="bg-[#FFC1BD] h-[100px] rounded-full relative border-2 border-gray-500"></div> */}
    </section>
    

      {/* Part 1 */}
      <section className="bg-white py-12 px-16  md:grid-cols-2 gap-4 items-center flex justify-around">
        <div className='w-1/2'>
          <h3 className="text-3xl font-bold mb-4">Part 1: Navigating Cancer Information in Online and Clinical Settings</h3>
          <p className="mb-4 text-sm text-gray-600">
            We will describe skills for evaluating online health information, communicating online with others about health information, and communicating with doctors about online health information. Then, we will look at key skills you can use to support your parent in their clinical visits.
          </p>
          <a className="text-md font-semibold inline-flex underline decoration-red-600 underline-offset-6 items-center gap-1" href="#">Learn more about Navigating Cancer Information in Online and Clinical Settings →</a>
        </div>
        <div className="">
          <img src={img2} alt="Office scene"  />
        </div>
      </section>

      {/* Part II */}
      <section className="bg-[#FFF6F6] py-12 px-auto md:grid-cols-2 gap-4 items-center flex justify-around">
        <div className="">
          <img src={img3} alt="Family with doctor" />
        </div>
        <div className='w-1/2'>
          <h3 className="text-3xl font-bold mb-4">Part II: Facilitating Open and Supportive Communication In the Family</h3>
          <p className="mb-4 text-sm text-gray-600">
            We will explore the importance of finding meaning in your caregiving role as well as how to strengthen your family relationships with open and supportive communication skills. Then, we will look at how to use these skills when navigating relational challenges and difficult but important caregiving conversations.
          </p>
          <a className="text-md font-semibold inline-flex underline decoration-red-600 underline-offset-6 items-center gap-1" href="#">Learn more about Facilitating Open and Supportive Communication In the Family →</a>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="bg-[#8C2B1D] text-white py-16 text-center">
        <h2 className="text-xl font-semibold">More content here</h2>
      </section>
    </div>
  );
};

export default LandingPage;
