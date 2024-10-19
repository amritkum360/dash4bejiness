import { useState } from "react";

export default function CompanyImg() {
  // States for holding image sources
  const [images, setImages] = useState([
    { id: 1, src: "path_to_image_1.jpg", alt: "Image 1" },
    { id: 2, src: "path_to_image_2.jpg", alt: "Image 2" },
    { id: 3, src: "path_to_image_3.jpg", alt: "Image 3" }
  ]);

  const [isEditing, setIsEditing] = useState(false);

  // Function to handle image uploads
  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    const newSrc = URL.createObjectURL(file); // Convert the uploaded file to a URL
    setImages(images.map(image => (image.id === id ? { ...image, src: newSrc } : image)));
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section className="w-full bg-orange-500 p-8">
      {/* Image Holders */}
      <div className="grid grid-cols-3 gap-8">
        {images.map(image => (
          <div key={image.id} className="bg-white p-4 rounded-md">
            <img
              src={image.src}
              alt={image.alt}
              className="h-48 w-full object-cover mb-2"
            />
            {isEditing && (
              <label className="bg-yellow-500 text-black font-bold py-1 px-4 rounded-full cursor-pointer hover:bg-yellow-600">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, image.id)}
                  className="hidden"
                />
              </label>
            )}
          </div>
        ))}
      </div>

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
