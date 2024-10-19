import { useState, useRef, useEffect } from "react";

export default function Certificates() {
  // State to manage the certificate URLs and edit mode
  const [certificateUrls, setCertificateUrls] = useState([
    "url_to_certificate_1.jpg",
    "url_to_certificate_2.jpg",
    "url_to_certificate_3.jpg",
  ]);
  
  const [isEditing, setIsEditing] = useState(false);
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

  // Function to handle adding a new certificate
  const handleAddCertificate = () => {
    setCertificateUrls([...certificateUrls, ""]);
  };

  // Function to handle certificate image upload
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const newSrc = URL.createObjectURL(file); // Convert file to URL for preview
    setCertificateUrls(certificateUrls.map((url, i) => (i === index ? newSrc : url)));
  };

  // Function to handle removing a certificate
  const handleRemoveCertificate = (index) => {
    setCertificateUrls(certificateUrls.filter((_, i) => i !== index));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
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
              className="flex-shrink-0 w-[175px] h-[247px] p-4 snap-center bg-gray-100 rounded-md relative"
            >
              <img
                src={url}
                alt={`Certificate ${index + 1}`}
                className="w-full h-full object-cover rounded-md"
              />
              {isEditing && (
                <>
                  <label className="absolute top-2 left-2 bg-yellow-500 text-black font-bold py-1 px-2 rounded-full cursor-pointer hover:bg-yellow-600">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={() => handleRemoveCertificate(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white font-bold py-1 px-2 rounded-full hover:bg-red-600"
                  >
                    &#10005;
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Conditionally show arrows */}
        {showArrows && !isEditing && (
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

      {isEditing && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddCertificate}
            className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600"
          >
            Add Certificate
          </button>
        </div>
      )}

      {/* Edit/Save Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={toggleEdit}
          className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-600"
        >
          {isEditing ? "Save" : "Edit Section"}
        </button>
      </div>
    </section>
  );
}
