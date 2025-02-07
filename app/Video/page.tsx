"use client"
import Link from "next/link";
import { useRef } from "react";
import Hls from "hls.js";
import { useAudio } from "../Context/AudioContext";

function Video() {
    const { stopAudio } = useAudio();

    const videoRef = useRef<HTMLVideoElement | null>(null);

    const playVideo = (url: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        stopAudio();
        e.preventDefault();
        if (videoRef.current) {
            const video = videoRef.current;

            if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url;
                video.load();
                video.play();
            } else {
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play();
                });
            }
        }
    };
    return (
        <div style={{ backgroundImage: `url(/images/bg-quran-2.jpg)` }}
            className="mt-[10rem] relative bg-cover bg-center bg-no-repeat py-10">
            <div id="video" className="w-[80%] mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800 sm:text-5xl">اختر قناة البث المباشر</h1>
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <Link
                            className="inline-block rounded-md border border-teal-600 bg-teal-600 px-12 py-3 text-md font-bold text-white hover:bg-transparent hover:text-teal-600 focus:ring-3 focus:outline-hidden"
                            href="" onClick={playVideo('https://win.holol.com/live/quran/playlist.m3u8')}
                        >
                            قناة القران الكريم
                        </Link>
                        <Link
                            className="inline-block rounded-md border border-teal-600 px-12 py-3 text-md font-bold text-teal-600 hover:bg-teal-600 hover:text-white focus:ring-3 focus:outline-hidden"
                            href="" onClick={playVideo('https://win.holol.com/live/sunnah/playlist.m3u8')}
                        >
                            قناة السنة النبوية
                        </Link>
                    </div>
                </div>
                <video ref={videoRef} width="100%" height="auto" controls>
                    <source src="" type="video/mp4" />
                    <source src="" type="video/ogg" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default Video;
