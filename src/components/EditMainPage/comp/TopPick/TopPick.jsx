import { useState } from "react";

export default function TopPick() {
  const initialProducts = [
    {
      img: "path_to_image_1.jpg",
      title: "Breathable · Light Weight · Pvc",
      description: "Hongyan Comfortable lightweight SHOE MAN sneakers Breathable...",
      price: "$1.33 - $3.00",
      minOrder: "Min. Order: 2 pairs",
      easyReturn: "Easy Return",
      orders: "62 orders",
    },
    {
      img: "path_to_image_2.jpg",
      title: "Hongyan Men's shoes Summer breathable mesh shoes Men's...",
      description: "Hongyan Comfortable lightweight SHOE MAN sneakers Breathable...",
      price: "$0.92 - $1.59",
      minOrder: "Min. Order: 2 pairs",
      easyReturn: "Easy Return",
      orders: "143 orders",
    },
    {
      img: "path_to_image_3.jpg",
      title: "Hongyan Mesh men's shoes breathable men's casual running...",
      description: "Hongyan Comfortable lightweight SHOE MAN sneakers Breathable...",
      price: "$1.99 - $2.99",
      minOrder: "Min. Order: 2 pairs",
      easyReturn: "Easy Return",
      orders: "219 orders",
    },
    {
      img: "path_to_image_4.jpg",
      title: "Hongyan Men's shoes popcorn new running shoes breathable...",
      description: "Hongyan Comfortable lightweight SHOE MAN sneakers Breathable...",
      price: "$1.99 - $2.99",
      minOrder: "Min. Order: 2 pairs",
      easyReturn: "Easy Return",
      orders: "169 orders",
    },
    {
      img: "path_to_image_5.jpg",
      title: "Hongyan man shoes white men casual trainer sneakers custom...",
      description: "Hongyan Comfortable lightweight SHOE MAN sneakers Breathable...",
      price: "$0.93 - $1.59",
      minOrder: "Min. Order: 2 pairs",
      easyReturn: "Easy Return",
      orders: "290 orders",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [isEditing, setIsEditing] = useState(false);

  // Function to toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Function to handle input changes for product fields
  const handleTextChange = (e, index, field) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = e.target.value;
    setProducts(updatedProducts);
  };

  // Function to handle image uploads
  const handleImageUpload = (e, index) => {
    const file = e.target.files[0];
    const newImageSrc = URL.createObjectURL(file); // Convert file to URL for preview
    const updatedProducts = [...products];
    updatedProducts[index].img = newImageSrc;
    setProducts(updatedProducts);
  };

  return (
    <section className="relative p-8">
      {/* Background container */}
      <div className="absolute inset-0 bg-black h-40  rounded-t-lg"></div>

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Top picks</h2>
          <a href="#" className="text-gray-300 hover:text-white">
            View more &rarr;
          </a>
        </div>

        {/* Product Cards */}
        <div className="flex space-x-4 overflow-x-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-lg shadow-lg p-4 w-64 relative"
            >
              <img
                src={product.img}
                alt={product.title}
                className="rounded-md mb-4 w-full h-40 object-cover"
              />
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
                  <label className="bg-yellow-500 text-black font-bold py-1 px-4 rounded-full cursor-pointer hover:bg-yellow-600">
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
          >
            {isEditing ? "Save" : "Edit Section"}
          </button>
        </div>
      </div>
    </section>
  );
}
