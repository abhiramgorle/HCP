import sam from "../assets/sam.png"
import sam2 from "../assets/sam2.png"
import alarm from "../assets/icons/alarm.png"
import { useState, useEffect } from 'react'

const Courses = () => {
  const email = JSON.parse(localStorage.getItem("currentUser") || "{}").email;
  const [isPart1Completed, setIsPart1Completed] = useState(false);
  const [isPart2Completed, setIsPart2Completed] = useState(false);

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await fetch(`http://localhost:8888/php-backend-api/api/get_part_status.php?email=${email}`);
      const data = await res.json();
      console.log(data);

      const part1 = data.find((d: any) => d.part_id === 1 && d.is_completed === 1);
      const part2 = data.find((d: any) => d.part_id === 2 && d.is_completed === 1);

      setIsPart1Completed(!!part1);
      setIsPart2Completed(!!part2);
      console.log(isPart1Completed, isPart2Completed);
    };
    fetchProgress();
  }, []);

  const handleGoToPart = async (part: number) => {
    const res = await fetch(`http://localhost:8888/php-backend-api/api/get_progress.php?email=${email}`);
    const data = await res.json();
    console.log(data, "dataaaaaaa");
    const last = data.find((d: any) => d.part_id === part && d.is_completed === 0);
    console.log(last, "lastssafa");
    const section = last ? last.section_code : 'introduction';
    window.location.href = `/part${part}#${section}`;
  };

  

  

  return (
    <div className="flex flex-col items-center justify-center w-full px-5 md:px-[10%]">
      <div className="flex flex-col justify-center w-full p-5 md:p-10">
        <div className="flex flex-col">
          <h2 className="font-(family-name:--font-bree) font-extrabold tracking-wide items-center text-center text-[20px] md:text-[30px] text-[#CE2C37]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <p className="font-(family-name:--font-open-sans) text-center text-xs md:text-sm text-black my-5">
            Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full p-5 gap-5">
        <div className="flex flex-col md:flex-row justify-start shadow-sm">
          <img src={sam} className="w-full md:w-[60%] rounded-xs min-w-30 mr-0 md:mr-5 max-w-xl" />
          <div className="flex flex-col justify-start my-5">
            <div className="flex flex-col justify-start gap-7 pl-0 md:pl-5">
              <span className="font-(family-name:--font-bree) font-black text-black text-xl md:text-3xl">
                Part I: Navigating Cancer Information in Online and Clinical Settings
              </span>
              <span className="flex flex-row gap-5 justify-start">
                <img src={alarm} className="w-6 md:w-8" />
                <span className="font-(family-name:--font-bree) font-medium tracking-widest text-black text-lg md:text-2xl">
                  30 MINUTES
                </span>
              </span>
              <span className="font-(family-name:--font-open-sans) font-light text-[#2F2F2F] text-sm md:text-base">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
              </span>
            </div>
            <div className="flex flex-row gap-5 justify-start">
              <button
                className="px-5 md:px-10 w-fit cursor-pointer py-2 border-2 m-5 text-black font-extrabold border-[#CE2A35] rounded-3xl flex flex-row items-center text-xs md:text-sm font-(family-name:--font-open-sans) tracking-wider uppercase"
                onClick={() => handleGoToPart(1)}
              >
                GO To PART 1 →
              </button>
              {isPart1Completed ? (
                <span className="text-green-500 px-5 md:px-10 mt-6">✔ Completed</span>
              ) : (
                <span className="text-yellow-500 px-5 md:px-10 mt-6">⌛ In Progress</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-start shadow-sm">
          <img src={sam2} className="w-full md:w-[60%] rounded-xs min-w-30 mr-0 md:mr-5 max-w-xl" />
          <div className="flex flex-col justify-start my-5">
            <div className="flex flex-col justify-start gap-7 pl-0 md:pl-5">
              <span className="font-(family-name:--font-bree) font-black text-black text-xl md:text-3xl">
                Part II: Facilitating Open and Supportive Communication in the Family
              </span>
              <span className="flex flex-row gap-5 justify-start">
                <img src={alarm} className="w-6 md:w-8" />
                <span className="font-(family-name:--font-bree) font-medium tracking-widest text-black text-lg md:text-2xl">
                  30 MINUTES
                </span>
              </span>
              <span className="font-(family-name:--font-open-sans) font-light text-[#2F2F2F] text-sm md:text-base">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
              </span>
            </div>
            <div className="flex flex-row gap-5 justify-start">
              <button
                className="px-5 md:px-10 w-fit cursor-pointer py-2 border-2 m-5 text-black font-extrabold border-[#CE2A35] rounded-3xl flex flex-row items-center text-xs md:text-sm font-(family-name:--font-open-sans) tracking-wider uppercase"
                onClick={() => handleGoToPart(2)}
              >
                GO To PART 2 →
              </button>
              {!isPart1Completed ? (
                <div></div>
              ) : isPart2Completed ? (
                <span className="text-green-500 px-5 md:px-10 mt-6">✔ Completed</span>
              ) : (
                <span className="text-yellow-500 px-5 md:px-10 mt-6">⌛ In Progress</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;