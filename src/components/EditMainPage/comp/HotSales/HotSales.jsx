import { useState } from "react";

export default function HotSales() {
  // States for heading, subheading, and product items
  const [heading, setHeading] = useState("HOT SALE PRODUCTS");
  const [subheading, setSubheading] = useState("- CUSTOMER IS GOD -");

  const [productItems, setProductItems] = useState([
    { id: 1, name: "Product Name 1", src: "path_to_image_1.jpg" },
    { id: 2, name: "Product Name 2", src: "path_to_image_2.jpg" },
    { id: 3, name: "Product Name 3", src: "path_to_image_3.jpg" },
    { id: 4, name: "Product Name 4", src: "path_to_image_4.jpg" },
    { id: 5, name: "Product Name 5", src: "path_to_image_5.jpg" }
  ]);

  const [isEditing, setIsEditing] = useState(false);

  // Functions to handle text changes
  const handleTextChange = (e, setter) => {
    setter(e.target.value);
  };

  // Function to handle product image upload
  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    const newSrc = URL.createObjectURL(file); // Convert image file to URL
    setProductItems(
      productItems.map(item => (item.id === id ? { ...item, src: newSrc } : item))
    );
  };

  // Function to handle product name change
  const handleProductNameChange = (e, id) => {
    const newName = e.target.value;
    setProductItems(
      productItems.map(item => (item.id === id ? { ...item, name: newName } : item))
    );
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section className="w-full bg-white text-black p-8">
      {/* Heading Section */}
      <div className="text-center mb-8 border-4 border-dashed border-yellow-500 p-4">
        {isEditing ? (
          <>
            <input
              type="text"
              value={heading}
              onChange={(e) => handleTextChange(e, setHeading)}
              className="text-5xl font-bold text-black bg-white w-full mb-4"
            />
            <input
              type="text"
              value={subheading}
              onChange={(e) => handleTextChange(e, setSubheading)}
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

      {/* Products Grid */}
      <div className="grid grid-cols-4 gap-8">
        {productItems.map((product) => (
          <div key={product.id} className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-md">
              <img
                src={product.src}
                alt={product.name}
                className="h-40 w-40 object-cover mb-2"
              />
              {isEditing && (
                <label className="bg-yellow-500 text-black font-bold py-1 px-4 rounded-full cursor-pointer hover:bg-yellow-600">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, product.id)}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            {isEditing ? (
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleProductNameChange(e, product.id)}
                className="bg-black text-white mt-2 p-2 w-full text-center"
              />
            ) : (
              <p className="bg-black text-white mt-2 p-2 w-full text-center">
                {product.name}
              </p>
            )}
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
        >
          {isEditing ? "Save" : "Edit Section"}
        </button>
      </div>
    </section>
  );
}
