"use client";

import { useState } from "react";
import azkar from "@/public/data/azkar"; // Make sure your azkar data has a proper type definition
import { FaSun, FaMoon, FaRegCopy, FaCheckCircle } from "react-icons/fa";

export default function AzkarPage() {
  const [activeCategory, setActiveCategory] = useState<string>("الصباح");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [counters, setCounters] = useState<Record<string, number>>({}); // {id: count}

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1000);
  };

  const handleDecrement = (id: string) => {
    setCounters((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || getZekrCount(id)) - 1),
    }));
  };

  const getZekrCount = (id: string): number => {
    const zekr = azkar.find((z) => String(z.id) === id);
    return zekr?.count || 1;
  };

  const filteredAzkar = azkar.filter((z) => z.category === activeCategory);

  return (
    <div className="min-h-screen mt-[70px] py-10 px-4">
      <div className="max-w-7xl mx-auto">
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
            <FaSun /> الصباح
          </button>
          <button
            onClick={() => setActiveCategory("المساء")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${
              activeCategory === "المساء"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <FaMoon /> المساء
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAzkar.map((item) => (
            <div
              key={item.id}
              className="bg-white flex flex-col justify-between shadow-md rounded-xl p-5 border right-to-left"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  التكرار: {item.count}
                </span>
                <span className="text-sm text-gray-500">
                  {item.reference}
                </span>
              </div>

              <p className="text-gray-800 text-lg leading-relaxed mb-4">
                {item.zekr}
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleCopy(String(item.id), item.zekr)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  {copiedId === String(item.id) ? (
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
                  onClick={() => handleDecrement(String(item.id))}
                  className="px-3 py-1.5 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                >
                  {counters[String(item.id)] ?? 
                  getZekrCount(String(item.id))}  عدّ التكرار
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}