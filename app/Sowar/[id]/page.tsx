"use client";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useFetchSingleSurah, useFetchSowar } from "@/app/_utils/api/fetchQuran";
import { useEffect, useState } from "react";
import Loading from "@/app/Loading";

interface Surah {
    number: number;
    name: { ar: string };
    verses_count: number;
    revelation_place: { ar: string };
}

const Surah = () => {
    const params = useParams();

    const [result, setResult] = useState<Surah[]>([]);
    const surahId = params.id ? Number(params.id) : undefined;
    if (surahId && surahId > 114) {
        notFound();
    }
    const { data, isError, isFetching } = useFetchSingleSurah({ id: surahId });
    const { data: surahData } = useFetchSowar();

    useEffect(() => {
        if (surahData?.result) {
            const filteredData = surahData.result.filter((surah: { number: number }) => surah.number === surahId);
            setResult(filteredData);
        }
    }, [surahData, surahId]);

    if (isFetching) {
        return <Loading />;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center">
                <h1 className="text-3xl font-extrabold text-red-600 sm:text-5xl">
                    حدثت مشكلة
                </h1>
                <p className="text-gray-600 text-lg mt-2">حدث خطأ أثناء تحميل البيانات، يرجى المحاولة مرة أخرى.</p>
                <Link
                    href="/"
                    className="mt-6 px-6 py-3 text-lg font-bold text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-all"
                >
                    العودة إلى الصفحة الرئيسية
                </Link>
            </div>
        );
    }

    const namesOfAllah = [
        "ٱللَّه", "ٱلرَّحۡمَٰن", "ٱلرَّحِيم", "ٱلۡمَلِك", "ٱلۡقُدُّوس", "ٱلسَّلَام",
        "ٱلۡمُؤۡمِن", "ٱلۡمُهَيۡمِن", "ٱلۡعَزِيز", "ٱلۡجَبَّار", "ٱلۡمُتَكَبِّر"
    ];


    const highlightNamesOfAllah = (text: string) => {
        const regex = new RegExp(`(${namesOfAllah.join("|")})`, "g");

        return text.split(regex).map((word, index) => {
            if (namesOfAllah.includes(word)) {
                return (
                    <span key={index} className={`text-red-500 font-extrabold`}>
                        {word}
                    </span>
                );
            }
            return word;
        });
    };

    return (
        <div className="mt-[10rem] w-[80%] mx-auto">
            <div className="bg-white p-5 rounded-lg">
                <div className="flex items-center mb-[3rem] justify-between flex-wrap">
                    <Link
                        onClick={(e) => {
                            if (Number(params.id) === 1) e.preventDefault();
                        }}
                        className="hidden md:inline-block rounded-md border border-teal-600 bg-teal-600 px-8 py-3 text-md font-bold text-white hover:bg-transparent hover:text-teal-600 focus:ring-3 focus:outline-hidden"
                        href={`/Sowar/${params.id ? Number(params.id) - 1 : ''}`}
                    >
                        السورة السابقة
                    </Link>
                    <Link
                        onClick={(e) => {
                            if (Number(params.id) === 1) e.preventDefault();
                        }}
                        className="md:hidden rounded-md border border-teal-600 bg-teal-600 px-2 py-2 text-md font-bold text-white hover:bg-transparent hover:text-teal-600 focus:ring-3 focus:outline-hidden"
                        href={`/Sowar/${params.id ? Number(params.id) - 1 : ''}`}
                    >
                        <FaArrowAltCircleRight />
                    </Link>
                    <h1 className="text-3xl font-extrabold text-teal-600 sm:text-5xl">
                        {result[0]?.name.ar}
                    </h1>
                    <Link
                        onClick={(e) => {
                            if (Number(params.id) === 114) e.preventDefault();
                        }}
                        className="hidden md:inline-block rounded-md border border-teal-600 px-8 py-3 text-md font-bold text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-3 focus:outline-hidden"
                        href={`/Sowar/${params.id ? Number(params.id) + 1 : ''}`}
                    >
                        السورة التالية
                    </Link>
                    <Link
                        onClick={(e) => {
                            if (Number(params.id) === 114) e.preventDefault();
                        }}
                        className="md:hidden rounded-md border border-teal-600 px-2 py-2 text-md font-bold text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-3 focus:outline-hidden"
                        href={`/Sowar/${params.id ? Number(params.id) + 1 : ''}`}
                    >
                        <FaArrowAltCircleLeft />
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                    <h1 className="p-3 rounded-md text-white font-bold bg-teal-600 text-xl">
                        عدد الايات: {result[0]?.verses_count}
                    </h1>
                    <h1 className="p-3 rounded-md text-white font-bold bg-teal-600 text-xl">
                        مكان النزول: {result[0]?.revelation_place?.ar}
                    </h1>
                    <h1 className="p-3 rounded-md text-white font-bold bg-teal-600 text-xl">
                        رقم السورة: {result[0]?.number}
                    </h1>
                </div>
            </div>

            <div className="bg-white p-5 rounded-lg my-3 text-center leading-[3rem]">
                {!data.result[0].text.ar.includes("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ") && (
                    <h1 className="text-teal-600 text-center text-2xl sm:text-4xl font-extrabold my-[3rem]">
                        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                    </h1>
                )}

                {data.result.map((ayah: { number: number; text: { ar: string } }) => (
                    <span key={ayah.number} className="text-gray-800 text-xl sm:text-2xl font-[900]">
                        {highlightNamesOfAllah(ayah.text.ar)}
                        <span className="text-teal-600 px-2 font-[600]">({ayah.number})</span>
                    </span>
                ))}
            </div>


        </div>
    );
};

export default Surah;
