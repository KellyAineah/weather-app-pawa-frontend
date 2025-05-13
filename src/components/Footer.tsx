'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative bg-blue-600 text-white mt-10">
      
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          className="w-full h-[60px] fill-white"
        >
          <path d="M0,0 C300,100 900,0 1200,100 L1200,0 L0,0 Z" />
        </svg>
      </div>

      {/* Footer content */}
      <div className="relative pt-20 pb-6 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
        
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-white mb-4">PawaWeather</h3>
            <p className="text-blue-100">
              Africa's most accurate weather companion, providing hyper-local forecasts.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-100 hover:text-white transition">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        
        <p className="text-sm text-center text-blue-100">
          © {new Date().getFullYear()} WeatherWise. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
