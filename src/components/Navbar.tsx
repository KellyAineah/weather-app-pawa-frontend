'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `sticky top-0 z-50 px-4 transition-all duration-300 ease-in-out ${
    scrolled ? 'bg-white shadow-md py-3 text-gray-900' : 'bg-blue-600 py-5 text-white'
  }`;

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
