"use client";
import { createContext, useContext, useState, useRef, ReactNode } from "react";

interface AudioContextType {
    currentAudio: string | null;
    setCurrentAudio: (url: string | null) => void;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    playAudio: (url: string) => void;
    stopAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>({
    playAudio: () => { },
    stopAudio: () => { },
    currentAudio: null,
    setCurrentAudio: () => { },
    audioRef: { current: null },
});

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentAudio, setCurrentAudio] = useState<string | null>(null);

    const playAudio = (url: string) => {
        if (audioRef.current && currentAudio !== url) {
            setCurrentAudio(url);
            if (audioRef.current.src !== url) {
                audioRef.current.src = url;
                audioRef.current.play();
            }
        }
    };

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setCurrentAudio(null);
        }
    };

    return (
        <AudioContext.Provider
            value={{
                currentAudio,
                setCurrentAudio,
                audioRef,
                playAudio,
                stopAudio,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};
