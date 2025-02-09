"use client";
import Link from "next/link";
import Loading from "../Loading";
import { useFetchSowar } from "../_utils/api/fetchQuran";

const Sowar = () => {
    const { data, isFetching } = useFetchSowar();

    if (isFetching) {
        return <Loading />;
    }

    return (
        <section id="sowar" className="mt-[10rem] w-[90%] mx-auto">
            <h1 className="text-3xl mb-[3rem] text-center font-extrabold text-teal-700 sm:text-5xl">
                فهرس قرائة السور
            </h1>
            <div dir="ltr">
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 h-[80vh] px-4 overflow-y-auto md:grid-cols-3 lg:grid-cols-4">
                    {data.result.map((surah: { number: number; name: { ar: string } }) => (
                        <li key={surah.number}>
                            <Link
                                href={`/Sowar/${surah.number}`}
                                className="block bg-white shadow-lg rounded-lg p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl border border-gray-200"
                            >
                                <h2 className="text-2xl font-extrabold text-gray-800">
                                    {surah.number}. {surah.name.ar}
                                </h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Sowar;
