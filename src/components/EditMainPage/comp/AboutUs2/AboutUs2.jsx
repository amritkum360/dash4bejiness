import { useState, useEffect } from "react";
import axios from "axios";

export default function AboutUs2() {
  // States for heading and description paragraphs
  const [heading, setHeading] = useState("About Us");
  const [paragraph1, setParagraph1] = useState(
    "We are a company dedicated to providing the best products and services to our customers, ensuring quality, innovation, and excellence in everything we do."
  );
  const [paragraph2, setParagraph2] = useState(
    "At the core of our values lies integrity, transparency, and a focus on continuous improvement. Our team of professionals works tirelessly to stay ahead of industry trends."
  );
  const [paragraph3, setParagraph3] = useState(
    "We believe in creating long-lasting relationships with our customers and partners, and we aim to exceed expectations in every interaction."
  );

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for saving

  // Fetch existing About Us data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/about-us-section")
      .then((response) => {
        const { heading, paragraph1, paragraph2, paragraph3 } = response.data;
        setHeading(heading);
        setParagraph1(paragraph1);
        setParagraph2(paragraph2);
        setParagraph3(paragraph3);
      })
      .catch((error) => {
        console.error("Error fetching About Us Section:", error);
      });
  }, []);

  // Function to handle text changes (heading and paragraphs)
  const handleTextChange = (e, setter) => {
    setter(e.target.value);
  };

  // Toggle edit mode and save data
  const toggleEdit = async () => {
    if (isEditing) {
      setLoading(true); // Show loading state during save

      // Save the edited data
      const data = {
        heading,
        paragraph1,
        paragraph2,
        paragraph3,
      };

      try {
        const response = await axios.post("http://localhost:3001/api/about-us-section", data);
        console.log("Save response:", response.data); // Log response for debugging
      } catch (error) {
        console.error("Error saving About Us Section:", error); // Log error
      } finally {
        setLoading(false); // Remove loading state after save
      }
    }

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
          disabled={loading}
        >
          {isEditing ? (loading ? "Saving..." : "Save") : "Edit Section"}
        </button>
      </div>
    </section>
  );
}
