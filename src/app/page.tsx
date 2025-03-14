import React from "react";
import ClientProvider from "@/components/ClientProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

async function getSession() {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

export default async function Page() {
  const session = await getSession();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* {session && <NavigationBar />} */}

      <main className="flex-1 flex flex-col w-full mx-auto">
        <ClientProvider>
          <div className="flex-1 flex items-start justify-center bg-gradient-to-b from-amber-50 to-stone-100 dark:from-stone-900 dark:to-stone-950">
            {session ? (
              // Authenticated View
              <section className="max-w-7xl w-full space-y-8 animate-fade-in">
                <h1 className="text-stone-800 dark:text-amber-50 font-display">
                  {" "}
                  Welcome {session.user?.name}
                </h1>
              </section>
            ) : (
              // Marketing View
              <section className="max-w-7xl w-full space-y-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <h1 className="text-4xl font-bold mt-10 text-stone-800 dark:text-amber-50 font-display">
                    Welcome - Click the button below to get started
                  </h1>
                  <Link
                    href="/auth/signin"
                    className="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg px-8 py-4 text-lg font-medium shadow-lg shadow-amber-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/30"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </section>
            )}
          </div>
        </ClientProvider>
      </main>

      {/* Footer */}
      <footer className="border-t border-amber-200 dark:border-stone-800 bg-amber-50 dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-stone-600 dark:text-amber-200">
            © {new Date().getFullYear()} All Rights Reserved
          </span>
          <div className="flex items-center gap-6 text-sm text-stone-600 dark:text-amber-200">
            <Link
              href="/privacy"
              className="hover:text-amber-600 dark:hover:text-amber-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-amber-600 dark:hover:text-amber-400"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-amber-600 dark:hover:text-amber-400"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
