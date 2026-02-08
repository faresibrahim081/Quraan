"use client";
import { useEffect, useState } from "react";
import { IoArrowUpOutline } from "react-icons/io5";

const ScrollTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollActive = () => {
        setIsVisible(window.scrollY > 500);
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollActive);
        return () => {
            window.removeEventListener("scroll", scrollActive);
        };
    }, []);
    return (
        <>
            <a
                href="#top"
                className={`fixed bottom-2 right-5 w-10 h-10 grid place-items-center text-[2.1rem] bg-gradient-to-r from-[#0d9488] to-green-200 rounded-full opacity-0 transition-transform duration-300 z-40 ${isVisible ? "opacity-100 translate-y-[-20px]" : ""
                    }`}
                aria-hidden="true"
            >
                <IoArrowUpOutline />
            </a>
        </>
    )
}

export default ScrollTop
