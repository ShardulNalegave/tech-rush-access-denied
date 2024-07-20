import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test_feed")({
  component: Test_feed,
});

import { useState } from "react";
import Popup from "reactjs-popup";
import sampleImages from "../sampleImages";
export default function Test_feed() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [liked, setLiked] = useState(false);

  const Image = [
    { url: "src/assets/Nature Photo Pack/1.jpg" },
    { url: "src/assets/Nature Photo Pack/2.jpg" },
    { url: "src/assets/Nature Photo Pack/3.jpg" },
    { url: "src/assets/Nature Photo Pack/4.jpg" },
    { url: "src/assets/Nature Photo Pack/5.jpg" },
    { url: "src/assets/Nature Photo Pack/6.jpg" },
    { url: "src/assets/Nature Photo Pack/7.jpg" },
    { url: "src/assets/Nature Photo Pack/8.jpg" },
    { url: "src/assets/Nature Photo Pack/9.jpg" },
    { url: "src/assets/Nature Photo Pack/10.jpg" },
    { url: "src/assets/Nature Photo Pack/11.jpg" },
    { url: "src/assets/Nature Photo Pack/12.jpg" },
    { url: "src/assets/Nature Photo Pack/13.jpg" },
    { url: "src/assets/Nature Photo Pack/14.jpg" },
    { url: "src/assets/Nature Photo Pack/15.jpg" },
    { url: "src/assets/Nature Photo Pack/16.jpg" },
    { url: "src/assets/Nature Photo Pack/17.jpg" },
    { url: "src/assets/Nature Photo Pack/18.jpg" },
    { url: "src/assets/Nature Photo Pack/19.jpg" },
    { url: "src/assets/Nature Photo Pack/20.jpg" },
    { url: "src/assets/Nature Photo Pack/21.jpg" },
    { url: "src/assets/Nature Photo Pack/22.jpg" },
    { url: "src/assets/Nature Photo Pack/23.jpg" },
    { url: "src/assets/Nature Photo Pack/24.jpg" },
    { url: "src/assets/Nature Photo Pack/25.jpg" },
    { url: "src/assets/Nature Photo Pack/26.jpg" },
    { url: "src/assets/Nature Photo Pack/27.jpg" },
    { url: "src/assets/Nature Photo Pack/28.jpg" },
    { url: "src/assets/Nature Photo Pack/29.jpg" },
    { url: "src/assets/Nature Photo Pack/30.jpg" },
  ];
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
    <div className="col-span-7 grid grid-cols-3 grid-rows-5 gap-2 p-4 overflow-hidden">
      {Image.map((item, index) => (
        <div
          key={index}
          className={`oscillate-${index % 3} h-56 overflow-hidden rounded-lg`}
        >
          <img src={item.url} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}
