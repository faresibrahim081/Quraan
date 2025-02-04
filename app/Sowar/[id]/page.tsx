"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const Surah = () => {
    const params = useParams();

    const { data } = useQuery({
        queryKey: ["surah", params.id],
        queryFn: async () => {
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${params.id}`);
            return response.json();
        },
        enabled: !!params.id,
    });

    console.log("data", data);

    return (
        <div className="mt-[10rem] w-[80%] mx-auto">
            <div className="bg-[#059669a3] p-5 rounded-lg">
                <h1 className="text-3xl mb-[3rem] text-center font-extrabold text-white sm:text-5xl">
                    {data?.data.name}
                </h1>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                    <h1 className="p-3 rounded-md text-[#059669a3] font-bold bg-white text-xl">
                        عدد الايات: {data?.data.numberOfAyahs}
                    </h1>
                    <h1 className="p-3 rounded-md text-[#059669a3] font-bold bg-white text-xl">
                        مكان النزول: {data?.data.revelationType}
                    </h1>
                    <h1 className="p-3 rounded-md text-[#059669a3] font-bold bg-white text-xl">
                        رقم السورة {data?.data.number}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Surah;
