"use client";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState, ChangeEvent } from "react";

// Define the types for the API response data
interface Reciter {
  id: string;
  name: string;
}

interface Rewaya {
  id: string;
  name: string;
  surah_list: string[];
  server: string;
}

interface Surah {
  id: number;
  name: string;
}

interface RecitersData {
  reciters: Reciter[];
}

interface RewayaData {
  reciters: {
    moshaf: Rewaya[];
  }[];
}

interface SoraData {
  suwar: Surah[];
}

const apiUrl = "https://www.mp3quran.net/api/v3";

function Banner() {
  const { data: recitersData, isFetching: recitersStaus } = useQuery<RecitersData>({
    queryKey: ["reciters"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/reciters?language=ar`);
      return response.json();
    },
  });

  const [rewaya, setRewaya] = useState<string | null>(null);

  const { data: rewayaData, isFetching: rewayaStaus } = useQuery<RewayaData>({
    queryKey: ["rewaya", rewaya],
    queryFn: async () => {
      const response = await fetch(
        `${apiUrl}/reciters?language=ar&reciter=${rewaya}`
      );
      return response.json();
    },
  });

  const [selectedMoshaf, setSelectedMoshaf] = useState<{
    surah_list: string[];
    server: string;
  }>({
    surah_list: [],
    server: "",
  });

  const { data: soraData } = useQuery<SoraData>({
    queryKey: ["surah"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/suwar`);
      return response.json();
    },
  });

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSurahChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAudioUrl(event.target.value);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };
  return (
    <section className="absolute inset-x-0 bottom-[-5rem] shadow-lg text-right w-[70%] mx-auto rounded-lg p-11 z-10 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-3">
          <label className="text-lg font-semibold">اختر القارئ</label>
          <select
            onChange={(e) => setRewaya(e.target.value)}
            className="text-right p-2 focus:outline-none border border-gray-300 rounded-md"
          >
            <option>اختر القارئ</option>
            {recitersData?.reciters.map((reciter) =>
              !recitersStaus ? (
                <option key={reciter.id} value={reciter.id}>
                  {reciter.name}
                </option>
              ) : (
                <option key={reciter.id}>جاري التحميل</option>
              )
            )}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-lg font-semibold">اختر الرواية</label>
          <select
            onChange={(e) => {
              setSelectedMoshaf({
                surah_list: e.target.selectedOptions[0]?.dataset.surah?.split(",") || [],
                server: e.target.selectedOptions[0].dataset.server || "",
              });
            }}
            className="text-right p-2 focus:outline-none border border-gray-300 rounded-md"
          >
            <option>اختر الرواية</option>
            {rewayaData?.reciters[0].moshaf.map((rewaya) =>
              !rewayaStaus ? (
                <option
                  key={rewaya.id}
                  data-surah={rewaya.surah_list}
                  data-server={rewaya.server}
                  value={rewaya.id}
                >
                  {rewaya.name}
                </option>
              ) : (
                <option key={rewaya.id}>جاري التحميل</option>
              )
            )}
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-lg font-semibold">اختر السورة</label>
          <select
            onChange={handleSurahChange}
            className="text-right p-2 focus:outline-none border border-gray-300 rounded-md"
          >
            <option>اختر السورة</option>
            {selectedMoshaf.surah_list.map((surah) =>
              soraData?.suwar.map((sora) => {
                if (sora.id == parseInt(surah)) {
                  const formattedId =
                    sora.id.toString().padStart(3, "0") || "000";
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
          </select>
        </div>
      </div>
      <audio ref={audioRef} controls autoPlay className="w-full my-5">
        <source src={audioUrl || ""} type="audio/ogg" />
        <source src={audioUrl || ""} type="audio/mpeg" />
        المتصفح الخاص بك لا يدعم تشغيل الصوت
      </audio>
    </section>
  );
}

export default Banner;
