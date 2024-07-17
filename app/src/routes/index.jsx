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
      <div id="Home" className="w-full  h-[93vh] overflow-hidden ">
        <video
          autoPlay
          muted
          loop
          className="w-full -z-10 absolute h-[93vh] object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="w-full flex  justify-center h-1/3 items-center -z-10  ">
          <div className="flex flex-col items-center md:h-full md:justify-evenly gap-2  ">
            <span className="text-9xl md:text-[10rem] rounded-2xl md:px-7  backdrop-blur-md shadow-inner  p-2 drop-shadow-3xl md:mt-10  Title font-bold">
              Mosaicify
            </span>
            <p className="Section  border-black  p-2  ">
              Where Every Picture Tells Thousand Stories.
            </p>
          </div>
        </div>
        <div id="Model" className=" overflow-hidden  w-full h-2/3">
          <PhotoMan />
        </div>
      </div>
      <div className="w-full h-2 bg-yellow-500 "></div>
      {/* Second Part */}
      <div className=" w-[96vw] md:w-[98vw] h-[100vh]">
        <video
          autoPlay
          muted
          loop
          className="w-full -z-10 absolute h-full object-cover"
        >
          <source src="/bg1000.mp4" type="video/mp4" />
        </video>
        <div className="w-full h-full flex justify-center items-center pl-5">
          <div className="w-[95%] h-[95%] drop-shadow-3xl border border-gray-500 shadow-inner backdrop-blur-sm rounded-3xl flex  ">
            <div className="w-full md:w-1/2 h-full justify-evenly text-white p-4 items-center   ">
              <div className="w-full h-2/3">
                <h1 className="Title w-full text-shadow  text-[140px]  text-9xl">
                  Wanna{" "}
                </h1>
                <h1 className="Title w-full text-shadow  text-[140px]  text-9xl">
                  See{" "}
                </h1>
                <h1 className="Title text-shadow w-full  text-[140px]  text-9xl">
                  Amazing{" "}
                </h1>
                <h1 className="Title text-shadow w-full  text-[140px]  text-9xl">
                  Photos ?
                </h1>
              </div>
              <div className="flex flex-col h-1/3 justify-evenly ">
                <p className="Title text-yellow-500 text-4xl">
                  <span className="text-6xl">J</span>oin MOSAICIFY NOW !!!
                </p>
                <p className="SFB text-lg text-justify">
                  <span className="text-3xl text-yellow-500">A</span>t
                  Mosaicify, we believe that a picture is worth a thousand
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
                className="w-full h-full rounded-r-3xl object-cover opacity-75"
                src="/src/assets/bg203.jpeg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-2 bg-yellow-500 "></div>
      {/* Third Part */}
      <div className="w-[96vw] md:w-[98vw] h-[100vh]">
        <video
          autoPlay
          muted
          loop
          className="w-full -z-10 absolute h-full object-cover"
        >
          <source src="/bg75.mp4" type="video/mp4" />
        </video>
        <div className="w-full h-full flex justify-center items-center pl-5">
          <div className="w-[95%] h-[95%] drop-shadow-3xl border border-gray-500 shadow-inner backdrop-blur-md rounded-3xl flex flex-row-reverse   ">
            <div className="w-full text-right  md:w-1/2 h-full justify-evenly text-white p-4 items-center   ">
              <div className="w-full h-2/3">
                <h1 className="Title  w-full text-shadow  text-[140px]  text-9xl">
                  Hmm, You{" "}
                </h1>
                <h1 className="Title w-full text-shadow  text-[140px]  text-9xl">
                  Don&apos;t{" "}
                </h1>
                <h1 className="Title text-shadow w-full  text-[140px]  text-9xl">
                  Loose{" "}
                </h1>
                <h1 className="Title text-shadow w-full  text-[140px]  text-9xl">
                  Chances ?
                </h1>
              </div>
              <div className="flex flex-col h-1/3 justify-evenly ">
                <p className="Title text-yellow-500 text-4xl">
                  If Not,Just <span className="text-6xl">J</span>oin MOSAICIFY
                  NOW !!!
                </p>
                <div className="w-full flex justify-end items-center">
                  <button
                    className=" 
                    flex justify-center items-center hover:bg-yellow-400  
                  hover:text-black bg-yellow-500 bg-opacity-70 rounded-3xl p-4 w-5/6 h-20 border SFB text-2xl "
                  >
                    Join us!
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:block w-1/2 h-full">
              <img
                className="w-full h-full rounded-l-3xl object-cover opacity-75"
                src="/src/assets/bg-3.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
