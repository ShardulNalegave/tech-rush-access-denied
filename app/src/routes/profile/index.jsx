import { createFileRoute } from "@tanstack/react-router";
import Popup from "reactjs-popup";

export const Route = createFileRoute("/profile/")({
  component: Profile,
});

import sampleImages from "../../sampleImages";
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
        src="https://images.unsplash.com/photo-1577546568088-eb32790be7ec?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Profile"
      />
      <h1 className="text-3xl font-semibold">Harsh Gaggar</h1>
      <p className="text-gray-500">@harshgaggar</p>
      <p className="text-gray-500">0 following</p>
      <p className="text-gray-800">
        hello guys this my bio!!welcome to mosaicify
      </p>

      <div className="mt-4 flex space-x-4">
        <button className="relative mx-0 my-0 px-4 py-2 cursor-pointer border-none bg-gray-800 rounded-lg text-white font-light text-lg font-inherit overflow-hidden transition-all duration-300 ease-in-out hover:-rotate-3 ">
          <span className="relative z-10">PORTFOLIO</span>
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
                loading="lazy"
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        overlayStyle={{ background: "rgba(0, 0, 0, 0.7)" }}
      >
        {selectedImage && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-[90vw] md:max-w-[80vw] h-[90vh] relative top-3 shadow-lg flex flex-col md:flex-row items-center justify-center">
              <button
                className="absolute top-2 right-2 md:-right-10 px-2 text-2xl text-gray-200 hover:text-white"
                onClick={closeModal}
              >
                &times;
              </button>
              <div className="w-full md:w-1/2 h-full p-2 md:p-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full sm:h-[80%] object-cover rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col p-4 text-gray-900 h-full">
                <div className="flex-1 overflow-y-auto">
                  <h1 className="text-2xl md:text-3xl font-bold px-2 md:px-20">
                    {selectedImage.title}
                  </h1>
                  <p className="mb-4 md:mb-10 px-2 md:px-20">
                    Image description
                  </p>
                  {/* Profile card */}
                  <div className="flex items-center border-b-2 w-full space-x-4 p-4 cursor-pointer mb-4 md:mb-10">
                    <img
                      src="https://images.unsplash.com/photo-1577546568088-eb32790be7ec?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">Username</h2>
                      <p className="text-sm text-gray-600">48 followers</p>
                    </div>
                    <button className="ml-auto bg-gray-100 text-black rounded-full px-4 py-2 hover:bg-gray-200">
                      Follow
                    </button>
                  </div>
                </div>
                <div className="mt-4 md:mt-10">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    className="flex-grow outline-none px-3 py-2 w-full rounded-2xl text-gray-600 bg-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
