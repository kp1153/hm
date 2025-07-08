'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';


const navLinks = [
  { href: '/', label: 'होम' },
  { href: '/desh-videsh', label: 'देश-विदेश' },
  { href: '/jeevan-ke-rang', label: 'जीवन के रंग' },
  { href: '/coding-ki-duniya', label: 'कोडिंग की दुनिया' },
  { href: '/pratirodh', label: 'प्रतिरोध' },
  { href: '/team', label: 'टीम' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const pathname = usePathname();

  return (
    <nav className="bg-gray-900 text-white shadow">
      <div className="max-w-5xl mx-auto px-4 py-4">
        {/* Portal Name Centered */}
        <div className="text-center mb-4">
          <Link href="/" className="flex flex-col items-center" tabIndex={-1}>
            <h1 className="text-red-500 text-3xl font-extrabold tracking-wide">
              हमारा मोर्चा
            </h1>
            <div
              className="text-green-500 text-xl font-bold font-urdu"
              // Tailwind config में font-urdu extend करें
            >
              ہمارا مورچہ
            </div>
            <div className="text-amber-800 text-sm font-bold mt-1">
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
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:underline block text-center transition-colors`}
              // अगर active link highlight करना हो तो:
              // className={`hover:underline block text-center transition-colors ${
              //   pathname === link.href ? 'text-green-500 font-bold' : ''
              // }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
