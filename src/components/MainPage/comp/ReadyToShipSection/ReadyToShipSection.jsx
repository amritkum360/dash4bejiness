export default function ProductShowcase() {
    return (
      <section className="flex p-8">
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
            <img
              src="path_to_featured_image.jpg"
              alt="Featured Product"
              className="rounded-md mb-4 w-full h-3/5 object-cover"
            />
            <h3 className="text-lg font-bold mb-2">
              Hongyan man shoes white men casual trainer sneakers custom men tennis running shoes
            </h3>
            <p className="text-orange-500 text-lg font-bold">$0.93 - $1.59</p>
            <p className="text-gray-500">Min. Order: 2 pairs</p>
            <p className="text-gray-500">Easy Return</p>
            <p className="text-gray-400 mt-2">290 orders</p>
            <button className="mt-4 bg-white border border-gray-300 py-2 px-6 rounded-full">
              Buy Now
            </button>
          </div>
  
          {/* Column of Additional Products */}
          <div className="flex flex-col space-y-6">
            {/* Product 1 */}
            <div className="bg-white rounded-md p-4 flex items-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src="path_to_image_1.jpg"
                alt="Product 1"
                className="rounded-md mr-4 w-24 h-24 object-cover"
              />
              <div>
                <h3 className="text-sm font-bold">
                  Hongyan Men's Non-slip Leather Casual Shoes Lightweight Men's Shoes
                </h3>
                <p className="text-orange-500 text-sm font-bold">$0.97 - $3.99</p>
                <p className="text-gray-500 text-sm">Min. Order: 2 pairs</p>
                <p className="text-gray-500 text-sm">Easy Return</p>
                <p className="text-gray-400 text-sm mt-1">158 orders</p>
              </div>
            </div>
  
            {/* Product 2 */}
            <div className="bg-white rounded-md p-4 flex items-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src="path_to_image_2.jpg"
                alt="Product 2"
                className="rounded-md mr-4 w-24 h-24 object-cover"
              />
              <div>
                <h3 className="text-sm font-bold">
                  Hongyan Men's shoes popcorn new running shoes breathable mesh surface sports casual shoes
                </h3>
                <p className="text-orange-500 text-sm font-bold">$1.99 - $2.99</p>
                <p className="text-gray-500 text-sm">Min. Order: 2 pairs</p>
                <p className="text-gray-500 text-sm">Easy Return</p>
                <p className="text-gray-400 text-sm mt-1">146 orders</p>
              </div>
            </div>
  
            {/* Product 3 */}
            <div className="bg-white rounded-md p-4 flex items-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img
                src="path_to_image_3.jpg"
                alt="Product 3"
                className="rounded-md mr-4 w-24 h-24 object-cover"
              />
              <div>
                <h3 className="text-sm font-bold">
                  Hongyan New Arrivals Cheap Fashion Women's Casual Shoes Girl Ladies Flat Shoes
                </h3>
                <p className="text-orange-500 text-sm font-bold">$0.85 - $1.59</p>
                <p className="text-gray-500 text-sm">Min. Order: 1 pair</p>
                <p className="text-gray-500 text-sm">Easy Return</p>
                <p className="text-gray-400 text-sm mt-1">82 orders</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  