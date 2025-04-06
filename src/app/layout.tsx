import React from "react";
import "@/app/globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "Umut Temel - AI & Cybersecurity Innovator",
  description: "Personal website of Umut Temel - AI Engineer, Cybersecurity Researcher, and Full-Stack Developer",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 dark:from-stone-900 dark:to-stone-800">
        <ThemeProvider defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b border-amber-200 dark:border-stone-700 bg-amber-50/80 dark:bg-stone-900/90 backdrop-blur-sm">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="relative h-8 w-8">
                    <Image
                      src="/cloud_blacklogo.png"
                      alt="Logo"
                      fill
                      className="object-contain dark:hidden"
                    />
                    <Image
                      src="/cloud_whitelogo.png"
                      alt="Logo"
                      fill
                      className="object-contain hidden dark:block"
                    />
                  </div>
                  <span className="text-stone-900 dark:text-amber-100 font-semibold">Umut Temel</span>
                </div>

                <nav className="hidden md:flex items-center space-x-8">
                  <Link 
                    href="/" 
                    className="text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors"
                  >
                    About
                  </Link>
                  <Link 
                    href="/projects" 
                    className="text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors"
                  >
                    Projects
                  </Link>
                  <Link 
                    href="/blog" 
                    className="text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors"
                  >
                    Blog
                  </Link>
                  <Link 
                    href="/contact" 
                    className="text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors"
                  >
                    Contact
                  </Link>
                </nav>

                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <button 
                    className="md:hidden focus:outline-none"
                    aria-label="Toggle menu"
                    onClick={() => {
                      const mobileMenu = document.getElementById('mobile-menu');
                      if (mobileMenu) {
                        mobileMenu.classList.toggle('hidden');
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-stone-600 dark:text-amber-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile Menu */}
              <div id="mobile-menu" className="hidden md:hidden">
                <div className="px-4 py-3 space-y-3 bg-amber-50 dark:bg-stone-900 border-b border-amber-200 dark:border-stone-700">
                  <Link 
                    href="/" 
                    className="block text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors"
                    onClick={() => {
                      const mobileMenu = document.getElementById('mobile-menu');
                      if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                      }
                    }}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    className="block text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors"
                    onClick={() => {
                      const mobileMenu = document.getElementById('mobile-menu');
                      if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                      }
                    }}
                  >
                    About
                  </Link>
                  <Link 
                    href="/projects" 
                    className="block text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors"
                    onClick={() => {
                      const mobileMenu = document.getElementById('mobile-menu');
                      if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                      }
                    }}
                  >
                    Projects
                  </Link>
                  <Link 
                    href="/blog" 
                    className="block text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors"
                    onClick={() => {
                      const mobileMenu = document.getElementById('mobile-menu');
                      if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                      }
                    }}
                  >
                    Blog
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400 transition-colors"
                    onClick={() => {
                      const mobileMenu = document.getElementById('mobile-menu');
                      if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                      }
                    }}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>

            <footer className="bg-amber-50 dark:bg-stone-900 border-t border-amber-200 dark:border-stone-700 py-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="relative h-8 w-8 mr-2">
                      <Image
                        src="/cloud_blacklogo.png"
                        alt="Logo"
                        fill
                        className="object-contain dark:hidden"
                      />
                      <Image
                        src="/cloud_whitelogo.png"
                        alt="Logo"
                        fill
                        className="object-contain hidden dark:block"
                      />
                    </div>
                    <span className="text-stone-900 dark:text-amber-100 font-semibold">Umut Temel</span>
                  </div>
                  
                  <div className="flex space-x-6 mb-4 md:mb-0">
                    <a 
                      href="https://github.com/yourusername" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400"
                      aria-label="GitHub"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </a>
                    <a 
                      href="https://linkedin.com/in/yourusername" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400"
                      aria-label="LinkedIn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a 
                      href="https://twitter.com/yourusername" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-stone-600 hover:text-amber-600 dark:text-amber-200 dark:hover:text-amber-400"
                      aria-label="Twitter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  </div>
                  
                  <div className="text-stone-600 dark:text-amber-200 text-sm">
                    © {new Date().getFullYear()} Umut Temel. All rights reserved.
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
