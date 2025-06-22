import GitHubIcon from "../icons/GitHubIcon";
import StarIcon from "../icons/StarIcon";
import type { GitHubUser } from "../types";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { toggleFavorite } from "../store/favoritesSlice";

const GithubCard = ({ user }: { user: GitHubUser }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const isFavorite = favorites.some((fav) => fav.id === user.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(user));
  };

  return (
    <div className="mx-auto w-full max-w-2xs rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <div className="flex justify-between">
        <button
          onClick={handleToggleFavorite}
          className="transition-transform hover:scale-110"
        >
          <StarIcon
            className={`size-6 transition-colors ${
              isFavorite
                ? "fill-yellow-400 stroke-yellow-400"
                : "fill-white stroke-gray-600 hover:fill-yellow-300 hover:stroke-yellow-300 dark:fill-gray-800 dark:stroke-gray-400 dark:hover:fill-yellow-300 dark:hover:stroke-yellow-300"
            }`}
          />
        </button>
        <a href={user.html_url} target="_blank">
          <GitHubIcon className="size-6 fill-gray-600 transition-colors hover:fill-gray-800 dark:fill-gray-400 dark:hover:fill-gray-200" />
        </a>
      </div>

      {/* User Image */}
      <div className="my-2 flex flex-col gap-2 text-center">
        <div className="flex justify-center">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="size-20 rounded-full border-4 border-gray-200 object-cover"
          />
        </div>

        <div className="flex flex-col">
          {/* Name of the user ex: Mohamed Khalifa */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {user.name || user.login}
          </h2>
          {/* username on GitHub ex: mohamedkhalifa11*/}
          <p className="text-gray-600 dark:text-gray-400">@{user.login}</p>
        </div>

        {/* User Bio */}
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user.bio || "No bio available."}
          </p>
        </div>
      </div>

      <hr className="mb-2 border-gray-200 dark:border-gray-600" />

      <div className="flex justify-between text-center">
        {/* Number of Followers */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {user.followers}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Followers</p>
        </div>
        {/* Number of Followings */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {user.following}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Following</p>
        </div>
        {/* Created Account Date */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {new Date(user.created_at).getFullYear()}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Joined</p>
        </div>
      </div>
    </div>
  );
};

export default GithubCard;
