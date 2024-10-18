export default function AboutSection() {
    return (
      <section
        className="w-full h-[80vh] bg-cover bg-right flex flex-col justify-center p-8"
        style={{ backgroundImage: "url('https://media.istockphoto.com/id/1320815200/photo/wall-black-background-for-design-stone-black-texture-background.jpg?s=612x612&w=0&k=20&c=hqcH1pKLCLn_ZQ5vUPUfi3BOqMWoBzbk5-61Xq7UMsU=')" }}
      >
        {/* Text section on the left */}
        <div className="max-w-lg ml-12 mb-8">
          <h1 className="text-5xl md:text-7xl font-extrabold font-serif mb-4 text-white">
            Welcome to Our Products
          </h1>
          <p className="text-lg text-white mb-2">
            Discover our unique range of quality products crafted just for you.
          </p>
          <p className="text-lg text-white mb-6">
            We strive to deliver excellence in everything we do.
          </p>
          <button className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-full hover:bg-yellow-600">
            See More
          </button>
        </div>
  
        {/* Centered product images */}
        <div className="flex justify-center space-x-4">
          <div className="bg-white p-4 rounded-md">
            <img src="path_to_image_1.jpg" alt="Product 1" className="h-32 w-32 object-cover" />
          </div>
          <div className="bg-white p-4 rounded-md">
            <img src="path_to_image_2.jpg" alt="Product 2" className="h-32 w-32 object-cover" />
          </div>
          <div className="bg-white p-4 rounded-md">
            <img src="path_to_image_3.jpg" alt="Product 3" className="h-32 w-32 object-cover" />
          </div>
        </div>
      </section>
    );
  }
  