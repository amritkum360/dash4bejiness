import { useState } from "react";

export default function Nav() {
  // State to manage navigation items and editing mode
  const [navItems, setNavItems] = useState([
    { id: 1, text: "Home", href: "#home" },
    { id: 2, text: "Products", href: "#products" },
    { id: 3, text: "Profile", href: "#profile" },
    { id: 4, text: "Contacts", href: "#contacts" }
  ]);

  const [isEditing, setIsEditing] = useState(null); // Track which item is being edited
  const [tempText, setTempText] = useState(""); // Temporary text for editing
  const [tempHref, setTempHref] = useState(""); // Temporary href for editing

  // Function to handle enabling editing mode for a specific item
  const handleEditClick = (id, text, href) => {
    setIsEditing(id);
    setTempText(text);
    setTempHref(href);
  };

  // Function to handle text change
  const handleTextChange = (e) => {
    setTempText(e.target.value);
  };

  // Function to handle href change
  const handleHrefChange = (e) => {
    setTempHref(e.target.value);
  };

  // Function to handle save
  const handleSave = (id) => {
    setNavItems(navItems.map(item =>
      item.id === id ? { ...item, text: tempText, href: tempHref } : item
    ));
    setIsEditing(null);
  };

  // Function to add a new menu item
  const handleAddItem = () => {
    const newItem = { id: navItems.length + 1, text: "New Item", href: "#" };
    setNavItems([...navItems, newItem]);
  };

  return (
    <nav className="w-full bg-yellow-500 text-black py-4">
      <ul className="flex justify-center space-x-8 text-lg font-semibold">
        {navItems.map(item => (
          <li key={item.id}>
            {isEditing === item.id ? (
              <div className="flex flex-col">
                <input
                  className="text-black border-b-2 border-yellow-700 mb-2"
                  type="text"
                  value={tempText}
                  onChange={handleTextChange}
                  placeholder="Menu Text"
                />
                <input
                  className="text-black border-b-2 border-yellow-700"
                  type="text"
                  value={tempHref}
                  onChange={handleHrefChange}
                  placeholder="Menu Link"
                />
              </div>
            ) : (
              <a
                href={item.href}
                className="hover:text-white cursor-pointer"
                onClick={() => handleEditClick(item.id, item.text, item.href)}
              >
                {item.text}
              </a>
            )}
            {isEditing === item.id && (
              <button
                className="mt-2 px-2 py-1 bg-white text-black font-bold rounded"
                onClick={() => handleSave(item.id)}
              >
                Save
              </button>
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
