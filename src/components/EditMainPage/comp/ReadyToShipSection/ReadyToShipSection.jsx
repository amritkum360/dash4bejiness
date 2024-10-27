import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductShowcase() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for saving

  const [featuredProduct, setFeaturedProduct] = useState({
    name: "Hongyan man shoes white men casual trainer sneakers custom men tennis running shoes",
    price: "$0.93 - $1.59",
    minOrder: "Min. Order: 2 pairs",
    easyReturn: "Easy Return",
    orders: "290 orders",
    image: "featured_image.jpg",
    file: null // Store selected file for uploading
  });

  const [additionalProducts, setAdditionalProducts] = useState([
    {
      name: "Hongyan Men's Non-slip Leather Casual Shoes Lightweight Men's Shoes",
      price: "$0.97 - $3.99",
      minOrder: "Min. Order: 2 pairs",
      easyReturn: "Easy Return",
      orders: "158 orders",
      image: "product1.jpg",
      file: null
    },
    {
      name: "Hongyan Men's shoes popcorn new running shoes breathable mesh surface sports casual shoes",
      price: "$1.99 - $2.99",
      minOrder: "Min. Order: 2 pairs",
      easyReturn: "Easy Return",
      orders: "146 orders",
      image: "product2.jpg",
      file: null
    },
    {
      name: "Hongyan New Arrivals Cheap Fashion Women's Casual Shoes Girl Ladies Flat Shoes",
      price: "$0.85 - $1.59",
      minOrder: "Min. Order: 1 pair",
      easyReturn: "Easy Return",
      orders: "82 orders",
      image: "product3.jpg",
      file: null
    }
  ]);

  // Fetch existing data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/product-showcase")
      .then((response) => {
        const { featuredProduct, additionalProducts } = response.data;
        setFeaturedProduct({ ...featuredProduct, file: null });
        setAdditionalProducts(additionalProducts.map(product => ({ ...product, file: null })));
      })
      .catch((error) => {
        console.error("Error fetching product showcase:", error);
      });
  }, []);

  // Toggle edit mode and save data
  const toggleEdit = async () => {
    if (isEditing) {
      setLoading(true); // Show loading state during save

      // Upload images to Cloudinary and get URLs
      const updatedFeaturedProduct = await uploadImageIfChanged(featuredProduct);
      const updatedAdditionalProducts = await Promise.all(
        additionalProducts.map(uploadImageIfChanged)
      );

      // Save the updated data to the backend
      const data = {
        featuredProduct: updatedFeaturedProduct,
        additionalProducts: updatedAdditionalProducts,
      };

      try {
        await axios.post("http://localhost:3001/api/product-showcase", data);
        setFeaturedProduct(updatedFeaturedProduct);
        setAdditionalProducts(updatedAdditionalProducts);
        console.log("Product showcase saved successfully.");
      } catch (error) {
        console.error("Error saving product showcase:", error);
      } finally {
        setLoading(false); // Remove loading state after save
      }
    }

    setIsEditing(!isEditing);
  };

  // Helper function to upload an image to Cloudinary if it has been changed
  const uploadImageIfChanged = async (product) => {
    if (product.file) {
      const formData = new FormData();
      formData.append("image", product.file);

      const response = await axios.post("http://localhost:3001/api/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      return { ...product, image: response.data.imageUrl, file: null }; // Update image URL from Cloudinary
    }
    return product;
  };

  // Function to handle text input changes
  const handleTextChange = (e, productType, index, key) => {
    if (productType === "featured") {
      setFeaturedProduct({ ...featuredProduct, [key]: e.target.value });
    } else {
      const updatedProducts = [...additionalProducts];
      updatedProducts[index][key] = e.target.value;
      setAdditionalProducts(updatedProducts);
    }
  };

  // Function to handle image upload
  const handleImageUpload = (e, productType, index) => {
    const file = e.target.files[0];
    if (productType === "featured") {
      setFeaturedProduct({ ...featuredProduct, file });
    } else {
      const updatedProducts = [...additionalProducts];
      updatedProducts[index].file = file;
      setAdditionalProducts(updatedProducts);
    }
  };

  return (
    <section className="flex flex-col p-8">
      {/* Left Side Menu and Product Grid Wrapper */}
      <div className="flex">
        {/* Left Side Menu */}
        <div className="w-1/5 bg-gray-100 p-6 rounded-md text-center">
          <h2 className="text-orange-500 font-bold text-2xl mb-4">Ready to Ship</h2>
          <button className="bg-white border border-gray-300 py-2 px-4 rounded-full mb-4">View</button>
          <p className="text-gray-500">more</p>
        </div>

        {/* Right Side Product Grid */}
        <div className="w-4/5 grid grid-cols-2 gap-6 ml-6">
          {/* Main Featured Product */}
          <div className="bg-white rounded-md p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300" style={{ height: "600px", width: "100%" }}>
            <img src={featuredProduct.image} alt="Featured Product" className="rounded-md mb-4 w-full h-3/5 object-cover" />
            {isEditing ? (
              <>
                <input type="text" value={featuredProduct.name} onChange={(e) => handleTextChange(e, "featured", null, "name")} className="text-lg font-bold mb-2 bg-gray-100 p-2 w-full" />
                <input type="text" value={featuredProduct.price} onChange={(e) => handleTextChange(e, "featured", null, "price")} className="text-orange-500 text-lg font-bold mb-2 bg-gray-100 p-2 w-full" />
                <input type="text" value={featuredProduct.minOrder} onChange={(e) => handleTextChange(e, "featured", null, "minOrder")} className="text-gray-500 mb-2 bg-gray-100 p-2 w-full" />
                <input type="text" value={featuredProduct.easyReturn} onChange={(e) => handleTextChange(e, "featured", null, "easyReturn")} className="text-gray-500 mb-2 bg-gray-100 p-2 w-full" />
                <input type="text" value={featuredProduct.orders} onChange={(e) => handleTextChange(e, "featured", null, "orders")} className="text-gray-400 mb-2 bg-gray-100 p-2 w-full" />
                <label className="bg-yellow-500 text-black font-bold py-1 px-4 rounded-full cursor-pointer hover:bg-yellow-600">
                  Upload Image
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "featured")} className="hidden" />
                </label>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">{featuredProduct.name}</h3>
                <p className="text-orange-500 text-lg font-bold">{featuredProduct.price}</p>
                <p className="text-gray-500">{featuredProduct.minOrder}</p>
                <p className="text-gray-500">{featuredProduct.easyReturn}</p>
                <p className="text-gray-400 mt-2">{featuredProduct.orders}</p>
                <button className="mt-4 bg-white border border-gray-300 py-2 px-6 rounded-full">Buy Now</button>
              </>
            )}
          </div>

          {/* Column of Additional Products */}
          <div className="flex flex-col space-y-6">
            {additionalProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-md p-4 flex items-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img src={product.image} alt={`Product ${index + 1}`} className="rounded-md mr-4 w-24 h-24 object-cover" />
                {isEditing ? (
                  <div className="w-full">
                    <input type="text" value={product.name} onChange={(e) => handleTextChange(e, "additional", index, "name")} className="text-sm font-bold mb-2 bg-gray-100 p-2 w-full" />
                    <input type="text" value={product.price} onChange={(e) => handleTextChange(e, "additional", index, "price")} className="text-orange-500 text-sm font-bold mb-2 bg-gray-100 p-2 w-full" />
                    <input type="text" value={product.minOrder} onChange={(e) => handleTextChange(e, "additional", index, "minOrder")} className="text-gray-500 text-sm mb-2 bg-gray-100 p-2 w-full" />
                    <input type="text" value={product.easyReturn} onChange={(e) => handleTextChange(e, "additional", index, "easyReturn")} className="text-gray-500 text-sm mb-2 bg-gray-100 p-2 w-full" />
                    <input type="text" value={product.orders} onChange={(e) => handleTextChange(e, "additional", index, "orders")} className="text-gray-400 text-sm mb-2 bg-gray-100 p-2 w-full" />
                    <label className="bg-yellow-500 text-black font-bold py-1 px-4 rounded-full cursor-pointer hover:bg-yellow-600">
                      Upload Image
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "additional", index)} className="hidden" />
                    </label>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-sm font-bold">{product.name}</h3>
                    <p className="text-orange-500 text-sm font-bold">{product.price}</p>
                    <p className="text-gray-500 text-sm">{product.minOrder}</p>
                    <p className="text-gray-500 text-sm">{product.easyReturn}</p>
                    <p className="text-gray-400 text-sm mt-1">{product.orders}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit/Save Button Positioned Below */}
      <div className="flex justify-center mt-8 w-full">
        <button onClick={toggleEdit} className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-600" disabled={loading}>
          {isEditing ? (loading ? "Saving..." : "Save") : "Edit Section"}
        </button>
      </div>
    </section>
  );
}
