import { createFileRoute, Link } from "@tanstack/react-router";
import PhotoMan from "../components/PhotoMan";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
    <>
      <div id="Home" className="w-full h-screen overflow-hidden relative">
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
            <span className="text-8xl sm:text-8xl  2xl:text-[300px] md:text-[10rem] rounded-2xl md:px-7 backdrop-blur-md shadow-inner p-2 drop-shadow-3xl md:mt-10 Title font-bold">
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
      <div className="w-[100vw]  h-screen relative">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover absolute inset-0 -z-10"
        >
          <source src="/bg1000.mp4" type="video/mp4" />
        </video>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[95%] h-[95%] drop-shadow-3xl border border-gray-500 shadow-inner backdrop-blur-sm rounded-3xl flex flex-col md:flex-row">
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-evenly text-white p-4 items-center">
              <div className="w-full h-2/3 mt-10 flex flex-col justify-center text-center">
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[150px]">
                  Wanna
                </h1>
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[150px]">
                  See
                </h1>
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[150px]">
                  Amazing
                </h1>
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[150px]">
                  Photos?
                </h1>
              </div>
              <div className="flex flex-col h-1/3 justify-evenly">
                <p className="SFB overflow-hidden text-sm sm:text-base md:text-md text-justify">
                  At Mosaicify, we believe that a picture is worth a thousand
                  words. Our platform is designed to bring together a vibrant
                  community of photography enthusiasts, professional
                  photographers, and anyone with a love for capturing moments.
                  Whether you’re here to explore stunning images, upload your
                  own masterpieces, or simply find inspiration, Mosaicify is the
                  place for you.
                </p>
              </div>
            </div>
            <div className="hidden md:block w-1/2 h-full">
              <img
                className="w-full h-full rounded-r-3xl object-cover opacity-100"
                src="/src/assets/bg203.jpeg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-2 bg-yellow-500"></div>
      {/* Third Part */}
      <div className="w-[100vw] md:w-[100vw] h-screen relative">
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
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[150px]  ">
                  Hmm, You
                </h1>
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[150px] ">
                  Don&apos;t
                </h1>
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[150px] ">
                  Loose
                </h1>
                <h1 className="Title w-full text-shadow text-6xl md:text-8xl 2xl:text-[150px] ">
                  Chances?
                </h1>
              </div>
              <div className="flex flex-col h-1/3 justify-evenly">
                <p className="Title text-yellow-500 text-xl sm:text-2xl md:text-4xl">
                  If Not, Just Join MOSAICIFY NOW!
                </p>
                <div className="w-full flex justify-center items-center">
                  <button className="flex justify-center items-center hover:bg-yellow-400 hover:text-black bg-yellow-500 bg-opacity-70 rounded-3xl p-4 w-5/6 h-15 border SFB text-lg sm:text-xl md:text-2xl">
                    Join us!
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center w-1/2 h-full ">
              <video
                autoPlay
                muted
                loop
                className="  w-full    rounded-r-3xl object-contain opacity-100 "
              >
                <source src="/test.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
