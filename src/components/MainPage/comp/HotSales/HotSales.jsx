export default function HotSales() {
    return (
      <section className="w-full bg-white text-black p-8">
        {/* Heading Section with Golden Dashed Border */}
        <div className="text-center mb-8 border-4 border-dashed border-yellow-500 p-4">
          <h1 className="text-5xl font-bold">HOT SALE PRODUCTS</h1>
          <p className="text-xl mt-2">- CUSTOMER IS GOD -</p>
        </div>
  
        {/* Products Grid */}
        <div className="grid grid-cols-4 gap-8">
          {/* Product 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-md">
              <img src="path_to_image_1.jpg" alt="Product 1" className="h-40 w-40 object-cover" />
            </div>
            <p className="bg-black text-white mt-2 p-2 w-full text-center">Product Name 1</p>
          </div>
          {/* Product 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-md">
              <img src="path_to_image_2.jpg" alt="Product 2" className="h-40 w-40 object-cover" />
            </div>
            <p className="bg-black text-white mt-2 p-2 w-full text-center">Product Name 2</p>
          </div>
          {/* Product 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-md">
              <img src="path_to_image_3.jpg" alt="Product 3" className="h-40 w-40 object-cover" />
            </div>
            <p className="bg-black text-white mt-2 p-2 w-full text-center">Product Name 3</p>
          </div>
          {/* Product 4 */}
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-md">
              <img src="path_to_image_4.jpg" alt="Product 4" className="h-40 w-40 object-cover" />
            </div>
            <p className="bg-black text-white mt-2 p-2 w-full text-center">Product Name 4</p>
          </div>
          {/* Optional Product 5 */}
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-md">
              <img src="path_to_image_5.jpg" alt="Product 5" className="h-40 w-40 object-cover" />
            </div>
            <p className="bg-black text-white mt-2 p-2 w-full text-center">Product Name 5</p>
          </div>
        </div>
  
        {/* See More Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-600">
            SEE MORE
          </button>
        </div>
      </section>
    );
  }
  