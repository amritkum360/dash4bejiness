import { useState } from "react";

export default function AboutSection() {
  // States to manage the editable content
  const [headerText, setHeaderText] = useState("Welcome to Our Products");
  const [paragraph1, setParagraph1] = useState("Discover our unique range of quality products crafted just for you.");
  const [paragraph2, setParagraph2] = useState("We strive to deliver excellence in everything we do.");
  const [backgroundImage, setBackgroundImage] = useState(
    "https://media.istockphoto.com/id/1320815200/photo/wall-black-background-for-design-stone-black-texture-background.jpg?s=612x612&w=0&k=20&c=hqcH1pKLCLn_ZQ5vUPUfi3BOqMWoBzbk5-61Xq7UMsU="
  );
  const [productImages, setProductImages] = useState([
    { id: 1, src: "path_to_image_1.jpg", alt: "Product 1" },
    { id: 2, src: "path_to_image_2.jpg", alt: "Product 2" },
    { id: 3, src: "path_to_image_3.jpg", alt: "Product 3" }
  ]);

  const [isEditing, setIsEditing] = useState(false);

  // Functions to handle text changes
  const handleTextChange = (e, setter) => {
    setter(e.target.value);
  };

  // Function to handle image upload
  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    const newSrc = URL.createObjectURL(file); // Convert image file to URL
    setProductImages(
      productImages.map(image => (image.id === id ? { ...image, src: newSrc } : image))
    );
  };

  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    const newBackground = URL.createObjectURL(file); // Convert image file to URL
    setBackgroundImage(newBackground);
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section
      className="w-full h-[80vh] bg-cover bg-right flex flex-col justify-center p-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Text section on the left */}
      <div className="max-w-lg ml-12 mb-8">
        {isEditing ? (
          <input
            type="text"
            value={headerText}
            onChange={(e) => handleTextChange(e, setHeaderText)}
            className="text-5xl md:text-7xl font-extrabold font-serif mb-4 text-black bg-white"
          />
        ) : (
          <h1 className="text-5xl md:text-7xl font-extrabold font-serif mb-4 text-white">
            {headerText}
          </h1>
        )}

        {isEditing ? (
          <textarea
            value={paragraph1}
            onChange={(e) => handleTextChange(e, setParagraph1)}
            className="text-lg text-black mb-2 bg-white w-full"
          />
        ) : (
          <p className="text-lg text-white mb-2">{paragraph1}</p>
        )}

        {isEditing ? (
          <textarea
            value={paragraph2}
            onChange={(e) => handleTextChange(e, setParagraph2)}
            className="text-lg text-black mb-6 bg-white w-full"
          />
        ) : (
          <p className="text-lg text-white mb-6">{paragraph2}</p>
        )}

        <button className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-600">
          See More
        </button>
      </div>

      {/* Centered product images */}
      <div className="flex justify-center space-x-4">
        {productImages.map((image) => (
          <div key={image.id} className="bg-white p-4 rounded-md">
            {isEditing ? (
              <div className="flex flex-col items-center">
                <img src={image.src} alt={image.alt} className="h-32 w-32 object-cover mb-2" />
                <label className="bg-yellow-500 text-black font-bold py-1 px-4 rounded-full cursor-pointer hover:bg-yellow-600">
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, image.id)}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <img src={image.src} alt={image.alt} className="h-32 w-32 object-cover" />
            )}
          </div>
        ))}
      </div>

      {/* Background image upload */}
      {isEditing && (
        <div className="mt-4 flex flex-col items-center">
          <label className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-full cursor-pointer hover:bg-yellow-600">
            Upload Background Image
            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      <button
        onClick={toggleEdit}
        className="mt-4 px-4 py-2 bg-white text-black font-bold rounded-full hover:bg-yellow-600"
      >
        {isEditing ? "Save" : "Edit Section"}
      </button>
    </section>
  );
}
