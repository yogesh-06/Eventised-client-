import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-white border-b shadow-sm px-8 py-3 flex items-center justify-between">
      <div className="text-lg font-semibold">
        <Link href="/" className="text-red-500 text-2xl ">
          E-<span className="text-black text-lg">ventised</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-600 hover:text-black">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
