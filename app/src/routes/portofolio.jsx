import React, { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import PortScroll from "../components/PortScroll";
import { TypeAnimation } from "react-type-animation";

export const Route = createFileRoute("/portofolio")({
  component: Portofolio,
});

function Portofolio() {
  const [horizontalScrollCompleted, setHorizontalScrollCompleted] =
    useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        setHorizontalScrollCompleted(true);
      } else {
        setHorizontalScrollCompleted(false);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("scroll", onScroll);

    return () => scrollContainer.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`w-[100vw] ${
        horizontalScrollCompleted ? "h-[200vh]" : "h-[100vh]"
      } overflow-x-hidden overflow-y-auto`}
    >
      <div className="w-[100vw] h-[93vh] relative overflow-hidden">
        <video className="w-full h-full  object-cover absolute inset-0 -z-10">
          <source src="/bg1012.mp4" type="video/mp4" />
        </video>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[93%] border border-gray-500 shadow-2xl rounded-3xl flex p-4 backdrop-blur-sm h-[93%]">
            <div className="flex w-full lg:w-1/2 justify-evenly h-full items-start flex-col">
              <div>
                <h1 className=" text-8xl lg:text-9xl text-gray-700 Title">
                  I&apos;m
                </h1>

                <TypeAnimation
                  sequence={["JOSE", 1500, "", 1500, "JOSE", 1500]}
                  wrapper="h1"
                  speed={5}
                  repeat={Infinity}
                  className="Title text-yellow-500 text-8xl  lg:text-9xl"
                />
                <TypeAnimation
                  sequence={["Mourinho", 1000, "", 1000, "Mourinho", 1000]}
                  wrapper="h1"
                  speed={5}
                  repeat={Infinity}
                  className="Title text-yellow-500 text-8xl  lg:text-9xl"
                />
              </div>
              <p className="SFB text-md leading-8 text-white">
                I&apos;m a 24 year old guy being Photographer, Videographer
                I&apos;m currently working with Apple to improve its camera
                quality.
              </p>
              <div className="flex gap-3 justify-evenly text-white w-full">
                <button className="transition-all hover:scale-110 text-2xl Title rounded-full flex gap-4 justify-center items-center bg-opacity-60 hover:text-black hover:bg-yellow-400 bg-yellow-500 w-1/3 h-[7vh]">
                  Share
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-send"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
                <button className="transition-all hover:scale-110 flex justify-center gap-4 items-center Title text-2xl rounded-full hover:text-black hover:bg-yellow-400 bg-opacity-60 bg-yellow-500 w-1/3 h-[7vh]">
                  Follow
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user-plus"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" x2="19" y1="8" y2="14" />
                    <line x1="22" x2="16" y1="11" y2="11" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="img h-full w-1/2 hidden lg:block">
              <img
                className="h-full object-cover rounded-r-2xl"
                src="/src/assets/bg-Port1.jpg"
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-yellow-500 h-2" />
      {/* Second Section */}
      <div
        id="Scroll"
        className="w-[100vw]  h-[100vh] overflow-x-auto overflow-y-hidden"
        ref={scrollContainerRef}
        style={{ whiteSpace: "nowrap" }}
      >
        <PortScroll />
      </div>
    </div>
  );
}
