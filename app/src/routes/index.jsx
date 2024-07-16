import { createFileRoute } from "@tanstack/react-router";
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
      <div className="w-full h-[93vh] overflow-hidden ">
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
            <span className="text-9xl md:text-[10rem] rounded-2xl md:px-7  backdrop-blur-sm shadow-inner  p-2 drop-shadow-2xl md:mt-10  Title font-bold">
              Mosaicify
            </span>
            <p className="Section  ">
              Where Every Picture Tells Thousand Stories.
            </p>
          </div>
        </div>
        <div id="Model" className=" overflow-hidden  w-full h-2/3">
          <PhotoMan />
        </div>
        {/* <div className="w" ></div> */}
      </div>
      <div className="w-full h-1 "></div>
      <div className="w-[96vw] h-[100vh]">
        <video
          autoPlay
          muted
          loop
          className="w-full -z-10 absolute h-full object-cover"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
}
