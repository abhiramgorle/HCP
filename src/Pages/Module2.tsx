import React, { useState, useEffect } from 'react';
import P2Sidebar from '../Components/P2Sidebar';
import ProgressBar from '../Components/ProgressBar';
import ModuleHead from '../Components/ModuleHead';
import Breadcrumb from '../Components/Breadcrumb';
import FindingInfo from '../Module1/FindingInfo';
import Introduction from '../Module1/Part2/Introduction';
import Connecting_Meaning from '../Module1/Part2/Connecting_Meaning';
import CaregiversStories1 from '../Module1/Part2/CaregiversStories1';
import ReflectionActivity1 from '../Module1/Part2/ReflectionActivity1';
import StrengtheningFamily from '../Module1/Part2/StrengtheningFamily';
import CaregiversStories2 from '../Module1/Part2/CaregiversStories2';
import ReflectionActivity2 from '../Module1/Part2/ReflectionActivity2';
import ChallengesCommunication from '../Module1/Part2/ChallengesCommunication';
import CaregiversStories3 from '../Module1/Part2/CaregiversStories3';
import StrategiesActivity from '../Module1/Part2/StrategiesActivity';
import PracticingSkills from '../Module1/Part2/PracticingSkills';
import RelationalIntimacy from '../Module1/Part2/RelationalIntimacy';
import FutureUncertainty from '../Module1/Part2/FutureUncertainty';
import DistressingEmotions from '../Module1/Part2/DistressingEmotions';
import Conclusion from '../Module1/Part2/Conclusion';

//Part 1 Modules


const Module2 = () => {
  const sections = [
    { id: 'introduction2', title: 'Introduction', sub:false},
    { id: 'connecting-meeting', title: 'Connecting to Meaning', sub:false},
    {id: 'caregivers-stories1', title: 'Caregivers Stories', sub:false},
    {id:'reflection-activity1', title: 'Reflection Activity', sub:false},
    { id: 'strengthening-family', title: 'Strengthening Family Bonds', sub:false},
    {id: 'caregivers-stories2', title: 'Caregivers Stories', sub:false},
    { id: 'reflection-activity2', title: 'Reflection Activity', sub:true},
    {id:'challenges-communication', title: 'Challenges and Communication Skills', sub:false},
    {id:'caregivers-stories3', title: 'Caregivers Stories', sub:false},
    {id:'strategies-activity', title: 'Strategies Activity', sub:false},
    {id:  'practicing-skills' , title: 'Practicing Skills', sub:false},
    {id: 'relational-intimacy', title: 'Relational Intimacy', sub:false},
    {id: 'future-uncertainty', title: 'Futere Uncertainty and Mortality', sub:false},
    {id: 'distressing-emotions', title: 'Distressing Emotions and Concerns', sub:false}, 
    {id: 'conclusion', title: 'Conclusion', sub:false},
  ];

  const [currentSection, setCurrentSection] = useState(sections[0].id);
  const [progress, setProgress] = useState(0);

  const renderContent = () => {
    switch (currentSection) {
      case 'introduction2':
        return <Introduction />;
      case 'connecting-meeting':
        return <Connecting_Meaning />;
      case 'caregivers-stories1':
        return <CaregiversStories1/>;
      case 'reflection-activity1':
        return <ReflectionActivity1 />
      case 'strengthening-family':
          return <StrengtheningFamily />;
      case 'caregivers-stories2':
          return <CaregiversStories2 />;
      case 'reflection-activity2':
        return <ReflectionActivity2 />;
      case 'challenges-communication':
        return <ChallengesCommunication />
      case 'caregivers-stories3':
        return <CaregiversStories3 />
      case 'strategies-activity':
          return <StrategiesActivity />;
      case 'practicing-skills':
        return <PracticingSkills />;
      case 'relational-intimacy':
        return <RelationalIntimacy />;
      case 'future-uncertainty':
        return <FutureUncertainty />;
      case 'distressing-emotions':
        return <DistressingEmotions />;
      case 'conclusion':
        return <Conclusion />;
      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  const handleSectionChange = (id: string) => {
    setCurrentSection(id);
    window.location.hash = id; 
    const currentIndex = sections.findIndex((section) => section.id === id);
    const progressPercentage = ((currentIndex + 1) / sections.length) * 100;
    setProgress(progressPercentage);
  };

  const handlePrevious = () => {
    const currentIndex = sections.findIndex((section) => section.id === currentSection);
    const userEmail = JSON.parse(localStorage.getItem("currentUser") || "{}").email;

    
    if (currentIndex == 0){
      window.location.href ='/parts';
    } else if (currentIndex > 0) {
      handleSectionChange(sections[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    const currentIndex = sections.findIndex((section) => section.id === currentSection);
    const userEmail = JSON.parse(localStorage.getItem("currentUser") || "{}").email;

    fetch("http://localhost:8888/php-backend-api/api/update_progress.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        section_code: sections[currentIndex].id,
        complete: true
      }),
    });
    if (currentIndex == sections.length - 1){
      window.location.href = '/parts';
    } else if (currentIndex < sections.length - 1) {
      handleSectionChange(sections[currentIndex + 1].id);
    }
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', ''); // Get the hash without the `#`
    if (hash) {
      const sectionExists = sections.find((section) => section.id === hash);
      if (sectionExists) {
        setCurrentSection(hash);
        const currentIndex = sections.findIndex((section) => section.id === hash);
        const progressPercentage = ((currentIndex + 1) / sections.length) * 100;
        setProgress(progressPercentage);
      }
    }
  }, [sections]);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("currentUser") || "{}").email;
    fetch(`http://localhost:8888/php-backend-api/api/get_progress.php?email=${email}`)
      .then(res => res.json())
      .then(data => {
        const lastSection = data.find(d => d.part_id === 2 && !d.is_completed);
        if (lastSection) {
          handleSectionChange(lastSection.section_code);
        }
      });
  }, []);
  

  return (
    <div className='flex flex-col'>
      <ModuleHead leftButtonText="Previous" headingText="Part II: Facilitating Open and Supportive Communication in the Family" rightButtonText='Next' subHeadingText={sections.find(section => section.id === currentSection)?.title || ''} 
      onPrevious={handlePrevious} onNext={handleNext}/>
      <Breadcrumb paths={[{ name: 'Home', link: '/' },{ name: 'Part 1', link: '/part1' }]} />
      {/* Main Content */}
      <div className="flex p-[10px]">
        {/* Sidebar */}
        <P2Sidebar
          sections={sections}
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
        />

        {/* Content Area */}
        <div className="w-7/9 p-8 text-black flex flex-col items-start">
          {renderContent()}
        </div>
      </div>
      <ProgressBar progress={progress} onPrevious={handlePrevious} onNext={handleNext} />
    </div>
  );
};

export default Module2;