import { useState } from "react";

export default function AboutUs2() {
  // States for heading and description paragraphs
  const [heading, setHeading] = useState("About Us");
  const [paragraph1, setParagraph1] = useState(
    "We are a company dedicated to providing the best products and services to our customers, ensuring quality, innovation, and excellence in everything we do. Our journey began with a vision to bring unique solutions to the market, and over the years, we have grown into a trusted brand with a commitment to customer satisfaction."
  );
  const [paragraph2, setParagraph2] = useState(
    "At the core of our values lies integrity, transparency, and a focus on continuous improvement. Our team of professionals works tirelessly to stay ahead of industry trends, embracing new technologies and practices that enhance the value we deliver to our clients."
  );
  const [paragraph3, setParagraph3] = useState(
    "We believe in creating long-lasting relationships with our customers and partners, and we aim to exceed expectations in every interaction. From product design to after-sales support, we take pride in our attention to detail and dedication to quality. Together, we are shaping the future, one innovative step at a time."
  );

  const [isEditing, setIsEditing] = useState(false);

  // Functions to handle text changes
  const handleTextChange = (e, setter) => {
    setter(e.target.value);
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section className="w-full bg-black text-white p-8">
      {/* Header */}
      <div className="text-center mb-8">
        {isEditing ? (
          <input
            type="text"
            value={heading}
            onChange={(e) => handleTextChange(e, setHeading)}
            className="text-5xl font-bold text-black bg-white w-full text-center mb-4"
          />
        ) : (
          <h1 className="text-5xl font-bold">{heading}</h1>
        )}
      </div>

      {/* About Us Description */}
      <div className="max-w-4xl mx-auto">
        {isEditing ? (
          <>
            <textarea
              value={paragraph1}
              onChange={(e) => handleTextChange(e, setParagraph1)}
              className="text-lg leading-relaxed text-black bg-white w-full mb-4 p-2"
            />
            <textarea
              value={paragraph2}
              onChange={(e) => handleTextChange(e, setParagraph2)}
              className="text-lg leading-relaxed text-black bg-white w-full mb-4 p-2"
            />
            <textarea
              value={paragraph3}
              onChange={(e) => handleTextChange(e, setParagraph3)}
              className="text-lg leading-relaxed text-black bg-white w-full p-2"
            />
          </>
        ) : (
          <>
            <p className="text-lg leading-relaxed">{paragraph1}</p>
            <p className="text-lg leading-relaxed mt-4">{paragraph2}</p>
            <p className="text-lg leading-relaxed mt-4">{paragraph3}</p>
          </>
        )}
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
    </section>
  );
}
