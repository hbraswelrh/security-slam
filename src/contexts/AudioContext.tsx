import React, { createContext, useContext, useRef, ReactNode } from "react";

interface AudioContextType {
  currentAudio: React.MutableRefObject<HTMLAudioElement | null>;
  currentCloseCallback: React.MutableRefObject<(() => void) | null>;
  setCurrentAudio: (audio: HTMLAudioElement | null, closeCallback?: () => void) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currentAudio = useRef<HTMLAudioElement | null>(null);
  const currentCloseCallback = useRef<(() => void) | null>(null);

  const setCurrentAudio = (audio: HTMLAudioElement | null, closeCallback?: () => void) => {
    if (currentAudio.current && currentAudio.current !== audio) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
      // Close the previous player's UI
      if (currentCloseCallback.current) {
        currentCloseCallback.current();
      }
    }
    currentAudio.current = audio;
    currentCloseCallback.current = closeCallback || null;
  };

  return (
    <AudioContext.Provider value={{ currentAudio, currentCloseCallback, setCurrentAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};
