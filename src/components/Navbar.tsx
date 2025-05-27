'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname(); // Get the current path
  const [scrolled, setScrolled] = useState(false);  // Track if the user has scrolled

  useEffect(() => {
    // Add scroll event listener to change navbar style on scroll
    const handleScroll = () => {
      // Check if the user has scrolled more than 50 pixels
      setScrolled(window.scrollY > 50);
    };
  // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Define the classes for the navbar based on scroll state
  const navClasses = `sticky top-0 z-50 px-4 transition-all duration-300 ease-in-out ${
    scrolled ? 'bg-white shadow-md py-3 text-gray-900' : 'bg-blue-600 py-5 text-white'
  }`;
// Define the classes for the links based on the current path and scroll state
  const linkClasses = (path: string) =>
    `transition duration-200 ${
      pathname === path
        ? scrolled
          ? 'text-blue-600 font-semibold underline'
          : 'text-white font-semibold underline'
        : scrolled
        ? 'text-gray-700 hover:text-blue-600'
        : 'text-white hover:underline'
    }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">PawaWeather</h1>
        <div className="space-x-4">
          <Link href="/" className={linkClasses('/')}>
            Home
          </Link>
          <Link href="/about" className={linkClasses('/about')}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
