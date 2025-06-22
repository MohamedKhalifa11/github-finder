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
    <div className="mx-auto w-full max-w-2xs rounded-xl bg-white p-6 shadow-lg">
      <div className="flex justify-between">
        <button
          onClick={handleToggleFavorite}
          className="transition-transform hover:scale-110"
        >
          <StarIcon
            className={`size-6 transition-colors ${
              isFavorite
                ? "fill-yellow-400 stroke-yellow-400"
                : "fill-white stroke-gray-600 hover:fill-yellow-300 hover:stroke-yellow-300"
            }`}
          />
        </button>
        <a href={user.html_url} target="_blank">
          <GitHubIcon className="size-6 fill-gray-600 transition-colors hover:fill-gray-800" />
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
          <h2 className="text-xl font-bold text-gray-900">
            {user.name || user.login}
          </h2>
          {/* username on GitHub ex: mohamedkhalifa11*/}
          <p className="text-gray-600">@{user.login}</p>
        </div>

        {/* User Bio */}
        <div>
          <p className="text-sm text-gray-600">
            {user.bio || "No bio available."}
          </p>
        </div>
      </div>

      <hr className="mb-2 border-gray-200" />

      <div className="flex justify-between text-center">
        {/* Number of Followers */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900">
            {user.followers}
          </p>
          <p className="text-xs text-gray-600">Followers</p>
        </div>
        {/* Number of Followings */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900">
            {user.following}
          </p>
          <p className="text-xs text-gray-600">Following</p>
        </div>
        {/* Created Account Date */}
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-900">
            {new Date(user.created_at).getFullYear()}
          </p>
          <p className="text-xs text-gray-600">Joined</p>
        </div>
      </div>
    </div>
  );
};

export default GithubCard;
