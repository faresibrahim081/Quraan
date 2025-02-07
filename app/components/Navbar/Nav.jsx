import Image from "next/image";
import logo from "../../../public/512.png";
import Link from "next/link";

function Nav() {
  return (
    <header className="text-white bg-[#99f6e463] absolute top-0 left-0 right-0 z-50 backdrop-blur-lg">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
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

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <a
                    className="text-white font-bold text-xl  transition hover:text-white"
                    href="/Sowar"
                  >
                    {" "}
                    استعراض السور{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white font-bold text-xl transition hover:text-white"
                    href="/Video"
                  >
                    {" "}
                    البث المباشر{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-white font-bold text-xl transition hover:text-white"
                    href="/Tafseir"
                  >
                    {" "}
                    التفسير{" "}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
