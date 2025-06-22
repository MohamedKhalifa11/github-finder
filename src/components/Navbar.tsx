import { Link, useLocation } from "react-router";
import { useAppSelector } from "../hooks/redux";
import { useTheme } from "../context/ThemeContext";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const location = useLocation();
  const favoritesCount = useAppSelector(
    (state) => state.favorites.favorites.length,
  );

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              GitHub Finder
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "bg-gray-900 text-white dark:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              }`}
            >
              Home
            </Link>

            <Link
              to="/favorites"
              className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === "/favorites"
                  ? "bg-gray-900 text-white dark:bg-gray-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              }`}
            >
              Favorites
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-gray-900">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {theme === "dark" ? (
                  <SunIcon className="size-6" />
                ) : (
                  <MoonIcon className="size-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
