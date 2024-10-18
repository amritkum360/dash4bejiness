export default function CategorySection() {
    return (
      <section>
        {/* Heading and Subheading Section with Black Background and Dashed Border */}
        <div className="w-full bg-black text-white p-8 text-center border-t-4 border-dashed border-white">
          <h1 className="text-5xl font-bold">PRODUCT CATEGORIES</h1>
          <p className="text-xl mt-2">- CUSTOMER IS GOD -</p>
        </div>
  
        {/* Products Grid Section with White Background */}
        <div className="w-full bg-white p-8">
          <div className="grid grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-md">
                <img src="path_to_image_1.jpg" alt="Product 1" className="h-32 w-32 object-cover" />
              </div>
              <p className="bg-black text-white mt-2 p-2 w-full text-center">Product Name 1</p>
            </div>
            {/* Product 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-md">
                <img src="path_to_image_2.jpg" alt="Product 2" className="h-32 w-32 object-cover" />
              </div>
              <p className="bg-black text-white mt-2 p-2 w-full text-center">Product Name 2</p>
            </div>
            {/* Product 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-md">
                <img src="path_to_image_3.jpg" alt="Product 3" className="h-32 w-32 object-cover" />
              </div>
              <p className="bg-black text-white mt-2 p-2 w-full text-center">Product Name 3</p>
            </div>
            {/* Product 4 */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-md">
                <img src="path_to_image_4.jpg" alt="Product 4" className="h-32 w-32 object-cover" />
              </div>
              <p className="bg-black text-white mt-2 p-2 w-full text-center">Product Name 4</p>
            </div>
            {/* Product 5 */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-md">
                <img src="path_to_image_5.jpg" alt="Product 5" className="h-32 w-32 object-cover" />
              </div>
              <p className="bg-black text-white mt-2 p-2 w-full text-center">Product Name 5</p>
            </div>
            {/* Product 6 */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-md">
                <img src="path_to_image_6.jpg" alt="Product 6" className="h-32 w-32 object-cover" />
              </div>
              <p className="bg-black text-white mt-2 p-2 w-full text-center">Product Name 6</p>
            </div>
          </div>
  
          {/* More Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-600">
              More
            </button>
          </div>
        </div>
      </section>
    );
  }
  