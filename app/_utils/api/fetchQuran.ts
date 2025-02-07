import { RewayaData, SoraData } from "@/app/types/app";
import { useQuery } from "@tanstack/react-query";

const apiUrl = "https://www.mp3quran.net/api/v3";

export function useFetchSelectSurah() {
  return useQuery<SoraData>({
    queryKey: ["surah"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/suwar`);
      return response.json();
    },
  });
}

export function useFetchRewaya(rewaya: string | null) {
  return useQuery<RewayaData>({
    queryKey: ["rewaya", rewaya],
    queryFn: async () => {
      const response = await fetch(
        `${apiUrl}/reciters?language=ar&reciter=${rewaya}`
      );
      return response.json();
    },
  });
}

export function useFetchReciters() {
  return useQuery({
    queryKey: ["reciters"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/reciters?language=ar`);
      return response.json();
    },
  });
}
export function useFetchSowar() {
  return useQuery({
    queryKey: ["sowar"],
    queryFn: async () => {
      const response = await fetch(`https://quran.i8x.net/api/surahs`);
      return response.json();
    },
  });
}
export function useFetchSingleSurah(params: { id: number | undefined }) {
  return useQuery({
    queryKey: ["surah", params.id],
    queryFn: async () => {
      const response = await fetch(
        `https://quran.i8x.net/api/verses?surah_id=${params.id}`
      );
      return response.json();
    },
    enabled: !!params.id,
  });
}
