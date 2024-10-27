import { useState, useEffect } from "react";
import axios from "axios";

export default function CategorySection() {
  const [heading, setHeading] = useState("PRODUCT CATEGORIES");
  const [subheading, setSubheading] = useState("- CUSTOMER IS GOD -");
  const [productItems, setProductItems] = useState([
    { id: 1, name: "Product Name 1", src: "product1.jpg", file: null },
    { id: 2, name: "Product Name 2", src: "product2.jpg", file: null },
    { id: 3, name: "Product Name 3", src: "product3.jpg", file: null },
    { id: 4, name: "Product Name 4", src: "product4.jpg", file: null },
    { id: 5, name: "Product Name 5", src: "product5.jpg", file: null },
    { id: 6, name: "Product Name 6", src: "product6.jpg", file: null },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch the category section data from the backend
  useEffect(() => {
    axios.get("http://localhost:3001/api/category-section")
      .then((response) => {
        const { heading, subheading, productItems } = response.data;
        setHeading(heading);
        setSubheading(subheading);
        setProductItems(productItems.map((item) => ({ ...item, file: null })));
      })
      .catch((error) => {
        console.error("Error fetching Category Section:", error);
      });
  }, []);

  // Handle file changes for product images
  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    setProductItems(
      productItems.map((item) =>
        item.id === id ? { ...item, file } : item
      )
    );
  };

  // Toggle edit/save mode and handle uploading images to Cloudinary
  const toggleEdit = async () => {
    if (isEditing) {
      setLoading(true);

      // Upload images to Cloudinary and get URLs
      const updatedProductItems = await Promise.all(productItems.map(async (item) => {
        if (item.file) {
          const formData = new FormData();
          formData.append("image", item.file);

          // Upload each image to Cloudinary and get the URL
          const response = await axios.post("http://localhost:3001/api/upload-image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          return { ...item, src: response.data.imageUrl };
        }
        return item;
      }));

      // Save the updated product items and other details to the backend
      const data = { heading, subheading, productItems: updatedProductItems };
      try {
        await axios.post("http://localhost:3001/api/category-section", data);
        console.log("Category Section saved successfully.");
      } catch (error) {
        console.error("Error saving Category Section:", error);
      } finally {
        setLoading(false);
      }
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  return (
    <section>
      <div className="w-full bg-black text-white p-8 text-center border-t-4 border-dashed border-white">
        {isEditing ? (
          <>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="text-5xl font-bold text-black bg-white w-full mb-4"
            />
            <input
              type="text"
              value={subheading}
              onChange={(e) => setSubheading(e.target.value)}
              className="text-xl text-black bg-white w-full"
            />
          </>
        ) : (
          <>
            <h1 className="text-5xl font-bold">{heading}</h1>
            <p className="text-xl mt-2">{subheading}</p>
          </>
        )}
      </div>

      <div className="w-full bg-white p-8">
        <div className="grid grid-cols-3 gap-8">
          {productItems.map((product) => (
            <div key={product.id} className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-md">
                {isEditing ? (
                  <>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, product.id)}
                      className="mb-2"
                    />
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleProductNameChange(e, product.id)}
                      className="bg-black text-white mt-2 p-2 w-full text-center"
                    />
                  </>
                ) : (
                  <>
                    <img src={product.src} alt={product.name} className="h-32 w-32 object-cover mb-2" />
                    <p className="bg-black text-white mt-2 p-2 w-full text-center">{product.name}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={toggleEdit}
          className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-600"
          disabled={loading}
        >
          {isEditing ? (loading ? "Saving..." : "Save") : "Edit Section"}
        </button>
      </div>
    </section>
  );
}
