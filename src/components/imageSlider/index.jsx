import React, { useEffect, useState } from "react";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaCircle,
} from "react-icons/fa";

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [imagePointer, setImagePointer] = useState(0);
  const total = 7;

  useEffect(() => {
    const fetchImages = async () => {
      const urls = [];
      for (let i = 0; i < total; i++) {
        urls.push(`https://picsum.photos/800/600?random=${i + 1}`);
      }
      setImages(urls);
    };

    fetchImages();
  }, []);
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading images...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="h-[500px] w-[700px] relative overflow-hidden bg-gray-200">
        <img
          src={images[imagePointer]}
          alt="random"
          className="object-cover h-full w-full"
        />

        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-800"
          onClick={() => setImagePointer((prev) => (prev - 1 + total) % total)}
        >
          <FaArrowAltCircleLeft size={32} />
        </button>

        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-800"
          onClick={() => setImagePointer((prev) => (prev + 1) % total)}
        >
          <FaArrowAltCircleRight size={32} />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <FaCircle
              key={i}
              className={i === imagePointer ? "text-gray-800" : "text-gray-400"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
