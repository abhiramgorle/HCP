import carma from "../assets/Carma.png";
import carla from "../assets/carla.png";

function Team() {
    return (
        <div className="p-4">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row shadow-lg">
                    <div className="w-full md:w-[30%]">
                        <img
                            src={carma}
                            alt="Carma Bylund Image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full md:w-[70%] flex flex-col items-start p-4">
                        <span className="text-left my-1 text-xl md:text-2xl text-black font-(family-name:--font-bree)">
                            Carma Bylund, Ph.D.
                        </span>
                        <b className="text-left my-1 font-(family-name:--font-open-sans) text-black">
                            Primary Investigator
                        </b>
                        <p className="text-left my-1 text-black text-sm md:text-base">
                            Dr. Carma Bylund is Professor in the Department of Public
                            Relations and in the Division of Hematology & Oncology, College of
                            Medicine. Dr. Bylund is a behavioral scientist with international
                            expertise in healthcare communication and medical education. She
                            studies clinician-patient/caregiver communication, including
                            developing and evaluating clinician-focused and patient and
                            caregiver-focused interventions to improve communication. In the
                            context of cancer, her research spans the cancer continuum from
                            prevention to survivorship. Dr. Bylund’s research collaborations
                            have resulted in more than $10 million in grant funding. At UF,
                            her Communication in Healthcare Lab has several research and
                            teaching collaborations with the College of Medicine, the College
                            of Nursing, and the College of Medicine.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row shadow-lg">
                    <div className="w-full md:w-[30%]">
                        <img
                            src={carla}
                            alt="Carla Fisher Image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full md:w-[70%] flex flex-col items-start p-4">
                        <span className="text-left my-1 text-xl md:text-2xl text-black font-(family-name:--font-bree)">
                            Carla Fisher, Ph.D.
                        </span>
                        <b className="text-left my-1 font-(family-name:--font-open-sans) text-black">
                            Co-Primary Investigator
                        </b>
                        <p className="text-left my-1 text-black text-sm md:text-base">
                            Carla L. Fisher is an Associate Professor in the College of
                            Journalism and Communications, Full Member of the UF Health
                            Cancer Center in the Population Sciences Program, and Faculty
                            Affiliate in the Center for Arts and Medicine. She is also an
                            Expert Advisory Board Member for the STEM Translational
                            Communication Center (STCC). Prior to joining UF, she was faculty
                            at Arizona State University and George Mason University and a
                            National Institute on Aging (NIA) Pre-Doctoral Fellow/Trainee (T32
                            AG00048). Dr. Fisher’s research collaborations have garnered more
                            than $2 million in grant funding and include federal awards from
                            the National Institute of Environmental Health Sciences (NIEHS),
                            National Institute on Aging (NIA), and the Department of Defense
                            (DOD).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;