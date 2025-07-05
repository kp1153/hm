import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-amber-600 text-white py-3 px-6 shadow">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Portal Name */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          हमारा मोर्चा
        </Link>
        {/* Menu Links */}
        <div className="space-x-6 flex items-center">
          <Link href="/" className="hover:underline">
            होम
          </Link>
          <Link href="/news" className="hover:underline">
            न्यूज
          </Link>
          <Link href="/jeevan-ke-rang" className="hover:underline">
            जीवन के रंग
          </Link>
          <Link href="/coding-ki-duniya" className="hover:underline">
            कोडिंग की दुनिया
          </Link>
        </div>
      </div>
    </nav>
  );
}
