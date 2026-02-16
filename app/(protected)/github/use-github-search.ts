"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { GithubUser } from "@/app/types/github";

interface UseGithubSearchReturn {
  data: GithubUser | null;
  isLoading: boolean;
  error: string | null;
}

export function useGithubSearch(searchTerm: string): UseGithubSearchReturn {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["github-user", debouncedTerm],
    queryFn: async ({ signal }) => {
      const response = await fetch(
        `https://api.github.com/users/${debouncedTerm}`,
        { signal },
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found");
        }
        throw new Error("Something went wrong");
      }

      return response.json() as Promise<GithubUser>;
    },
    enabled: !!debouncedTerm.trim(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });

  return {
    data: data ?? null,
    isLoading,
    error: error instanceof Error ? error.message : null,
  };
}
