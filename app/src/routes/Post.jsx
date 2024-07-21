import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/Post")({
  component: PostPop,
});
function PostPop() {
  const [like, setlike] = useState("none");
  const handleClick = () => {
    like === "none" ? setlike("red") : setlike("none");
  };
  return (
    <div className="w-screen h-[93vh]">
      <div className="w-full h-full p-5 flex flex-col lg:flex-row gap-3">
        <div className="w-full h-1/2 lg:w-1/2 lg:h-full   ">
          <img
            src="\imgs\1.jpg"
            className="object-cover rounded-lg w-full h-full"
          />
        </div>
        <div className="w-full lg:w-1/2 lg:h-full h-1/2 flex flex-col  gap-1 ">
          <div className="flex flex-col w-full h-1/4 lg:gap-1  p-1">
            <h1 className="Section font-bold text-xl ">Caption</h1>
            <div className="w-full SFR text-md flex lg:flex-col justify-between gap-4 ">
              <p>Name of the Guy who posted.</p>
              {/* <p></p> */}
              <div>
                <svg
                  className="cursor-pointer lucide lucide-heart"
                  onClick={handleClick}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={like}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="h-1/2 p-3 lg:h-2/3  w-full border-2 rounded-xl Section overflow-y-scroll   text-gray-400 ">
            Currently no comments. Why not add one?
          </div>
          <div className="w-full border-2 border-gray-400 h-1/6 lg:h-12 flex justify-center items-center l  rounded-xl p-3 mt-3  ">
            <input
              placeholder="Add a Lovely Comment"
              type="text"
              className=" Section w-full h-2/3  lg:h-1/6 outline-none  rounded-2xl p-4"
            />

            <div>
              <svg
                className="cursor-pointer lucide lucide-send"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
