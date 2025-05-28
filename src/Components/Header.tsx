
import heart from "../assets/icons/Header_Heart.png"
const Header = () => {
  let mainpage: boolean;
  mainpage = window.location.pathname === "/";
  let islogin : boolean = false;
  //check if currentUser is in localStorage
  if (localStorage.getItem("currentUser") !== null) {islogin = true;}

  function deleteUser() {
    localStorage.removeItem("currentUser");
  }
    
  return (
    <>
      {mainpage ? (
        // Header for the mainpage
        <div>
          <header className="inset-x-0 top-0 z-50 bg-[url(src/assets/Header-Background_black.png)] w-100% bg-repeat-x">
          <nav className="p-6 lg:px-8 flex justify-between items-center">
              <div className="flex items-center">
                <a href="/course" className="">
                  <img className="min-h-auto md:mr-4 mr-7" src={heart} alt="" />
                </a>
                <span className="font-(family-name:--font-bree) font-extrabold md:text-4xl mt-2 text-2xl"> Healthy Communication Practice</span>
              </div>
              {!islogin ? null : (<div><a href="" className="relative group">
                <span 
                  className="text-white md:text-xl no-visited:text-white hover:text-white active:text-white focus:text-white font-(family-name:--font-open-sans) font-bold" 
                  onClick={() => deleteUser()}
                >
                  👤 Hi, {JSON.parse(localStorage.getItem("currentUser") || "{}").name || "Guest"}
                </span>
                <span 
                  className="absolute left-0 -bottom-6 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Logout
                </span>
              </a></div>)}
              
            </nav>
          </header>
        </div>
      ) : (
        //Header for the rest of the pages with the red background and the return to courses button
        <div>
          <header className={`inset-x-0 top-0 z-50 w-100% bg-repeat-x ${
              window.location.pathname.startsWith("/parent/")
                ? "bg-[url(src/assets/Header-Background_blue.png)]"
                :"bg-[url(src/assets/Header-Background_red.png)]"
            }`}>
            <nav className="p-6 lg:px-8 flex justify-between items-center">
              <div className="flex items-center">
                <a href="/course" className="">
                  <img className="min-h-auto w-15 mr-4" src={heart} alt="" />
                </a>
                <span className="font-(family-name:--font-bree) font-extrabold md:text-4xl text-xl mr-2">Healthy Communication Practice</span>
              </div>
              {!islogin ? null : (<div><a href="" className="relative group">
                <span 
                  className="text-white md:text-xl no-visited:text-white hover:text-white active:text-white focus:text-white font-(family-name:--font-open-sans) font-bold" 
                  onClick={() => deleteUser()}
                >
                  👤 Hi, {JSON.parse(localStorage.getItem("currentUser") || "{}").name || "Guest"}
                </span>
                <span 
                  className="absolute left-0 -bottom-6 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Logout
                </span>
              </a></div>)}
            </nav>
          </header>
        </div>
      )}
    </>
  )
}

export default Header