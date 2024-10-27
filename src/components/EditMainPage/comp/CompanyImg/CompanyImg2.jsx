import { useState, useEffect } from "react";
import axios from "axios";

export default function CompanyImg() {
  const [images, setImages] = useState([
    { id: 1, src: "image1.jpg", alt: "Image 1", file: null },
    { id: 2, src: "image2.jpg", alt: "Image 2", file: null },
    { id: 3, src: "image3.jpg", alt: "Image 3", file: null }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // To handle modal view

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/company-img-section")
      .then((response) => {
        const { images } = response.data;
        setImages(images.map(image => ({ ...image, file: null })));
      })
      .catch((error) => {
        console.error("Error fetching Company Images:", error);
      });
  }, []);

  const handleImageFileChange = (e, id) => {
    const file = e.target.files[0];
    setImages(
      images.map((image) => 
        image.id === id ? { ...image, file } : image
      )
    );
  };

  const toggleEdit = async () => {
    if (isEditing) {
      setLoading(true);

      const updatedImages = await Promise.all(
        images.map(async (image) => {
          if (image.file) {
            const formData = new FormData();
            formData.append("image", image.file);

            const response = await axios.post("http://localhost:3001/api/upload-image", formData, {
              headers: { "Content-Type": "multipart/form-data" }
            });

            return { ...image, src: response.data.imageUrl };
          }
          return image;
        })
      );

      const data = { images: updatedImages };
      try {
        await axios.post("http://localhost:3001/api/company-img-section", data);
        console.log("Company Images saved successfully.");
        setImages(updatedImages);
      } catch (error) {
        console.error("Error saving Company Images:", error);
      } finally {
        setLoading(false);
      }
    }

    setIsEditing(!isEditing);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="w-full bg-orange-500 p-4 sm:p-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="bg-white p-4 rounded-md">
            <img
              src={image.src}
              alt={image.alt}
              className="h-32 sm:h-48 w-full object-cover cursor-pointer"
              onClick={() => openModal(image)}
            />
            {isEditing && (
              <input
                type="file"
                onChange={(e) => handleImageFileChange(e, image.id)}
                className="mt-2"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={toggleEdit}
          className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-600"
          disabled={loading}
        >
          {isEditing ? (loading ? "Saving..." : "Save") : "Edit Section"}
        </button>
      </div>

      {/* Modal for viewing larger image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg p-4 max-w-xs md:max-w-md w-full max-h-[800px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-red-500 text-white font-bold py-1 px-2 rounded-full hover:bg-red-600"
            >
              &#10005;
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg max-w-[400px] max-h-[800px] object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
