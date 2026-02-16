"use client";

import { useRouter } from "next/navigation";

export default function AuthenticatedHome() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAuthenticated");
      router.push("/signup");
    }
  };

  const links = [
    {
      name: "Sudoku",
      href: "/sudoku",
    },
    {
      name: "Github",
      href: "/github",
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="
        group
        rounded-2xl
        border border-white/10
        bg-white/5
        p-6
        transition
        hover:bg-white/10
        hover:border-white/20
        active:scale-[0.98]
      "
            >
              <div className="flex flex-col gap-2">
                <span className="text-xl font-semibold text-white">
                  {link.name}
                </span>

                <span className="text-sm text-white/60">
                  Click to open {link.name}
                </span>

                <span className="mt-2 text-sm font-medium text-blue-400 group-hover:underline">
                  Open →
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Welcome back! You are authenticated.
          </h1>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleLogout}
              className="rounded-full bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
