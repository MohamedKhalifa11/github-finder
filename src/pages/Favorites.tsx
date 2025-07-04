import { useAppSelector } from "../hooks/redux";
import GithubCard from "../components/GithubCard";
import StarIcon from "../icons/StarIcon";
import Helmet from "../components/Helmet";

const Favorites = () => {
  const favorites = useAppSelector((state) => state.favorites.favorites);

  return (
    <Helmet title="Favorites">
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          Favorite Users ({favorites.length})
        </h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <StarIcon className="mb-4 size-20 fill-yellow-400 stroke-gray-950 dark:stroke-gray-100" />
            <p className="mb-2 text-xl text-gray-600 dark:text-gray-400">
              No favorites yet!
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Click the star icon on any user card to add them to your
              favorites.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {favorites.map((user) => (
              <GithubCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </Helmet>
  );
};

export default Favorites;
