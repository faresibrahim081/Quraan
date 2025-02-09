"use client";
import Image from "next/image";
import logo from "../../../public/512.png";
import Link from "next/link";
import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import OutsideClickHandler from "react-outside-click-handler";

function Nav() {
  const [toggle, setToggle] = useState(false);
  return (
    <header className="text-white bg-[#32d8b78a] absolute top-0 left-0 right-0 z-50 backdrop-blur-lg">
      <div className="mx-auto w-[80%]">
        <div className="flex h-[75px] items-center justify-between">
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
            <FiAlignJustify
              className="md:hidden block w-9 text-indigo-800 h-11 cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
            <OutsideClickHandler onOutsideClick={() => setToggle(false)}>
              <ul
                className={` ${
                  toggle ? "flex" : "hidden"
                } md:hidden absolute top-[4.5rem] left-[1rem] p-3 w-[320px] bg-teal-500 flex flex-col gap-6 text-sm`}
              >
                <li className="hover:bg-teal-600 hover:pr-1 hover:font-bold transition">
                  <Link
                    className="text-white text-2xl transition hover:text-white"
                    href="/Sowar"
                  >
                    {" "}
                    استعراض السور{" "}
                  </Link>
                </li>

                <li className="hover:bg-teal-600 hover:pr-1 hover:font-bold transition">
                  <Link
                    className="text-white text-2xl transition hover:text-white"
                    href="/Video"
                  >
                    {" "}
                    البث المباشر{" "}
                  </Link>
                </li>

                <li className="hover:bg-teal-600 hover:pr-1 hover:font-bold transition">
                  <Link
                    className="text-white text-2xl transition hover:text-white"
                    href="/Tafseir"
                  >
                    {" "}
                    التفسير{" "}
                  </Link>
                </li>
              </ul>
            </OutsideClickHandler>
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
                  href="/Tafseir"
                >
                  {" "}
                  التفسير{" "}
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
