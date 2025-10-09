import { useState } from "react";
import { Menu, X, Home, User, Settings } from "lucide-react"; 
import Tabset from "./TabSets";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menus = [
    { name: "Inbox", icon: <Home size={18} />, path: "/" },
    { name: "Pricing", icon: <User size={18} />, path: "/profile" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <nav className="bg-[#0f59ac] text-white w-full">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 py-3 md:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/ICU-Medical-logo.jpg"
              alt="Logo"
              className="h-14
               p-0 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {menus.map((menu, i) => (
              <li
                key={i}
                className="flex items-center gap-2 cursor-pointer hover:bg-blue-800 px-3 py-2 rounded-md"
              >
                {menu.icon}
                <span>{menu.name}</span>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-blue-800"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <ul className="md:hidden flex flex-col space-y-2 px-4 pb-4">
            {menus.map((menu, i) => (
              <li
                key={i}
                className="flex items-center gap-2 cursor-pointer hover:bg-blue-800 px-3 py-2 rounded-md"
              >
                {menu.icon}
                <span>{menu.name}</span>
              </li>
            ))}
          </ul>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-screen-2xl mx-auto w-full">
        <Tabset />
      </main>
    </div>
  );
}
