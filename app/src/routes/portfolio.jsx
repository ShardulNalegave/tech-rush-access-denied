import React, { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import PortScroll from "../components/PortScroll";
import { TypeAnimation } from "react-type-animation";

export const Route = createFileRoute("/portfolio")({
  component: Portfolio,
});

function Portfolio() {
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
      } overflow-x-hidden overflow-y-scroll snap-y snap-mandatory`}
    >
      {/* <div className="w-[100vw] h-[93vh] relative overflow-hidden snap-start">
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
      </div> */}

      {/* Second Section */}
      <div className="bg-black w-full h-screen snap-start grid grid-cols-1 lg:grid-cols-2 overflow-y-hidden">
        <div className="my-5 px-5 lg:px-16 lg:py-20 flex flex-col justify-start md:justify-center lg:justify-start">
          <h1 className="font-semibold text-white text-3xl lg:text-5xl text-left">
            Hey there,
          </h1>

          <div className="mt-2 font-bold text-yellow-500 text-4xl lg:text-5xl text-left">
            <TypeAnimation
              sequence={[
                "I'm Jose Mourinho",
                1500,
                "I'm",
                1500,
                "I'm Jose Mourinho",
                1500,
                "I'm",
                1500,
                "I'm Jose Mourinho",
                1500,
              ]}
            />
          </div>
          <h1 className="mt-8 font-secondary font-normal text-gray-400 text-xl text-left">
            John Smith is a passionate photographer with over a decade of
            experience capturing stunning landscapes and intimate portraits. His
            work has been featured in various international magazines and
            exhibitions. John's unique ability to blend natural light with
            creative compositions sets his photography apart, making each image
            a work of art.
          </h1>
          <div className="flex flex-col lg:flex-row lg:justify-around mt-8">
            <button className="w-full lg:w-auto mt-4 lg:mt-0 bg-transparent transition duration-500 ease-in-out hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-black py-4 px-6 border border-yellow-500 hover:border-transparent rounded">
              <a href="mailto:harshgaggar19@gmail.com">Mail me!!</a>
            </button>
          </div>
        </div>

        <div className="px-5 flex flex-col items-center mt-10 lg:mt-0">
          <div className="relative w-48 h-48 lg:w-80 lg:h-80 top-24 flex justify-center items-center">
            <div className="absolute inset-0 rounded-full border-2 border-yellow-500 animate-glow hidden lg:flex"></div>
            <img
              src="/imgs/8.jpg"
              className="w-full h-full rounded-full object-cover shadow-md hidden lg:flex"
              alt="John Smith"
            />
          </div>
        </div>
      </div>
      {/* <div className=" relative  bg-black bg-opacity-50 overflow-hidden w-[100vw] h-[93vh] snap-start">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover absolute -z-10 "
        >
          <source src="/bg112.mp4" type="video/mp4" />
        </video>
        <div className=" p-4 w-full h-full flex justify-center items-center">
          <div className="w-[95%] rounded-3xl lg:rounded-[5000px] lg:p-28  h-[85%] backdrop-blur-xl border border-gray-300 shadow-2xl p-5 drop-shadow-2xl  ">
            <div className="Title flex justify-center text-9xl lg:text-[180px] text-white">
              <h1 className="">About me </h1>
            </div>
            <div>
              <p className="text-sm Section lg:text-xl text-white">
                John Smith is a passionate photographer with over a decade of
                experience capturing stunning landscapes and intimate portraits.
                His work has been featured in various international magazines
                and exhibitions. John&apos;s unique ability to blend natural
                light with creative compositions sets his photography apart,
                making each image a work of art.
              </p>
              <div className=" Title flex justify-center text-white text-3xl pt-3 pl-5 ">
                Contact me:
              </div>
              <div className=" justify-center flex pl-5 gap-4 text-white SFB">
                <img className="invert" src="/src/assets/icons/mail.svg" />
                &rarr;
                <span>
                  <a
                    className="hover:underline  transition-all Section hover:text-blue-400"
                    // change the href as well as the data instead for mail.to to work
                    href="mailto:nirajsalunke07@gmail.com"
                  >
                    nirajsalunke07@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <hr className="bg-yellow-500 h-2" />
      <div
        id="Scroll"
        className="w-[100vw]  h-[100vh] overflow-x-auto overflow-y-hidden snap-start"
        ref={scrollContainerRef}
        style={{ whiteSpace: "nowrap" }}
      >
        <PortScroll />
      </div>
    </div>
  );
}
