import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Nav() {
  const [navItems, setNavItems] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Track which item is being edited
  const [tempData, setTempData] = useState({}); // Store temporary text and href for each item by id

  // Fetch the initial navbar items from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/navbar')
      .then((response) => {
        const itemsWithIds = response.data.items.map(item => ({
          ...item,
          frontendId: Date.now() + Math.random(), // Assign a unique ID for frontend purposes
        }));
        setNavItems(itemsWithIds);
      })
      .catch((error) => {
        console.error('Error fetching navbar items:', error);
      });
  }, []);

  // Enable editing mode and initialize tempData for the specific item
  const handleEditClick = (frontendId, text, href) => {
    setIsEditing(frontendId);
    setTempData({ [frontendId]: { text, href } }); // Initialize with the current item’s values
  };

  // Update the temporary text for the item being edited
  const handleTextChange = (e, frontendId) => {
    setTempData((prevTempData) => ({
      ...prevTempData,
      [frontendId]: { ...prevTempData[frontendId], text: e.target.value },
    }));
  };

  // Update the temporary href for the item being edited
  const handleHrefChange = (e, frontendId) => {
    setTempData((prevTempData) => ({
      ...prevTempData,
      [frontendId]: { ...prevTempData[frontendId], href: e.target.value },
    }));
  };

  // Save the edited item’s text and href back to the main navItems state
  const handleSave = (frontendId) => {
    const updatedItems = navItems.map((item) =>
      item.frontendId === frontendId
        ? { ...item, text: tempData[frontendId].text, href: tempData[frontendId].href }
        : item
    );
    setNavItems(updatedItems);
    setIsEditing(null); // Exit edit mode

    // Remove the temporary frontendId before saving to the backend
    const itemsToSave = updatedItems.map(({ frontendId, ...rest }) => rest);

    // Save updated nav items to the backend
    axios
      .post('http://localhost:3001/api/navbar', { items: itemsToSave })
      .then((response) => {
        console.log('Navbar saved:', response.data);
      })
      .catch((error) => {
        console.error('Error saving navbar items:', error);
      });
  };

  // Function to add a new menu item
  const handleAddItem = () => {
    const newItem = { frontendId: Date.now() + Math.random(), text: "New Item", href: "#" };
    const updatedItems = [...navItems, newItem];
    setNavItems(updatedItems);

    // Remove the temporary frontendId before saving to the backend
    const itemsToSave = updatedItems.map(({ frontendId, ...rest }) => rest);

    // Save updated nav items to backend
    axios
      .post('http://localhost:3001/api/navbar', { items: itemsToSave })
      .then((response) => {
        console.log('Navbar updated:', response.data);
      })
      .catch((error) => {
        console.error('Error adding new item:', error);
      });
  };

  return (
    <nav className="w-full bg-yellow-500 text-black py-4">
      <ul className="flex justify-center space-x-8 text-lg font-semibold">
        {navItems.map((item) => (
          <li key={item.frontendId}>
            {isEditing === item.frontendId ? (
              <div className="flex flex-col">
                <input
                  className="text-black border-b-2 border-yellow-700 mb-2"
                  type="text"
                  value={tempData[item.frontendId]?.text || ""}
                  onChange={(e) => handleTextChange(e, item.frontendId)}
                  placeholder="Menu Text"
                />
                <input
                  className="text-black border-b-2 border-yellow-700"
                  type="text"
                  value={tempData[item.frontendId]?.href || ""}
                  onChange={(e) => handleHrefChange(e, item.frontendId)}
                  placeholder="Menu Link"
                />
                <button
                  className="mt-2 px-2 py-1 bg-white text-black font-bold rounded"
                  onClick={() => handleSave(item.frontendId)}
                >
                  Save
                </button>
              </div>
            ) : (
              <a
                href={item.href}
                className="hover:text-white cursor-pointer"
                onClick={() => handleEditClick(item.frontendId, item.text, item.href)}
              >
                {item.text}
              </a>
            )}
          </li>
        ))}
        {/* Add new item button */}
        <li>
          <button
            className="px-4 py-2 bg-white text-black font-bold rounded-full hover:bg-yellow-600"
            onClick={handleAddItem}
          >
            +
          </button>
        </li>
      </ul>
    </nav>
  );
}
