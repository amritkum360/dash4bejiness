export default function CompanyImg() {
    return (
      <section className="w-full bg-orange-500 p-8">
        {/* Image Holders */}
        <div className="grid grid-cols-3 gap-8">
          {/* Image Holder 1 */}
          <div className="bg-white p-4 rounded-md">
            <img src="path_to_image_1.jpg" alt="Image 1" className="h-48 w-full object-cover" />
          </div>
          {/* Image Holder 2 */}
          <div className="bg-white p-4 rounded-md">
            <img src="path_to_image_2.jpg" alt="Image 2" className="h-48 w-full object-cover" />
          </div>
          {/* Image Holder 3 */}
          <div className="bg-white p-4 rounded-md">
            <img src="path_to_image_3.jpg" alt="Image 3" className="h-48 w-full object-cover" />
          </div>
        </div>
      </section>
    );
  }
  