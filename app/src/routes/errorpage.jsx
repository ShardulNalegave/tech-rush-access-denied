import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/errorpage")({
	component: ErrorPage,
});

import React from "react";

export default function ErrorPage() {
	return (
		<div className="fixed inset-0 flex items-center justify-center -z-10 bg-slate-50 p-4">
			<div className="bg-white rounded-lg w-full max-w-[90vw] md:max-w-[50vw] h-[70vh] md:h-auto shadow-lg flex flex-col md:flex-row items-center justify-center">
				<div className="w-full md:w-1/2 h-1/2 md:h-full">
					<img
						src="errorPage.svg"
						alt="Error"
						className="w-full h-full object-contain rounded-t-lg md:rounded-l-lg md:rounded-t-none"
					/>
				</div>
				<div className="w-full md:w-1/2 flex flex-col p-4 text-gray-900 h-1/2 md:h-full">
					<div className="flex-1 overflow-y-auto">
						<h1 className="text-2xl md:text-3xl font-bold uppercase text-red-700 pt-6 md:pt-24 px-2 md:px-20">
							Something went wrong!!
						</h1>
						<p className="font-medium pl-5 pt-2">
							Have a look at our landing page..
						</p>
						<div className="flex justify-center md:justify-start">
							<Link
								to="/"
								className="bg-gray-600 hover:bg-red-600 transition duration-300 px-3 py-2 rounded-lg mx-6 md:mx-24 my-5 font-semibold text-white text-center"
							>
								Home
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
