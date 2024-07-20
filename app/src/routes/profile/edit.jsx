import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/edit")({
  component: Edit_profile,
});

import React from "react";

export default function Edit_profile() {
  return (
		<div className="container mx-auto my-6">
			<div className="flex justify-center">
				<div className="w-full max-w-2xl">
					<h1 className="text-3xl font-semibold mb-6">Edit Your Listing</h1>
					<form className="space-y-6">
						<div className="mb-4">
							<label htmlFor="name" className="block text-gray-700">
								Name:
							</label>
							<input
								type="text"
								name="name"
								placeholder="Enter name"
								className="w-full mt-2 p-2 border border-gray-300 rounded-md hover:border-yellow-500 transition duration-200 ease-in"
								required
							/>
						</div>
						<div className="mb-4">
							<label htmlFor="bio" className="block text-gray-700">
								Bio:
							</label>
							<textarea
								name="bio"
								placeholder="Enter bio"
								cols="30"
								className="w-full mt-2 p-2 border border-gray-300 rounded-md  hover:border-yellow-500 transition duration-300"
								required
							></textarea>
						</div>
						<div className="mb-4">
							<label htmlFor="image" className="block text-gray-700">
								Profile Photo:
							</label>
							<input
								type="file"
								name="image"
								placeholder="Enter image URL"
								className="w-full mt-2 p-2 border border-gray-300 rounded-md  hover:border-yellow-500 transition duration-300"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-1/3 py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-yellow-500 transition duration-300"
						>
							Edit
						</button>
					</form>
				</div>
      		</div>
		</div>
	);
}
