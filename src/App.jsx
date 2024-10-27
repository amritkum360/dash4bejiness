import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditMainPage from './components/EditMainPage/EditMainPage';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define navigation links */}
        <nav className="absolute top-4 right-4">
          <Link
            to="/"
            className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 mr-2"
          >
            Main Page
          </Link>
          <Link
            to="/edit/1234"
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600"
          >
            Edit Mode
          </Link>
        </nav>

        {/* Define the routes for MainPage and EditMainPage */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/edit/:userid" element={<EditMainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
