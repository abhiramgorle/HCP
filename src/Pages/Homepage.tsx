
import Button from '../Components/Button'
import sam from "../assets/sam.png"
import adult from "../assets/HCP_Adult.png"
import spouse from "../assets/HCP_Spouse.png"
import sam2 from "../assets/sam2.png"
import LoginModal from "../Components/LoginModal"
import { useState } from 'react'
const Homepage = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  let islogin : boolean = false;
  //check if currentUser is in localStorage
  if (localStorage.getItem("currentUser") !== null) {islogin = true;}

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full px-[10%]">
      <div className="flex flex-col justify-center w-full p-10  ">
        <div className="flex flex-col">
          <h2 className="font-(family-name:--font-bree) font-extrabold tracking-normal text-center text-[30px] text-[#2B70B4]">
            Losdrem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <p className="font-(family-name:--font-open-sans) text-center text-sm text-black my-5">
            Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.
          </p>
        </div>
        <div className="flex flex-row flex-wrap justify-center md:justify-around mx-[10%]">
          {/* <Button name="Login/register"  onClick={handleOpenLoginModal}/> */}
      {islogin ? (null) :(
        <div>
          <button 
            className="px-10 w-fit py-2 border-2 m-5 text-black font-extrabold border-[#CE2A35] rounded-3xl flex flex-row items-center text-sm font-(family-name:--font-open-sans) tracking-wider uppercase" 
            onClick={handleOpenLoginModal}
          >
            LOGIN/REGISTER
          </button>
          <LoginModal 
            isOpen={isLoginModalOpen} 
            onClose={handleCloseLoginModal} 
            onLoginSuccessRedirectTo="/parts"
          ></LoginModal>
        </div>
      )}
          <Button name="Meet the team" link="team" />
        </div>
      </div>
      <div className="flex flex-col justify-center w-full  p-5">
        <div className="flex flex-row justify-start shadow-lg">
          <img src={sam} className="w-2/6 rounded-xs min-w-30" />
          <div className="flex flex-col justify-start my-5">
            <div className="flex flex-row justify-start items-center">
              <img
                className="min-h--auto mx-5"
                src={adult}
                alt=""
              />
              
            </div>
            <text className='text-black'>question: Mandatory login to gointo the course??</text>
            <div>
              <Button name="Go to Course" link="/parts" arrow={true} />
            </div>
          </div>
        </div>
        {/* <div className="flex flex-row justify-start mt-5 shadow-lg">
          <img src={sam2} className="w-2/6 rounded-xs min-w-30" />
          <div className="flex flex-col justify-start my-5">
          <div className="flex flex-row justify-start items-center">
              <img
                className="min-h--auto mx-5"
                src={spouse}
                alt=""
              />
            </div>
            <div>
              <Button name="Go to Course" link="courses" arrow={true} color="blue" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Homepage