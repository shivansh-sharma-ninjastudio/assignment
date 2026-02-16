"use client";

import { useState } from "react";
import { useGithubSearch } from "./use-github-search";

export default function Github() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: userData,
    isLoading: loading,
    error,
  } = useGithubSearch(searchTerm);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-slate-50 px-4 py-12 dark:bg-black font-sans">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            GitHub Finder
          </h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
            Search for a user by username
          </p>
        </div>

        {/* Search Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full rounded-2xl border-0 py-4 pl-12 pr-4 text-slate-900 shadow-xl ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 dark:text-white dark:ring-slate-700 dark:focus:ring-indigo-500 text-lg"
            placeholder="Search GitHub username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center p-8">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="animate-fade-in rounded-xl bg-red-50 p-4 text-center text-red-800 dark:bg-red-900/20 dark:text-red-200 shadow-sm border border-red-100 dark:border-red-900/50">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* User Profile Card */}
        {userData && !loading && (
          <div className="animate-fade-in overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-slate-900 dark:ring-white/10 transition-all hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/10">
            {/* Cover / Header Area */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="px-6 pb-8 relative">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4 flex justify-between items-end">
                <div className="rounded-full p-1.5 bg-white dark:bg-slate-900 shadow-md">
                  <img
                    src={userData.avatar_url}
                    alt={userData.login}
                    className="h-32 w-32 rounded-full object-cover border-2 border-white dark:border-slate-800"
                  />
                </div>

                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  View Profile
                </a>
              </div>

              {/* User Info */}
              <div className="space-y-1">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {userData.name || userData.login}
                </h2>
                <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
                  @{userData.login}
                </p>
              </div>

              {userData.bio && (
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {userData.bio}
                </p>
              )}

              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-3 divide-x divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/50 py-4 text-center dark:bg-slate-800/50 dark:border-slate-700 dark:divide-slate-700">
                <div className="px-2">
                  <span className="block text-2xl font-bold text-slate-900 dark:text-white">
                    {userData.public_repos}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Repos
                  </span>
                </div>
                <div className="px-2">
                  <span className="block text-2xl font-bold text-slate-900 dark:text-white">
                    {userData.followers}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Followers
                  </span>
                </div>
                <div className="px-2">
                  <span className="block text-2xl font-bold text-slate-900 dark:text-white">
                    {userData.following}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Following
                  </span>
                </div>
              </div>

              {/* Details List */}
              <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {userData.location && (
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {userData.location}
                  </li>
                )}
                {userData.company && (
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {userData.company}
                  </li>
                )}
                {userData.blog && (
                  <li className="flex items-center gap-3 overflow-hidden">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <a
                      href={
                        userData.blog.startsWith("http")
                          ? userData.blog
                          : `https://${userData.blog}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate hover:text-indigo-600 hover:underline"
                    >
                      {userData.blog}
                    </a>
                  </li>
                )}
                {userData.twitter_username && (
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                      />
                    </svg>
                    <a
                      href={`https://twitter.com/${userData.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-indigo-600 hover:underline"
                    >
                      @{userData.twitter_username}
                    </a>
                  </li>
                )}
              </ul>

              <div className="mt-8 border-t border-slate-100 pt-6 text-center dark:border-slate-800">
                <p className="text-xs text-slate-400">
                  Joined on{" "}
                  {new Date(userData.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
