import heart from "../assets/icons/Header_Heart.png";

const Header = () => {
  let mainpage: boolean;
  mainpage = window.location.pathname === "/";
  let islogin: boolean = false;
  // Check if currentUser is in localStorage
  if (localStorage.getItem("currentUser") !== null) {
    islogin = true;
  }

  function deleteUser() {
    localStorage.removeItem("currentUser");
  }

  return (
    <div>
      <header
        className={`inset-x-0 top-0 z-50 w-full bg-repeat-x ${
          window.location.pathname.startsWith("/parent/")
            ? "bg-[url(src/assets/Header-Background_blue.png)]"
            : "bg-[url(src/assets/Header-Background_red.png)]"
        }`}
      >
        <nav className="p-4 md:p-6 lg:px-8 flex flex-wrap justify-between items-center">
          <div className="flex items-center flex-wrap">
            <a href="/course" className="flex-shrink-0">
              <img
                className="h-10 w-10 md:w-15 md:h-auto mr-2 md:mr-4"
                src={heart}
                alt=""
              />
            </a>
            <span className="font-(family-name:--font-bree) font-extrabold text-lg md:text-xl lg:text-4xl mr-2">
              Healthy Communication Practice
            </span>
          </div>
          {!islogin ? null : (
            <div className="mt-4 md:mt-0">
              <a href="" className="relative group">
                <span
                  className="text-white text-sm md:text-lg lg:text-xl hover:text-white font-[--font-open-sans] font-bold"
                  onClick={() => deleteUser()}
                >
                  👤 Hi, {JSON.parse(localStorage.getItem("currentUser") || "{}").name || "Guest"}
                </span>
                <span
                  className="absolute left-0 -bottom-6 bg-gray-800 text-white text-xs md:text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Logout
                </span>
              </a>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;