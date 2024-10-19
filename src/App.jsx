import './App.css';
import { useState } from 'react';
import EditMainPage from './components/EditMainPage/EditMainPage';
import MainPage from './components/MainPage/MainPage';

function App() {
  // State to toggle between MainPage and EditMainPage
  const [isEditMode, setIsEditMode] = useState(false);

  // Function to toggle between view and edit mode
  const toggleMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      {/* Show MainPage by default, or EditMainPage if in edit mode */}
      {!isEditMode ? (
        <>
          <MainPage />
          {/* Button to navigate to Edit Mode */}
          <button
            onClick={toggleMode}
            className="absolute top-4 right-4 bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600"
          >
            Navigate to Edit Mode
          </button>
        </>
      ) : (
        <>
          <EditMainPage />
          {/* Button to navigate back to MainPage */}
          <button
            onClick={toggleMode}
            className="absolute top-4 right-4 bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600"
          >
            Navigate to Main Page
          </button>
        </>
      )}
    </>
  );
}

export default App;
