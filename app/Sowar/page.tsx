"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const Sowar = () => {
    const { data, isFetching } = useQuery({
        queryKey: ["sowar"],
        queryFn: async () => {
            const response = await fetch(`https://api.alquran.cloud/v1/surah`);
            return response.json();
        },
    });
    if (isFetching) {
        return <h1 className="text-3xl text-center mt-[12rem] font-extrabold text-indigo-600 sm:text-5xl">جاري التحميل...</h1>;

    }
    return (
        <section id="sowar" className="mt-[10rem] w-[80%] mx-auto">
            <h1 className="text-3xl mb-[3rem] text-center font-extrabold text-gray-800 sm:text-5xl">
                قائمة السور
            </h1>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.data.map((surah: { number: number; name: string; }) => (
                    <li key={surah.number}>
                        <Link href={`/Sowar/${surah.number}`} className="text-2xl font-bold text-gray-800 p-3 hover:shadow-md">
                            {surah.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Sowar
