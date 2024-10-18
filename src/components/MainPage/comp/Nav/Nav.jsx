export default function Nav() {
    return (
      <nav className="w-full bg-yellow-500 text-black py-4">
        <ul className="flex justify-center space-x-8 text-lg font-semibold">
          <li><a href="#home" className="hover:text-white">Home</a></li>
          <li><a href="#products" className="hover:text-white">Products</a></li>
          <li><a href="#profile" className="hover:text-white">Profile</a></li>
          <li><a href="#contacts" className="hover:text-white">Contacts</a></li>
        </ul>
      </nav>
    );
  }
  