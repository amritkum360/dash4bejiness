import { useState, useEffect } from "react";
import axios from "axios";

export default function TopPick() {
  const initialProducts = [
    {
      img: "image1.jpg",
      title: "Breathable · Light Weight · Pvc",
      description: "Hongyan Comfortable lightweight SHOE MAN sneakers Breathable...",
      price: "$1.33 - $3.00",
      minOrder: "Min. Order: 2 pairs",
      easyReturn: "Easy Return",
      orders: "62 orders",
      file: null,
    },
    // Add other initial products as needed...
  ];

  const [products, setProducts] = useState(initialProducts);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/toppick")
      .then((response) => {
        const { products } = response.data;
        setProducts(products.map(product => ({ ...product, file: null })));
      })
      .catch((error) => {
        console.error("Error fetching top picks:", error);
      });
  }, []);

  const toggleEdit = async () => {
    if (isEditing) {
      setLoading(true);

      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          if (product.file) {
            const formData = new FormData();
            formData.append("image", product.file);

            const response = await axios.post("http://localhost:3001/api/upload-image", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            return { ...product, img: response.data.imageUrl, file: null };
          }
          return product;
        })
      );

      const data = { products: updatedProducts };
      try {
        await axios.post("http://localhost:3001/api/toppick", data);
        setProducts(updatedProducts);
        console.log("Top picks saved successfully.");
      } catch (error) {
        console.error("Error saving top picks:", error);
      } finally {
        setLoading(false);
      }
    }

    setIsEditing(!isEditing);
  };

  const handleTextChange = (e, index, field) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = e.target.value;
    setProducts(updatedProducts);
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const updatedProducts = [...products];
    updatedProducts[index].file = file;
    setProducts(updatedProducts);
  };

  return (
    <section className="relative p-4 sm:p-8">
      {/* Background container */}
      <div className="absolute inset-0 bg-black h-20 sm:h-40 rounded-t-lg"></div>

      {/* Content */}
      <div className="relative">
        {/* Header with "Ready to Ship" and "View More" button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-0">
            Ready to Ship
          </h2>
          <a
            href="#"
            className="text-sm sm:text-base text-gray-300 hover:text-white"
          >
            View more &rarr;
          </a>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div key={index} className="bg-white text-black rounded-lg shadow-lg p-4 flex flex-col">
              <img src={product.img} alt={product.title} className="rounded-md mb-4 w-full h-32 sm:h-40 object-cover" />
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={product.title}
                    onChange={(e) => handleTextChange(e, index, "title")}
                    className="text-sm font-bold mb-2 bg-gray-100 p-2 w-full"
                  />
                  <input
                    type="text"
                    value={product.description}
                    onChange={(e) => handleTextChange(e, index, "description")}
                    className="text-sm text-gray-600 mb-2 bg-gray-100 p-2 w-full"
                  />
                  <input
                    type="text"
                    value={product.price}
                    onChange={(e) => handleTextChange(e, index, "price")}
                    className="text-orange-500 font-bold mb-2 bg-gray-100 p-2 w-full"
                  />
                  <input
                    type="text"
                    value={product.minOrder}
                    onChange={(e) => handleTextChange(e, index, "minOrder")}
                    className="text-gray-600 text-sm mb-2 bg-gray-100 p-2 w-full"
                  />
                  <input
                    type="text"
                    value={product.easyReturn}
                    onChange={(e) => handleTextChange(e, index, "easyReturn")}
                    className="text-gray-600 text-sm mb-2 bg-gray-100 p-2 w-full"
                  />
                  <input
                    type="text"
                    value={product.orders}
                    onChange={(e) => handleTextChange(e, index, "orders")}
                    className="text-gray-400 text-sm mb-2 bg-gray-100 p-2 w-full"
                  />
                  <label className="bg-yellow-500 text-black font-bold py-1 px-4 rounded-full cursor-pointer hover:bg-yellow-600 mt-2">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      className="hidden"
                    />
                  </label>
                </>
              ) : (
                <>
                  <h3 className="text-sm font-bold mb-2">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <p className="text-orange-500 font-bold">{product.price}</p>
                  <p className="text-gray-600 text-sm">{product.minOrder}</p>
                  <p className="text-gray-600 text-sm">{product.easyReturn}</p>
                  <p className="text-gray-400 text-sm mt-1">{product.orders}</p>
                </>
              )}
            </div>
          ))}
        </div>

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
      </div>
    </section>
  );
}
