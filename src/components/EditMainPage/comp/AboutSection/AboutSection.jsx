import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AboutSection() {
  const [headerText, setHeaderText] = useState("Welcome to Our Products");
  const [paragraph1, setParagraph1] = useState("Discover our unique range of quality products crafted just for you.");
  const [paragraph2, setParagraph2] = useState("We strive to deliver excellence in everything we do.");
  const [backgroundImage, setBackgroundImage] = useState("bgimage");
  const [productImages, setProductImages] = useState([
    { id: 1, src: "product1", alt: "Product 1", file: null },
    { id: 2, src: "product2", alt: "Product 2", file: null },
    { id: 3, src: "product3", alt: "Product 3", file: null }
  ]);
  const [bgImageFile, setBgImageFile] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/about-section')
      .then((response) => {
        const { headerText, paragraph1, paragraph2, backgroundImage, productImages } = response.data;
        setHeaderText(headerText);
        setParagraph1(paragraph1);
        setParagraph2(paragraph2);
        setBackgroundImage(backgroundImage);
        setProductImages(productImages.map(item => ({ ...item, file: null }))); // Reset file property
      })
      .catch((error) => {
        console.error('Error fetching About Section:', error);
      });
  }, []);

  // Handle file change for background image
  const handleBgImageChange = (e) => setBgImageFile(e.target.files[0]);

  // Handle file change for each product image
  const handleProductImageChange = (e, id) => {
    const file = e.target.files[0];
    setProductImages(
      productImages.map((item) =>
        item.id === id ? { ...item, file } : item
      )
    );
  };

  const toggleEdit = async () => {
    if (isEditing) {
      setLoading(true);

      // Upload background image if changed
      let updatedBackgroundImage = backgroundImage;
      if (bgImageFile) {
        const bgImageData = new FormData();
        bgImageData.append('image', bgImageFile);
        const bgImageResponse = await axios.post('http://localhost:3001/api/upload-image', bgImageData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        updatedBackgroundImage = bgImageResponse.data.imageUrl;
        setBackgroundImage(updatedBackgroundImage);
      }

      // Upload each product image if changed and update `src`
      const updatedProductImages = await Promise.all(
        productImages.map(async (item) => {
          if (item.file) {
            const productImageData = new FormData();
            productImageData.append('image', item.file);
            const productImageResponse = await axios.post('http://localhost:3001/api/upload-image', productImageData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            return { ...item, src: productImageResponse.data.imageUrl };
          }
          return item;
        })
      );

      // Save the updated data to the backend
      const data = {
        headerText,
        paragraph1,
        paragraph2,
        backgroundImage: updatedBackgroundImage,
        productImages: updatedProductImages
      };

      try {
        await axios.post('http://localhost:3001/api/about-section', data);
        setProductImages(updatedProductImages);
        console.log('About Section saved successfully.');
      } catch (error) {
        console.error('Error saving About Section:', error);
      } finally {
        setLoading(false);
      }
    }

    setIsEditing(!isEditing);
  };

  return (
    <section
      className="w-full h-[80vh] bg-cover bg-right flex flex-col justify-center p-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-lg ml-12 mb-8">
        {isEditing ? (
          <input
            type="text"
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
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
            onChange={(e) => setParagraph1(e.target.value)}
            className="text-lg text-black mb-2 bg-white w-full"
          />
        ) : (
          <p className="text-lg text-white mb-2">{paragraph1}</p>
        )}

        {isEditing ? (
          <textarea
            value={paragraph2}
            onChange={(e) => setParagraph2(e.target.value)}
            className="text-lg text-black mb-6 bg-white w-full"
          />
        ) : (
          <p className="text-lg text-white mb-6">{paragraph2}</p>
        )}

        <button className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-600">
          See More
        </button>
      </div>

      <div className="flex justify-center space-x-4">
        {productImages.map((image) => (
          <div key={image.id} className="bg-white p-4 rounded-md">
            <img src={image.src} alt={image.alt} className="h-32 w-32 object-cover" />
            {isEditing && (
              <input
                type="file"
                onChange={(e) => handleProductImageChange(e, image.id)}
                className="mt-2"
              />
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="mt-4">
          <input type="file" onChange={handleBgImageChange} /> {/* File input for background image */}
        </div>
      )}

      <button
        onClick={toggleEdit}
        className="mt-4 px-4 py-2 bg-white text-black font-bold rounded-full hover:bg-yellow-600"
        disabled={loading}
      >
        {isEditing ? (loading ? "Saving..." : "Save") : "Edit Section"}
      </button>
    </section>
  );
}
