import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import GithubCard from "../components/GithubCard";
import type { GitHubUser } from "../types";
import SearchInput from "../components/SearchInput";
import PaginationControls from "../components/PaginationControls";
import { useSearchParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchIcon from "../icons/SearchIcon";
import Helmet from "../components/Helmet";

const USERS_PER_PAGE = 10;

const Home = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [params, setParams] = useSearchParams();
  const since = Number(params.get("since")) || 0;
  const [sinceHistory, setSinceHistory] = useState<number[]>([]); // Stack to manage previous 'since' values for back navigation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm); // Debounced search

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    // Conditionally add Authorization header if token is available
    const headers = import.meta.env.VITE_GITHUB_TOKEN
      ? {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        }
      : {};

    try {
      const res = await axios.get(`https://api.github.com/users`, {
        params: {
          since: since,
          per_page: USERS_PER_PAGE,
        },
        headers,
      });

      const users: GitHubUser[] = res.data;
      const detailedUsers = await Promise.all(
        users.map(async (user) => {
          const res = await axios.get(user.url, {
            headers,
          });
          return res.data;
        }),
      );

      setUsers(detailedUsers);

      console.log("Limit:", res.headers["x-ratelimit-limit"]);
      console.log("Remaining:", res.headers["x-ratelimit-remaining"]);
    } catch (err) {
      // Handle offline error
      if (!window.navigator.onLine) {
        setError(
          "It looks like you're offline. Check your connection and try again.",
        );
        // Handle GitHub rate limit
      } else if (
        axios.isAxiosError(err) &&
        err.response?.status === 403 &&
        err.response?.headers["x-ratelimit-remaining"] === "0"
      ) {
        const resetTimestamp =
          +err.response.headers["x-ratelimit-reset"] * 1000;
        const resetDate = new Date(resetTimestamp);
        const minutesLeft = Math.ceil((resetTimestamp - Date.now()) / 60000);

        setError(
          `Please try again in ${minutesLeft} minutes (approximately ${resetDate.toLocaleTimeString()}).`,
        );
      } else {
        setError("An error occurred while loading users. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, [since]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleNext = () => {
    if (users.length > 0) {
      setSinceHistory((prev) => [...prev, since]);
      const newSince = users[users.length - 1].id;
      setParams({ since: newSince.toString() });
    }
  };

  const handlePrev = () => {
    setSinceHistory((prevHistory) => {
      if (prevHistory.length === 0) return prevHistory;

      const newHistory = [...prevHistory];
      const lastSince = newHistory.pop();

      if (lastSince !== undefined) {
        setParams({ since: lastSince.toString() });
      }

      return newHistory;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredUsers = users.filter((user) => {
    const search = debouncedSearch.toLowerCase();
    return (
      user.login.toLowerCase().includes(search) ||
      (user.name && user.name.toLowerCase().includes(search))
    );
  });

  return (
    <Helmet title="Home">
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-center font-semibold text-red-600">{error}</p>
        ) : filteredUsers.length === 0 ? (
          <>
            <SearchIcon className="mx-auto mb-4 size-12 text-gray-400" />
            <p className="text-center font-semibold text-gray-600 dark:text-gray-400">
              There are no users matching your search.
            </p>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {filteredUsers.map((user) => (
              // Card Component
              <GithubCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {/* Pagination Component */}
        <PaginationControls
          since={since}
          onFirst={() => setParams({ since: "0" })}
          onPrev={handlePrev}
          onNext={handleNext}
          disablePrev={sinceHistory.length === 0}
        />
      </div>
    </Helmet>
  );
};

export default Home;
