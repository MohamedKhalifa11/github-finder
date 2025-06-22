import { useAppSelector } from "../hooks/redux";
import GithubCard from "../components/GithubCard";
import StarIcon from "../icons/StarIcon";

const Favorites = () => {
  const favorites = useAppSelector((state) => state.favorites.favorites);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Favorite Users ({favorites.length})
      </h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          {/* <div className="mb-4 text-6xl">⭐</div> */}
          <StarIcon className="mb-4 size-20 fill-yellow-400 stroke-gray-950" />
          <p className="mb-2 text-xl text-gray-600">No favorites yet!</p>
          <p className="text-gray-500">
            Click the star icon on any user card to add them to your favorites.
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
  );
};

export default Favorites;
