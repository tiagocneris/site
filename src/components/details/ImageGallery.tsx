import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={images[currentImage]}
          alt={`${name} - Imagem ${currentImage + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            showZoom ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setShowZoom(!showZoom)}
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-[#36c6c6] transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <button
          onClick={() => setShowZoom(!showZoom)}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-[#36c6c6] transition-colors"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden ${
                currentImage === index ? 'ring-2 ring-[#36c6c6]' : 'hover:opacity-80'
              }`}
            >
              <img
                src={image}
                alt={`${name} - Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}