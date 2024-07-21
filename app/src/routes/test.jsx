import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
	component: Test,
});

import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Test() {
	return (
		<div className="bg-black w-full h-screen grid grid-cols-1 lg:grid-cols-2 overflow-y-hidden">
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
					creative compositions sets his photography apart, making each image a
					work of art.
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
	);
}
