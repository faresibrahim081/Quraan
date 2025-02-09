"use client"
// import { useQuery } from "@tanstack/react-query";
// import { ChangeEvent } from "react";
// import { useState } from "react";
// import { useAudio } from "../Context/AudioContext";

function Tafseir() {
    // const { playAudio, stopAudio, setCurrentAudio, audioRef } = useAudio();
    // const { data, isFetching } = useQuery({
    //     queryKey: ["tafseir"],
    //     queryFn: async () => {
    //         const response = await fetch(`https://www.mp3quran.net/api/v3/tafsir?tafsir=1&language=ar`);
    //         return response.json();
    //     },
    // });
    // const [newAudioUrl, setnewAudioUrl] = useState<string | null>(null);

    // const handleSurahChange = (event: ChangeEvent<HTMLSelectElement>) => {
    //     const selectedOption = event.target.selectedOptions[0];
    //     const selectedAudioUrl = selectedOption.dataset.server || "";

    //     if (selectedAudioUrl) {
    //         stopAudio();
    //         setnewAudioUrl(selectedAudioUrl);
    //         setCurrentAudio(selectedAudioUrl);
    //         playAudio(selectedAudioUrl);
    //     } else {
    //         stopAudio();
    //     }
    // };
    // if (isFetching) {
    //     return <h1 className="text-3xl text-center mt-[12rem] font-extrabold text-indigo-600 sm:text-5xl">جاري التحميل...</h1>;
    // }

    return (
        <section id="tafseer" className="w-[70%] shadow-lg mt-[10rem] bg-white rounded-lg p-10 mx-auto">
            <h1 className="text-3xl mb-[1rem] text-center font-extrabold text-gray-800 sm:text-5xl">
                {/* {data.tafasir.name} */}
                جاري العمل علي اضافة قسم لتفسير الطبري
            </h1>
            {/* <div className="flex flex-col gap-3">
                <label className="text-lg font-semibold">اختر السورة التي تريد تفسيرها من القائمة</label>
                <select
                    onChange={handleSurahChange}
                    className="text-right p-2 focus:outline-none border border-gray-300 rounded-md"
                >
                    <option>اختر السورة</option>
                    {data?.tafasir.soar.map((surah: { id: number; name: string; url: string }) =>
                        <option key={surah.id} data-server={surah.url} value={surah.id}>
                            {surah.name}
                        </option>
                    )}
                </select>
                <audio ref={audioRef} controls autoPlay className="w-full my-5">
                    <source src={newAudioUrl || ""} type="audio/ogg" />
                    <source src={newAudioUrl || ""} type="audio/mpeg" />
                    المتصفح الخاص بك لا يدعم تشغيل الصوت
                </audio>
            </div> */}
        </section>
    )
}

export default Tafseir
