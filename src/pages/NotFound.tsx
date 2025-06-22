import { Link } from "react-router";
import Helmet from "../components/Helmet";

const NotFound = () => {
  return (
    <Helmet title="404 Not Found">
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-6 text-xl">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="rounded bg-gray-600 px-4 py-2 text-white transition hover:bg-gray-700"
        >
          Go to Home
        </Link>
      </div>
    </Helmet>
  );
};

export default NotFound;
