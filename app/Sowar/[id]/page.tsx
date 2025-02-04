"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";


const Surah = () => {
    const params = useParams();

    const { data } = useQuery({
        queryKey: ["surah", params.id],
        queryFn: async () => {
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${params.id}`);
            return response.json();
        },
        enabled: !!params.id,
    });

    return (
        <div className="mt-[10rem] w-[80%] mx-auto">
            <div className="bg-white p-5 rounded-lg">
                <div className="flex items-center justify-between gap-7 flex-wrap">
                    <Link
                        className="inline-block rounded-md border border-teal-600 bg-teal-600 px-8 py-3 text-md font-bold text-white hover:bg-transparent hover:text-teal-600 focus:ring-3 focus:outline-hidden"
                        href={`/Sowar/${params.id ? Number(params.id) - 1 : ''}`}
                    >
                        السورة السابقة
                    </Link>
                    <h1 className="text-3xl mb-[3rem] text-center font-extrabold text-teal-600 sm:text-5xl">
                        {data?.data.name}
                    </h1>
                    <Link
                        className="inline-block rounded-md border border-teal-600 px-8 py-3 text-md font-bold text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-3 focus:outline-hidden"
                        href={`/Sowar/${params.id ? Number(params.id) + 1 : ''}`}
                    >
                        السورة التالية
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                    <h1 className="p-3 rounded-md text-white font-bold bg-teal-600 text-xl">
                        عدد الايات: {data?.data.numberOfAyahs}
                    </h1>
                    <h1 className="p-3 rounded-md text-white font-bold bg-teal-600 text-xl">
                        مكان النزول: {data?.data.revelationType}
                    </h1>
                    <h1 className="p-3 rounded-md text-white font-bold bg-teal-600 text-xl">
                        رقم السورة: {data?.data.number}
                    </h1>
                </div>
            </div>

            <div className="bg-white p-5 rounded-lg my-3 text-center leading-[3rem]">
                <h1 className="text-teal-600 text-center text-3xl sm:text-5xl font-extrabold my-[3rem]">
                    {data?.data.ayahs[0]?.text}
                </h1>
                {data?.data.ayahs.slice(1).map((ayah: { number: number; text: string }, index: number) => (
                    <span key={ayah.number} className="text-gray-800 text-2xl font-bold">
                        {ayah.text}
                        <span className="text-teal-600 px-2 text-xl">({index + 1})</span>
                    </span>
                ))}
            </div>

        </div>
    );
};

export default Surah;
