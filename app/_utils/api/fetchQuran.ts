import { RewayaData, SoraData } from "@/app/types/app";
import { useQuery } from "@tanstack/react-query";

const apiUrl = "https://www.mp3quran.net/api/v3";

export function useFetchSelectSurah() {
  return useQuery<SoraData>({
    queryKey: ["surah"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/suwar`);
      if (!response.ok) throw new Error("Failed to fetch surah");
      return response.json();
    },
    staleTime: Infinity,
  });
}

export function useFetchRewaya(rewaya: string | null) {
  return useQuery<RewayaData>({
    queryKey: ["rewaya", rewaya],
    queryFn: async () => {
      if (!rewaya) return null;
      const response = await fetch(
        `${apiUrl}/reciters?language=ar&reciter=${rewaya}`
      );
      if (!response.ok) throw new Error("Failed to fetch rewaya");
      return response.json();
    },
    enabled: Boolean(rewaya),
  });
}

export function useFetchReciters() {
  return useQuery({
    queryKey: ["reciters"],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/reciters?language=ar`);
      if (!response.ok) throw new Error("Failed to fetch reciters");
      return response.json();
    },
  });
}
export function useFetchSowar() {
  return useQuery({
    queryKey: ["sowar"],
    queryFn: async () => {
      const response = await fetch(`https://quran.i8x.net/api/surahs`);
      if (!response.ok) throw new Error("Failed to fetch sowar");
      return response.json();
    },
    staleTime: Infinity,
  });
}
export function useFetchSingleSurah(params: { id: number | undefined }) {
  return useQuery({
    queryKey: ["surah", params.id],
    queryFn: async () => {
      if (!params.id) return null;
      const response = await fetch(
        `https://quran.i8x.net/api/verses?surah_id=${params.id}`
      );
      if (!response.ok) throw new Error("Failed to fetch single surah");
      return response.json();
    },
    staleTime: Infinity,
    enabled: Boolean(params.id),
  });
}
