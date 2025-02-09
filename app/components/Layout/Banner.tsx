"use client";
import { useFetchReciters, useFetchRewaya, useFetchSelectSurah } from "@/app/_utils/api/fetchQuran";
import { useAudio } from "@/app/Context/AudioContext";
import { useState, ChangeEvent } from "react";


function Banner() {
  const { playAudio, stopAudio, setCurrentAudio, audioRef } = useAudio();
  const { data: recitersData, isFetching: recitersFetching } = useFetchReciters();

  const [rewaya, setRewaya] = useState<string | null>(null);
  const { data: rewayaData, isFetching: rewayaFetching } = useFetchRewaya(rewaya)

  const [selectedMoshaf, setSelectedMoshaf] = useState<{
    surah_list: string[];
    server: string;
  }>({
    surah_list: [],
    server: "",
  });

  const { data: soraData, isFetching: soraFetching } = useFetchSelectSurah();

  const [newAudioUrl, setnewAudioUrl] = useState<string | null>(null);

  const handleSurahChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedAudioUrl = event.target.value || "";

    if (selectedAudioUrl) {
      stopAudio();
      setnewAudioUrl(selectedAudioUrl);
      setCurrentAudio(selectedAudioUrl);
      playAudio(selectedAudioUrl);
    } else {
      stopAudio();
    }
  };
  return (
    <section className="shadow-lg text-right w-[70%] mb-[2rem] mx-auto rounded-lg p-11 z-10 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold">اختر القارئ</label>
          <select
            onChange={(e) => setRewaya(e.target.value)}
            className="text-right text-lg p-2 focus:outline-none border border-gray-300 rounded-md"
          >
            <option>اختر القارئ</option>
            {recitersData?.reciters.map((reciter: { id: number, name: string }) => (
              <option key={reciter.id} value={reciter.id}>
                {reciter.name}
              </option>
            ))}
            {recitersFetching && <option>جاري التحميل...</option>}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold">اختر الرواية</label>
          <select
            onChange={(e) => {
              setSelectedMoshaf({
                surah_list: e.target.selectedOptions[0]?.dataset.surah?.split(",") || [],
                server: e.target.selectedOptions[0].dataset.server || "",
              });
            }}
            className="text-right text-lg p-2 focus:outline-none border border-gray-300 rounded-md"
          >
            <option>اختر الرواية</option>
            {rewayaData?.reciters[0].moshaf.map((rewaya) => (
              <option
                key={rewaya.id}
                data-surah={rewaya.surah_list}
                data-server={rewaya.server}
                value={rewaya.id}
              >
                {rewaya.name}
              </option>
            ))}
            {rewayaFetching && <option>جاري التحميل...</option>}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-xl font-semibold">اختر السورة</label>
          <select
            onChange={handleSurahChange}
            className="text-right text-lg p-2 focus:outline-none border border-gray-300 rounded-md"
          >
            <option>اختر السورة</option>
            {selectedMoshaf.surah_list.map((surah) =>
              soraData?.suwar.map((sora) => {
                if (sora.id == parseInt(surah)) {
                  const formattedId = sora.id.toString().padStart(3, "0") || "000";
                  return (
                    <option
                      key={sora.name}
                      value={`${selectedMoshaf.server}${formattedId}.mp3`}
                    >
                      سورة {sora.name}
                    </option>
                  );
                }
              })
            )}
            {soraFetching && <option>جاري التحميل...</option>}
          </select>
        </div>
      </div>
      <audio ref={audioRef} controls autoPlay className="w-full mt-5">
        <source src={newAudioUrl || ""} type="audio/ogg" />
        <source src={newAudioUrl || ""} type="audio/mpeg" />
        المتصفح الخاص بك لا يدعم تشغيل الصوت
      </audio>
    </section>
  );
}

export default Banner;
