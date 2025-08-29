import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

const Header = () => {
  const { favoritesCount } = useFavorites();
  const location = useLocation();

  return (
    <header className="bg-[#fcca59] text-gray-700 fixed h-25 w-full z-10 flex flex-row justify-center items-center">
      <div className="container mx-auto px-8.5 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4">
          <img src="../favicon.ico" className="w-12"></img>
            <h1 className="text-4xl font-bold font-heading">
              Pinoy Recipe Finder
            </h1>
          </Link>

          <nav className="flex items-baseline space-x-6 text-2xl">
            <Link
              to="/"
              className={`px-4 sm:px-6 py-2 rounded-3xl transition-colors duration-200 font-medium ${
                location.pathname === "/" ? "text-gray-700" : "text-yellow-50"
              }`}>
              Home
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center space-x-2 font-medium transition-colors duration-200 bg-white px-4 sm:px-6 py-3.5 rounded-3xl ${
                location.pathname === "/favorites"
                  ? "text-yellow-400"
                  : "text-gray-700"
              }`}>
              <span className="leading-none">Favorites</span>
              <span className="flex items-center justify-center bg-[#fcca59] text-white rounded-full py-2 text-sm font-bold w-6 h-6 text-center">
                {favoritesCount}
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
