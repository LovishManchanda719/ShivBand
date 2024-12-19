import React from "react";

interface PhotoHighlightsProps {
  isDarkMode: boolean;
}

const PhotoHighlights: React.FC<PhotoHighlightsProps> = ({ isDarkMode }) => {
  const photoHighlights = [
    "https://i.pinimg.com/736x/f7/d3/38/f7d3382fc26705396d6173c5564b8b53.jpg",
    "https://i.pinimg.com/736x/68/90/f8/6890f881b0b1d205b4f82eb661801e37.jpg",
    "https://i.pinimg.com/736x/82/68/ec/8268ec904d9e26dd02d5d4d47b5c7c39.jpg"
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
