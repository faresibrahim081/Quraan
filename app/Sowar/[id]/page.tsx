"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import {
    FaArrowAltCircleLeft,
    FaArrowAltCircleRight,
} from "react-icons/fa";
import { useFetchSingleSurah } from "@/app/_utils/api/fetchQuran";
import Loading from "@/app/Loading";

interface Ayah {
    number: number;
    text: string;
    numberInSurah: number;
}

interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
    ayahs: Ayah[];
}

const Surah = () => {
    const params = useParams();

    const surahId = params.id
        ? Number(params.id)
        : undefined;

    if (
        surahId &&
        (surahId < 1 || surahId > 114)
    ) {
        notFound();
    }

    const {
        data,
        isError,
        isFetching,
    } = useFetchSingleSurah({
        id: surahId,
    });

    console.log(data)
    if (isFetching) {
        return <Loading />;
    }

    if (isError || !data) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center">
                <h1 className="text-3xl text-red-600 sm:text-5xl">
                    حدثت مشكلة
                </h1>

                <p className="text-gray-600 text-lg mt-2">
                    حدث خطأ أثناء تحميل البيانات، يرجى المحاولة مرة أخرى.
                </p>

                <Link
                    href="/"
                    className="mt-6 px-6 py-3 text-lg text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-all"
                >
                    الصفحة الرئيسية
                </Link>
            </div>
        );
    }

    const surah: Surah = data.data;

    const namesOfAllah = [
        "ٱللَّه",
        "ٱلرَّحۡمَٰن",
        "ٱلرَّحِيم",
        "ٱلۡمَلِك",
        "ٱلۡقُدُّوس",
        "ٱلسَّلَام",
        "ٱلۡمُؤۡمِن",
        "ٱلۡمُهَيۡمِن",
        "ٱلۡعَزِيز",
        "ٱلۡجَبَّار",
        "ٱلۡمُتَكَبِّر",
    ];

    const highlightNamesOfAllah = (text: string) => {
        const regex = new RegExp(
            `(${namesOfAllah.join("|")})`,
            "g"
        );

        return text.split(regex).map((word, index) => {
            if (namesOfAllah.includes(word)) {
                return (
                    <span
                        key={index}
                        className="text-red-500"
                    >
                        {word}
                    </span>
                );
            }

            return word;
        });
    };

    const firstAyah = surah.ayahs?.[0]?.text || "";

    const hasBasmala = firstAyah.includes(
        "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ"
    );

    return (
        <div className="mt-[5.5rem] md:mt-[7rem] mx-2 md:w-[80%] md:mx-auto">

            {/* Surah Header */}
            <div className="bg-white p-6 rounded-lg">

                <div className="flex items-center mb-6 justify-between flex-wrap gap-3">

                    {/* Previous */}
                    <Link
                        onClick={(e) => {
                            if (surah.number === 1) {
                                e.preventDefault();
                            }
                        }}
                        className="hidden md:inline-block rounded-md border border-teal-600 bg-teal-600 px-8 py-3 text-lg text-white hover:bg-transparent hover:text-teal-600 transition-all"
                        href={`/Sowar/${surah.number - 1}`}
                    >
                        السورة السابقة
                    </Link>

                    <Link
                        onClick={(e) => {
                            if (surah.number === 1) {
                                e.preventDefault();
                            }
                        }}
                        className="md:hidden rounded-md border border-teal-600 bg-teal-600 px-2 py-2 text-md text-white hover:bg-transparent hover:text-teal-600 transition-all"
                        href={`/Sowar/${surah.number - 1}`}
                    >
                        <FaArrowAltCircleRight />
                    </Link>

                    {/* Surah Name */}
                    <h1 className="text-2xl md:text-3xl text-teal-600 sm:text-5xl">
                        {surah.name}
                    </h1>

                    {/* Next */}
                    <Link
                        onClick={(e) => {
                            if (surah.number === 114) {
                                e.preventDefault();
                            }
                        }}
                        className="hidden md:inline-block rounded-md border border-teal-600 px-8 py-3 text-lg text-teal-600 hover:bg-teal-600 hover:text-white transition-all"
                        href={`/Sowar/${surah.number + 1}`}
                    >
                        السورة التالية
                    </Link>

                    <Link
                        onClick={(e) => {
                            if (surah.number === 114) {
                                e.preventDefault();
                            }
                        }}
                        className="md:hidden rounded-md border border-teal-600 px-2 py-2 text-md text-teal-600 hover:bg-teal-600 hover:text-white transition-all"
                        href={`/Sowar/${surah.number + 1}`}
                    >
                        <FaArrowAltCircleLeft />
                    </Link>

                </div>

                {/* Surah Info */}
                <div className="flex items-center justify-between gap-5 flex-wrap">

                    <span className="p-1 md:p-3 rounded-md text-teal-600 text-md md:text-xl">
                        عدد الآيات: {surah.numberOfAyahs}
                    </span>

                    <span className="p-1 md:p-3 rounded-md text-teal-600 text-md md:text-xl">
                        مكان النزول:{" "}
                        {surah.revelationType === "Meccan"
                            ? "مكية"
                            : "مدنية"}
                    </span>

                    <span className="p-1 md:p-3 rounded-md text-teal-600 text-md md:text-xl">
                        رقم السورة: {surah.number}
                    </span>

                </div>
            </div>

            {/* Quran */}
            <div className="bg-white p-1.5 rounded-lg my-3 text-center leading-[1.5rem] md:leading-[3rem]">

                {/* Basmala */}
                {!hasBasmala && (
                    <h1 className="text-teal-600 text-center text-2xl sm:text-4xl my-[1.5rem] md:my-[3rem]">
                        بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ
                    </h1>
                )}

                {/* Ayahs */}
                {surah.ayahs.map((ayah) => (
                    <span
                        key={ayah.number}
                        className="text-gray-800 font-[400] leading-[1.7] text-[18px] md:text-[2.2em]"
                    >
                        {highlightNamesOfAllah(ayah.text)}

                        <span className="text-teal-600 px-2">
                            ({ayah.numberInSurah})
                        </span>
                    </span>
                ))}

            </div>

        </div>
    );
};

export default Surah;