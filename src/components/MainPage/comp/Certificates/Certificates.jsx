import { useState, useRef, useEffect } from "react";

export default function Certificates() {
  // Array of certificate image URLs
  const certificateUrls = [
    "url_to_certificate_1.jpg",
    "url_to_certificate_2.jpg",
    "url_to_certificate_3.jpg",
    // Add more URLs as needed
  ];

  const [showArrows, setShowArrows] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Check if the number of certificates exceeds the screen width, show arrows if needed
    if (carouselRef.current.scrollWidth > carouselRef.current.clientWidth) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  }, [certificateUrls]);

  // Function to scroll carousel left or right
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white p-8">
      <h1 className="text-center text-3xl font-bold mb-8">Our Certificates</h1>

      {/* Carousel */}
      <div className="relative w-full">
        <div
          className={`carousel flex ${
            certificateUrls.length < 3 ? "justify-center" : "justify-start"
          } overflow-x-auto snap-x snap-mandatory scrollbar-hide space-x-6`}
          ref={carouselRef}
        >
          {certificateUrls.map((url, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[175px] h-[247px] p-4 snap-center bg-gray-100 rounded-md"
            >
              <img
                src={url}
                alt={`Certificate ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Conditionally show arrows */}
        {showArrows && (
          <>
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
            >
              &#10094;
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full"
            >
              &#10095;
            </button>
          </>
        )}
      </div>
    </section>
  );
}
