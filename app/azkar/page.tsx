"use client";
import { useState } from "react";
import azkar from "@/public/data/ar.json";
import { FaSun, FaMoon, FaRegCopy, FaCheckCircle } from "react-icons/fa";
import { RiGlobalFill } from "react-icons/ri";
import type { Zekr, AzkarData } from "@/app/types/azkar";

export default function AzkarPage() {
  const [activeCategory, setActiveCategory] = useState("الصباح");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [counters, setCounters] = useState<Record<string, number>>({});
  const typedAzkar = azkar as AzkarData;

  const categoryTypeMap: Record<string, number> = {
    "عامة": 0,
    "الصباح": 1,
    "المساء": 2,
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1000);
  };

  const getZekrCount = (id: string): number => {
    const zekr = typedAzkar.find((z: Zekr) => String(z.order) === id);
    return zekr?.count || 1;
  };

  const handleDecrement = (id: string) => {
    setCounters((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? getZekrCount(id)) - 1),
    }));
  };

  const filteredAzkar = typedAzkar.filter(
    (z: Zekr) => z.type === categoryTypeMap[activeCategory]
  );

  return (
    <div className="min-h-screen mt-[70px] py-10 px-4">
      <div className="md:w-[90%] mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          أذكار {activeCategory}
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveCategory("الصباح")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
              activeCategory === "الصباح"
                ? "bg-yellow-400 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            الصباح
            <FaSun /> 
          </button>

          <button
            onClick={() => setActiveCategory("المساء")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
              activeCategory === "المساء"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            المساء
            <FaMoon /> 
          </button>

          <button
            onClick={() => setActiveCategory("عامة")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
              activeCategory === "عامة"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            عامة
            <RiGlobalFill /> 
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAzkar.map((item: Zekr) => (
            <div
              key={item.order}
              className="bg-white flex flex-col justify-between shadow-md rounded-xl p-5 border right-to-left"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  التكرار: {item.count}
                </span>
                <span className="text-sm text-gray-500 w-8/12 line-clamp-2">{item.source}</span>
              </div>

              <p className="text-gray-800 text-lg leading-relaxed mb-4">
                {item.content}
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleCopy(String(item.order), item.content)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  {copiedId === String(item.order) ? (
                    <>
                      <FaCheckCircle className="text-green-500" />
                      تم النسخ
                    </>
                  ) : (
                    <>
                      <FaRegCopy />
                      نسخ الذكر
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDecrement(String(item.order))}
                  className="px-3 py-1.5 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                >
                  {counters[String(item.order)] ??
                    getZekrCount(String(item.order))}{" "}
                  عدّ التكرار
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
