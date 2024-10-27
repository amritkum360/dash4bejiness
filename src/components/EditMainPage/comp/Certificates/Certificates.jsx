import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Certificates() {
  const [certificateUrls, setCertificateUrls] = useState([
    { id: 1, src: "certificate1.jpg" },
    { id: 2, src: "certificate2.jpg" },
    { id: 3, src: "certificate3.jpg" }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null); // State to track selected certificate for modal view
  const carouselRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/certificates-section")
      .then((response) => {
        const { certificateUrls } = response.data;
        setCertificateUrls(certificateUrls.map((url, index) => ({ id: index + 1, src: url })));
      })
      .catch((error) => {
        console.error("Error fetching Certificates:", error);
      });
  }, []);

  useEffect(() => {
    if (carouselRef.current.scrollWidth > carouselRef.current.clientWidth) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  }, [certificateUrls]);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddCertificate = () => {
    setCertificateUrls([...certificateUrls, { id: certificateUrls.length + 1, src: "", file: null }]);
  };

  const handleImageFileChange = (e, index) => {
    const file = e.target.files[0];
    setCertificateUrls(
      certificateUrls.map((item, i) => (i === index ? { ...item, file } : item))
    );
  };

  const handleRemoveCertificate = (index) => {
    setCertificateUrls(certificateUrls.filter((_, i) => i !== index));
  };

  const toggleEdit = async () => {
    if (isEditing) {
      setLoading(true);
      const updatedCertificateUrls = await Promise.all(
        certificateUrls.map(async (item) => {
          if (item.file) {
            const formData = new FormData();
            formData.append("image", item.file);

            const response = await axios.post("http://localhost:3001/api/upload-image", formData, {
              headers: { "Content-Type": "multipart/form-data" }
            });

            return { id: item.id, src: response.data.imageUrl };
          }
          return item;
        })
      );

      const data = { certificateUrls: updatedCertificateUrls.map(item => item.src) };
      try {
        await axios.post("http://localhost:3001/api/certificates-section", data);
        setCertificateUrls(updatedCertificateUrls);
        console.log("Certificates saved successfully.");
      } catch (error) {
        console.error("Error saving Certificates:", error);
      } finally {
        setLoading(false);
      }
    }

    setIsEditing(!isEditing); // Toggle edit mode
  };

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
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
          {certificateUrls.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[175px] h-[247px] p-4 snap-center bg-gray-100 rounded-md relative"
              onClick={() => openModal(item)}
            >
              <img
                src={item.src}
                alt={`Certificate ${item.id}`}
                className="w-full h-full object-cover rounded-md cursor-pointer"
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    onChange={(e) => handleImageFileChange(e, item.id - 1)}
                    className="w-full p-2 bg-white border border-gray-300 rounded mt-2"
                    placeholder={`Upload Certificate ${item.id}`}
                  />
                  <button
                    onClick={() => handleRemoveCertificate(item.id - 1)}
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
          disabled={loading}
        >
          {isEditing ? (loading ? "Saving..." : "Save") : "Edit Section"}
        </button>
      </div>

      {/* Modal for viewing larger certificate */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg p-4 max-w-xs md:max-w-md w-full h-auto max-h-[800px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white font-bold py-1 px-2 rounded-full hover:bg-red-600"
            >
              &#10005;
            </button>
            <img
              src={selectedCertificate.src}
              alt="Selected Certificate"
              className="w-full h-auto rounded-lg max-w-[400px] max-h-[800px] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
