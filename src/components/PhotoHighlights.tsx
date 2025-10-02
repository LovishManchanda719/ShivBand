import React from "react";

interface PhotoHighlightsProps {
  isDarkMode: boolean;
}

const PhotoHighlights: React.FC<PhotoHighlightsProps> = ({ isDarkMode }) => {
  const photoHighlights = [
    "images/1.jpg",
    "images/2.jpg",
    "images/3.jpg",
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? "text-white" : "text-black"}`}>
        Our Moments
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photoHighlights.map((photo, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={photo}
              alt={`Performance ${index + 1}`}
              className="w-full h-[500px] object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoHighlights;
