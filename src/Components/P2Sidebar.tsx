import React from 'react';

interface SidebarProps {
  sections: { id: string; title: string, sub:boolean }[];
  currentSection: string;
  onSectionChange: (id: string) => void;
}

const P2Sidebar: React.FC<SidebarProps> = ({ sections, currentSection, onSectionChange }) => {
  return (
    <div className="w-2/9 p-4 bg-gray-100 h-fit">
        <h2 className="text-lg font-bold mb-2 text-black">Part 2 : Objective</h2>
        <div className='px-3'><span className='text-black font-extralight'>Facilitating Open and Supportive Communication in the Family.</span></div>
      <h2 className="text-lg font-bold my-2 text-black">Part 2 - Outline</h2>
      <ul>
        {sections.map((section) => (
          <li
            key={section.id}
            className={`cursor-pointer px-4 mb-1 text-black hover:text-red-500 ${
              currentSection === section.id ? 'font-extrabold ' : 'font-extralight '
            }`}
            style={{ paddingLeft: section.sub ? '1rem' : '0' }}
            onClick={() => onSectionChange(section.id)}
          >
            {section.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default P2Sidebar;