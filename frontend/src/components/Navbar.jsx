import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-18 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-6">
          <div className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
            <img
              src="/logo.png"
              alt="PaySphere Logo"
              className="w-14 h-14 sm:w-20 sm:h-20 object-contain"
            />
            PaySphere
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 lg:gap-8 text-[14px] lg:text-[15px] font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 cursor-pointer transition-colors">Features</a>
            <a href="#process" className="hover:text-blue-600 cursor-pointer transition-colors">Process</a>
            <a href="#pricing" className="hover:text-blue-600 cursor-pointer transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-blue-600 cursor-pointer transition-colors">FAQ</a>
          </ul>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <Link
            to="/auth?mode=login"
            className="text-[15px] font-semibold px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Login
          </Link>
          <Link
            to="/auth?mode=signup"
            className="bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-bold px-6 py-2.5 rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 bg-white border-t border-gray-100">
          <ul className="flex flex-col gap-4 text-[15px] font-medium text-gray-700 mt-4">
            <a href="#features" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#process" onClick={() => setIsOpen(false)}>Process</a>
            <a href="#pricing" onClick={() => setIsOpen(false)}>Pricing</a>
            <a href="#faq" onClick={() => setIsOpen(false)}>FAQ</a>
          </ul>

          <div className="flex items-center gap-4">
            <Link
              to="/auth?mode=login"
              className="text-[15px] font-semibold px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link
              to="/auth?mode=signup"
              className="bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-bold px-6 py-2.5 rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}