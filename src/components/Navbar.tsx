'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-4">
        {/* Portal Name Centered */}
        <div className="text-center mb-4">
          <Link href="/" className="flex flex-col items-center">
            <div className="text-red-500 text-3xl font-extrabold tracking-wide">
              हमारा मोर्चा
            </div>
            <div
              className="text-green-500 text-xl font-bold"
              style={{ fontFamily: 'Urdu Typesetting, serif' }}
            >
              ہمارا مورچہ
            </div>
            <div
              className="text-amber-800 text-sm font-bold mt-1"
              style={{ fontWeight: 'bold' }}
            >
              सच का साथ पर व्यावहारिकता का तकाजा पहले
            </div>
          </Link>
        </div>

        {/* Hamburger Button (Mobile) */}
        <div className="md:hidden flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <div
          className={`mt-4 md:flex justify-around space-y-2 md:space-y-0 md:space-x-0 ${
            isOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <Link href="/" className="hover:underline block text-center">
            होम
          </Link>
          <Link href="/news" className="hover:underline block text-center">
            न्यूज
          </Link>
          <Link href="/jeevan-ke-rang" className="hover:underline block text-center">
            जीवन के रंग
          </Link>
          <Link href="/coding-ki-duniya" className="hover:underline block text-center">
            कोडिंग की दुनिया
          </Link>
          <Link href="/pratirodh" className="hover:underline block text-center">
            प्रतिरोध
          </Link>
          <Link href="/team" className="hover:underline block text-center">
  टीम
</Link>

        </div>
      </div>
    </nav>
  );
}
