export type ZekrType = 0 | 1 | 2;

export interface Zekr {
  order: number;
  content: string;
  count: number;
  count_description: string;
  fadl: string;
  source: string;
  type: ZekrType;
  audio: string;
  hadith_text: string;
  explanation_of_hadith_vocabulary: string;
}

export type AzkarData = Zekr[];
