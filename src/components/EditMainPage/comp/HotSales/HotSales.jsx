import { useState, useEffect } from "react";
import axios from "axios";

export default function HotSales() {
  const [heading, setHeading] = useState("HOT SALE PRODUCTS");
  const [subheading, setSubheading] = useState("- CUSTOMER IS GOD -");
  const [productItems, setProductItems] = useState([
    { id: 1, name: "Product Name 1", src: "product1.jpg", file: null },
    { id: 2, name: "Product Name 2", src: "product2.jpg", file: null },
    { id: 3, name: "Product Name 3", src: "product3.jpg", file: null },
    { id: 4, name: "Product Name 4", src: "product4.jpg", file: null },
    { id: 5, name: "Product Name 5", src: "product5.jpg", file: null }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/hot-sales-section")
      .then((response) => {
        const { heading, subheading, productItems } = response.data;
        setHeading(heading);
        setSubheading(subheading);
        setProductItems(productItems.map(item => ({ ...item, file: null })));
      })
      .catch((error) => {
        console.error("Error fetching Hot Sales Section:", error);
      });
  }, []);

  const handleTextChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    setProductItems(
      productItems.map((item) =>
        item.id === id ? { ...item, file } : item
      )
    );
  };

  const handleProductNameChange = (e, id) => {
    const newName = e.target.value;
    setProductItems(
      productItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const toggleEdit = async () => {
    if (isEditing) {
      setLoading(true);

      const updatedProductItems = await Promise.all(
        productItems.map(async (item) => {
          if (item.file) {
            const formData = new FormData();
            formData.append("image", item.file);

            const response = await axios.post("http://localhost:3001/api/upload-image", formData, {
              headers: { "Content-Type": "multipart/form-data" }
            });

            return { ...item, src: response.data.imageUrl };
          }
          return item;
        })
      );

      const data = { heading, subheading, productItems: updatedProductItems };
      try {
        await axios.post("http://localhost:3001/api/hot-sales-section", data);
        console.log("Hot Sales Section saved successfully.");
      } catch (error) {
        console.error("Error saving Hot Sales Section:", error);
      } finally {
        setLoading(false);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <section className="w-full bg-white text-black p-4 sm:p-8">
      {/* Heading Section */}
      <div className="text-center mb-8 border-4 border-dashed border-yellow-500 p-4">
        {isEditing ? (
          <>
            <input
              type="text"
              value={heading}
              onChange={(e) => handleTextChange(e, setHeading)}
              className="text-3xl sm:text-5xl font-bold text-black bg-white w-full mb-4"
            />
            <input
              type="text"
              value={subheading}
              onChange={(e) => handleTextChange(e, setSubheading)}
              className="text-lg sm:text-xl text-black bg-white w-full"
            />
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-5xl font-bold">{heading}</h1>
            <p className="text-lg sm:text-xl mt-2">{subheading}</p>
          </>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
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
                  <img src={product.src} alt={product.name} className="h-32 sm:h-40 w-full object-cover mb-2" />
                  <p className="bg-black text-white mt-2 p-2 w-full text-center">{product.name}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* See More Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-600">
          SEE MORE
        </button>
      </div>

      {/* Edit/Save Button */}
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
