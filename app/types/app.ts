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

export interface RecitersData {
  reciters: Reciter[];
}

export interface RewayaData {
  reciters: {
    moshaf: Rewaya[];
  }[];
}

export interface SoraData {
  suwar: Surah[];
}
