import React from 'react'

const ReflectionActivity1 = () => {
  return (
    <div className=' w-full flex flex-col mb-3'>
      <div className='flex flex-col items-start justify-items-start'>
        <span className="font-bold mb-3">Reflection Activity 1</span>
        <span className="font-bold text-4xl font-bree">Finding Meaning in Your Caregiver Role</span>      
      </div>

      <div className='flex flex-col items-center justify-items-center mt-10'> 
        <span className='font-bold text-xl'> What does being a caregiver mean to you?</span>
        <span className='font-bold text-xl mt-5'> What do you find meaningful about your role as a caregiver?</span>
      </div>

      <div className='flex flex-col mt-5'>
        <span >We encourage you to either write about this on your own or spend some time thinking on your own. As Dr. Applebaum discussed and you learned in the caregivers’ stories, it can be helpful for people to reflect on </span>
        <ul className='list-disc ml-10 mt-2'>
          <li>Their history </li>
          <li>Strengths they didn’t know they had</li>
          <li>An increased focus on self-care</li>
          <li>A heightened sense of connection through experiences of love, beauty and humor, and through the five senses </li>
        </ul>
      </div>
    </div>
  )
}

export default ReflectionActivity1