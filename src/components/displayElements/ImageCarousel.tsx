import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

const ImageCarousel = ({ images, className = "" }: ImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <div
      className={`relative flex items-center justify-center min-w-[350px] aspect-square ${className}`}
    >
      <Image
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        fill
        className="rounded-2xl object-contain aspect-square"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={handlePreviousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="text-white" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentImageIndex ? "bg-accent" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
