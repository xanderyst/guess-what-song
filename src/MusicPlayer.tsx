import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react"; // Added Pause icon
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function MusicPlayer({ song, sectionDuration, total=16000 }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const totalSeconds = total/1000;
  const { previewUrl } = song;
  
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // ✅ Track current time

  const sectionProgress = (sectionDuration / total) * 100;

  const formattedTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
      }, sectionDuration);
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = previewUrl;
      audioRef.current.load();
      setProgress(0);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [previewUrl]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const { currentTime } = audioRef.current;
        setProgress((currentTime / totalSeconds) * 100 || 0);
        setCurrentTime(currentTime); // ✅ Update currentTime state
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      const remainingTime = sectionDuration - audioRef.current.currentTime * 1000;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
      }, remainingTime);
    }
  }, [sectionDuration]);

  return (
    <div className="p-3 flex flex-col items-center">
      <audio ref={audioRef}>
        <source src={previewUrl} type="audio/mpeg" />
      </audio>
      <Progress
        className="h-3 bg-stone-300 w-full"
        segments={[
          { value: progress, color: "bg-purple-600" },
          { value: sectionProgress, color: "bg-purple-400" },
        ]}
      />
      {/* ✅ Timestamp below the progress bar */}
      <div className="text-sm text-gray-600 mt-1">
        {formattedTime(currentTime)} / {formattedTime(totalSeconds)}
      </div>
      <Button 
        onClick={isPlaying ? pauseSong : playSong} 
        className="rounded-full mt-2" 
        size="icon"
      >
        {isPlaying ? <Pause /> : <Play />}
      </Button>
    </div>
  );
}
