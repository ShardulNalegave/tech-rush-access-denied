import { createFileRoute, Link } from "@tanstack/react-router";
import PhotoMan from "../components/PhotoMan";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TypeAnimation } from "react-type-animation";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useGSAP(() => {
    gsap.fromTo(
      "#Model",
      {
        y: "50vh",
      },
      {
        y: "12vh",
        duration: 2,
      }
    );
  }, []);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <div
        id="Home"
        className="w-full h-screen overflow-hidden relative snap-start"
      >
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover absolute inset-0 -z-10"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="w-full flex justify-center h-1/3 items-center relative">
          <div className="flex flex-col items-center md:h-full md:justify-evenly gap-2">
            <span className="text-8xl sm:text-8xl  2xl:text-[180px] md:text-[10rem] rounded-2xl md:px-7 backdrop-blur-md shadow-inner p-2 drop-shadow-3xl md:mt-10 Title font-bold">
              Mosaicify
            </span>
            <p className="Section border-black p-2 text-base sm:text-lg md:text-xl">
              Where Every Picture Tells a Thousand Stories.
            </p>
          </div>
        </div>
        <div id="Model" className="w-full h-2/3">
          <PhotoMan />
        </div>
      </div>
      <div className="w-full h-2 bg-yellow-500"></div>
      {/* Second Part */}
      <div className="h-screen max-w-[100vw] snap-start">
        <div className="bg-cyan-100 h-screen max-w-[100vw] items-center justify-center flex ">
          <div className=" lg:flex-1">
            <img
              src="/imgs/1.jpg"
              className="h-[70vh] w-[19vw] z-[10] rounded-3xl object-cover shadow-2xl drop-shadow-2xl shadow-slate-900 relative top-[28rem] left-[260px] hidden lg:block"
              alt=""
            />
            <img
              src="/imgs/8.jpg"
              className="h-[40vh] w-[15vw] object-cover shadow-2xl drop-shadow-2xl shadow-slate-900 rounded-3xl relative top-48 left-20 hidden lg:block"
              alt=""
            />
            <img
              src="/imgs/5.jpg"
              className="h-[50vh] w-[17vw] object-cover shadow-2xl drop-shadow-2xl shadow-slate-900 rounded-3xl relative bottom-80 left-[430px] hidden lg:block"
              alt=""
            />
            <img
              src="/imgs/9.jpg"
              className="h-[30vh] w-[14vw] object-cover shadow-2xl drop-shadow-2xl shadow-slate-900 rounded-3xl relative bottom-[740px] left-28 hidden lg:block"
              alt=""
            />
          </div>
          <div className="flex-1 flex flex-col justify-center items-center px-10">
            <h3 className="text-7xl flex justify-center items-center flex-col Title font-bold text-red-700">
              <span className="Title flex justify-center items-center text-center">
                Looking for Something
              </span>
              <span className="flex justify-center items-center">
                <TypeAnimation
                  sequence={[
                    "unique?",
                    1500,
                    "Creative?",
                    1500,
                    "Artistic?",
                    1500,
                    "Innovative?",
                    1500,
                    "Extraordinary?",
                    1500,
                    "Fascinating?",
                    1500,
                    "Mesmerizing?",
                    1500,
                  ]}
                  wrapper="h1"
                  speed={5}
                  repeat={Infinity}
                  className="Title    "
                />
              </span>
            </h3>
            <h3 className="text-5xl Title font-semibold text-yellow-500">
              {" "}
              This is the right place !!
            </h3>
            <p className=" py-4 px-8  text-lg Section">
              Think of something you’re into—and see what you find.
            </p>
            <button className="bg-yellow-500 SFB px-4 py-2 rounded-3xl text-white font-semibold hover:bg-yellow-600 hover:scale-105 transition duration-300">
              <Link to="/feed">Explore </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-2 bg-yellow-500"></div>
      {/* Third Part */}
      <div className="w-[100vw] md:w-[100vw] h-screen relative snap-start">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover absolute inset-0 -z-10"
        >
          <source src="/test.mp4" type="video/mp4" />
        </video>
        <div className="w-full h-full flex justify-center items-center ">
          <div className="w-[95%] h-[95%] drop-shadow-3xl border border-gray-500 shadow-inner backdrop-blur-md rounded-3xl flex flex-col md:flex-row-reverse">
            <div className="w-full text-right lg:w-1/2 h-full flex flex-col justify-evenly text-white p-4 items-center">
              <div className="w-full h-2/3 flex mt-10 flex-col justify-center text-center">
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[120px]  ">
                  Hmm, You
                </h1>
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[120px] ">
                  Don&apos;t
                </h1>
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[120px] ">
                  Loose
                </h1>
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[120px] ">
                  Chances?
                </h1>
              </div>
              <div className="flex flex-col h-1/3 justify-evenly">
                <p className="Title text-yellow-500 text-xl sm:text-2xl md:text-4xl">
                  If Not, Just Join MOSAICIFY NOW!
                </p>
                <div className="w-full flex justify-center items-center">
                  <a href="/auth/signup">
                    <div className="button flex text-2xl rounded-xl border p-2 bg-yellow-500 hover:bg-black transition-all duration-300">
                      {["J", "O", "I", "N"].map((letter, index) => (
                        <div
                          key={index}
                          className="box w-9 h-10 flex justify-center items-center text-white font-bold relative overflow-hidden  bg-yellow-500"
                        >
                          {letter}
                          <div
                            className={`before-content absolute top-0 w-full h-full flex items-center justify-center bg-black transition-transform duration-500 ${index % 2 === 1 ? "-translate-y-full" : "translate-y-full"}`}
                          >
                            {["N", "O", "W", "!"][index]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center w-1/2 h-full ">
              <video
                autoPlay
                muted
                loop
                className="  w-full  ml-10  rounded-3xl object-contain opacity-100 "
              >
                <source src="/test.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
