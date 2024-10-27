import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Header() {
  // Define state to manage the text and editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [headerText, setHeaderText] = useState('Sambhav Bejitech Private Limited');
  const [tempText, setTempText] = useState(headerText);

  // Fetch the initial header text from the backend
  useEffect(() => {
    axios.get('http://localhost:3001/api/header')
      .then((response) => {
        // Set the headerText and tempText to the value from companyHeader
        setHeaderText(response.data.companyHeader);
        setTempText(response.data.companyHeader);
      })
      .catch((error) => {
        console.error('Error fetching header text:', error);
      });
  }, []);

  // Function to handle enabling editing mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Function to handle text change
  const handleTextChange = (e) => {
    setTempText(e.target.value);
  };

  // Function to handle save (send the updated text to the backend)
  const handleSave = () => {
    axios
      .post('http://localhost:3001/api/header', { text: tempText })
      .then((response) => {
        setHeaderText(tempText);
        setIsEditing(false);
        console.log('Header text saved:', response.data);
      })
      .catch((error) => {
        console.error('Error saving header text:', error);
      });
  };

  return (
    <header className="w-full h-[200px] bg-black flex flex-col items-center justify-center">
      {isEditing ? (
        <input
          className="text-black text-3xl md:text-5xl font-bold font-serif border-b-4 border-yellow-500 pb-2"
          type="text"
          value={tempText}
          onChange={handleTextChange}
        />
      ) : (
        <h1
          className="text-white text-3xl md:text-5xl font-bold font-serif border-b-4 border-yellow-500 pb-2 cursor-pointer"
          onClick={handleEditClick}
        >
          {headerText}
        </h1>
      )}
      {isEditing && (
        <button
          className="mt-4 px-4 py-2 bg-yellow-500 text-black font-bold rounded"
          onClick={handleSave}
        >
          Save
        </button>
      )}
    </header>
  );
}
