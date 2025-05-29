import React, { useState } from 'react';
import ham from "../assets/icons/hamburger.png";

interface SidebarProps {
  sections: { id: string; title: string; sub: boolean }[];
  currentSection: string;
  onSectionChange: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, currentSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Small and Medium Screens */}
      <div className="md:hidden flex justify-end mb-4 relative">
        <button onClick={toggleSidebar}>
          <img src={ham} alt="Menu" className="w-8 h-8" />
        </button>

        {/* Sidebar for Small and Medium Screens */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-100 p-4 z-50">
            <h2 className="text-lg font-bold mb-2 text-black">Part 1 : Objective</h2>
            <div className="px-3">
              <span className="text-black font-extralight">
                Navigating Cancer Information in Online and Clinical Settings.
              </span>
            </div>
            <h2 className="text-lg font-bold my-2 text-black">Part 1 - Outline</h2>
            <ul>
              {sections.map((section) => (
                <li
                  key={section.id}
                  className={`cursor-pointer px-4 mb-1 text-black hover:text-red-500 ${
                    currentSection === section.id ? 'font-extrabold ' : 'font-extralight '
                  }`}
                  style={{ paddingLeft: section.sub ? '1rem' : '0' }}
                  onClick={() => {
                    onSectionChange(section.id);
                    setIsOpen(false); // Close the menu after selecting a section
                  }}
                >
                  {section.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sidebar for Large Screens */}
      <div className="hidden md:block w-2/9 p-4 bg-gray-100 h-fit">
        <h2 className="text-lg font-bold mb-2 text-black">Part 1 : Objective</h2>
        <div className="px-3">
          <span className="text-black font-extralight">
            Navigating Cancer Information in Online and Clinical Settings.
          </span>
        </div>
        <h2 className="text-lg font-bold my-2 text-black">Part 1 - Outline</h2>
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
    </>
  );
};

export default Sidebar;