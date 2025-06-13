import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SlickSliderProps = {
  images: string[];
  options?: {
    showArrows?: boolean;
    showDots?: boolean;
    autoplay?: boolean;
    autoplayInterval?: number; // ms
  };
};

const SlickSlider: React.FC<SlickSliderProps> = ({
  images,
  options = { showArrows: true, showDots: true, autoplay: false, autoplayInterval: 3000 },
}) => {
  const { showArrows, showDots, autoplay, autoplayInterval } = options;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay effect
  React.useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, images.length]);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100 rounded-lg shadow-lg flex justify-center items-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className={`absolute h-full w-full object-contain transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      {options.showArrows && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </>
      )}

      {/* Dots */}
      {options.showDots && (
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SlickSlider;
