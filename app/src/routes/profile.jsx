import { createFileRoute } from "@tanstack/react-router";
import Popup from "reactjs-popup";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

import sampleImages from "../sampleImages";
import { useState } from "react";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [liked, setLiked] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="flex flex-col items-center pt-10 border-t">
      <img
        className="rounded-full w-40 h-40 mb-4"
        src="https://images.unsplash.com/photo-1577546568088-eb32790be7ec?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // replace with your image URL
        alt="Profile"
      />
      <h1 className="text-3xl font-semibold">Harsh Gaggar</h1>
      <p className="text-gray-500">@harshgaggar</p>
      <p className="text-gray-500">0 following</p>
      <p className="text-gray-800">
        hello guys this my bio!!welcome to mosaicify
      </p>

      <div className="mt-4 flex space-x-4">
        <button class="relative mx-0 my-0 px-4 py-2 cursor-pointer border-none bg-gray-800 rounded-lg text-white font-light text-lg font-inherit overflow-hidden transition-all duration-300 ease-in-out hover:-rotate-3 ">
          <span class="relative z-10">PORTFOLIO</span>
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition duration-200">
          Edit profile
        </button>
      </div>

      <div className="mt-6 flex space-x-8 border-b border-gray-300">
        <button className="pb-2 border-b-2 border-transparent hover:border-black transition duration-200 ease-in">
          Posts
        </button>
        <button className="pb-2 border-b-2 border-transparent hover:border-black transition duration-200 ease-in">
          Saved
        </button>
      </div>
      <div className="mt-5 mx-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sampleImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition duration-100"
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
								<p className="text-white text-lg">{image.title}</p>
							</div> */}
            </div>
          ))}
        </div>
      </div>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        className="rounded-md h-[50vh] w-[70vw]"
      >
        <div className="bg-white border-2 p-6 rounded-md relative shadow-2xl shadow-slate-900">
          <button
            className="absolute top-2 right-2 p-1 px-2 text-2xl text-gray-500 hover:text-gray-800"
            onClick={closeModal}
          >
            &times;
          </button>
          {selectedImage && (
            <div className="flex flex-col items-center">
              <p className="text-gray-900 text-xl font-semibold mb-2">
                {selectedImage.title}
              </p>
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-cover border-dotted border-gray-600 border-2 rounded-lg mb-4"
              />
              <button
                className={`px-4 py-2 rounded-full text-white transition duration-200 ${
                  liked ? "bg-red-500" : "bg-gray-400"
                }`}
                onClick={toggleLike}
              >
                {liked ? "Liked " : "Like"}
              </button>
            </div>
          )}
        </div>
      </Popup>
    </div>
  );
}
