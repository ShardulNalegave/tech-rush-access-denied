import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef,useEffect } from "react";
import sampleImages from "../sampleImages";

export const Route = createFileRoute("/test")({
	component: test,
});

import React from 'react'

export default function test() {
  return (
		<div className="bg-cyan-100 h-screen max-w-[100vw] items-center justify-center flex ">
			<div className=" lg:flex-1">
				<img
					src="/imgs/1.jpg"
					className="h-[70vh] w-[19vw] z-[10] rounded-2xl object-cover shadow-2xl drop-shadow-2xl shadow-slate-900 absolute top-[9rem] left-[240px] hidden lg:block"
					alt=""
				/>
				<img
					src="/imgs/8.jpg"
					className="h-[40vh] w-[15vw] object-cover shadow-2xl drop-shadow-2xl shadow-slate-900 rounded-2xl absolute top-[23rem] left-20 hidden lg:block"
					alt=""
				/>
				<img
					src="/imgs/5.jpg"
					className="h-[50vh] w-[17vw] object-cover shadow-2xl drop-shadow-2xl shadow-slate-900 rounded-2xl absolute top-[12rem] left-[400px] hidden lg:block"
					alt=""
				/>
				<img
					src="/imgs/9.jpg"
					className="h-[30vh] w-[14vw] object-cover shadow-2xl drop-shadow-2xl shadow-slate-900 rounded-full absolute top-16 left-24 hidden lg:block"
					alt=""
				/>
			</div>
			<div className="flex-1 flex flex-col justify-center items-center px-10">
				<h3 className="text-6xl Title font-bold text-yellow-500">
				  Looking for something? <br /> This is the right place
				</h3>
				<p className=" py-4 SFB">
					What do you want to try next? Think of something you’re into—and see what you find.
			  </p>
			  <button className="bg-yellow-500 px-4 py-2 rounded-3xl text-white font-semibold hover:bg-yellow-600 hover:scale-105 transition duration-300">Explore</button>
			</div>
		</div>
	);
}
