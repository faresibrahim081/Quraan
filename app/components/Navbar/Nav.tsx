"use client";
import Image from "next/image";
import logo from "../../../public/512.png";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";

function Nav() {
  const [toggle, setToggle] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("a")
      ) {
        setToggle(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const links = [
    { path: "/Sowar", label: "فهرس السور" },
    { path: "/Video", label: "البث المباشر" },
    { path: "/azkar", label: "الازكار" },

  ];
  return (
    <header className="text-white bg-[#32d8b78a] absolute top-0 left-0 right-0 z-50 backdrop-blur-lg">
      <div className="px-3 md:mx-auto md:w-[80%]">
        <div className="flex flex-row-reverse h-[75px] items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <Image
                src={logo}
                alt="Logo"
                className="rounded-full"
                width={60}
                height={60}
              />
            </Link>
          </div>

          <nav aria-label="Global">
            <div ref={menuRef}>
              <FiAlignJustify
                className="md:hidden block w-9 text-indigo-800 h-11 cursor-pointer"
                onClick={() => setToggle((prev) => !prev)}
              />
            </div>
            {toggle && (
              <div
                className="
                  md:hidden absolute top-[4rem] right-[1rem] w-[70%]
                  bg-white/95 backdrop-blur-md
                  rounded-3xl rounded-tr-none rounded-bl-none shadow-xl border border-gray-200
                  p-4 flex flex-col gap-3
                  animate-dropdown
                  z-50
                "
              >
                {links.map((link, i) => (
                  <Link
                    href={link.path}
                    key={i}
                    className="
                      text-lg font-medium text-gray-800
                      px-4 py-3 rounded-xl
                      hover:bg-teal-500 hover:text-white
                      transition-all duration-200
                    "
                    onClick={() => {
                      setTimeout(() => setToggle(false), 150);
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <ul className="hidden md:flex items-center gap-6 text-sm">
              <li>
                <Link
                  className="text-white text-2xl transition hover:text-white"
                  href="/Sowar"
                >
                  {" "}
                  استعراض السور{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-white text-2xl transition hover:text-white"
                  href="/Video"
                >
                  {" "}
                  البث المباشر{" "}
                </Link>
              </li>

              <li>
                <Link
                  className="text-white text-2xl transition hover:text-white"
                  href="/azkar"
                >
                  {" "}
                  الازكار{" "}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Nav;
