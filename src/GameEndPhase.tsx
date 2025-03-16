import { Button } from "./components/ui/button";
import AppleMusicEmbed from "./components/apple-music-embed";
import MusicPlayer from "./MusicPlayer";
import AttemptVisualizer from "./components/attempt-visualizer";

interface GameEndPhaseProps {
    randomSong: any;
    endGameMessage: string;
    selectRandomSong: () => void;
    fetchNewArtist: () => void;
    attempts: string[]
}

export default function GameEndPhase({ randomSong, endGameMessage, selectRandomSong, fetchNewArtist, attempts }: GameEndPhaseProps) {
    console.log('attempts', attempts);
    return (
        <div>
            <AppleMusicEmbed songUrl={randomSong.trackViewUrl}/>
            <div className="flex flex-col gap-4 items-center">
                <div className="pt-10">{endGameMessage}</div>
                <AttemptVisualizer
                    attempts={attempts}
                    correctAnswer={randomSong.trackName}
                    max={6}
                />
                <Button onClick={selectRandomSong}>Give me another song</Button>
                <Button variant="link" onClick={fetchNewArtist}>Try a different artist</Button>
            </div>
            <MusicPlayer song={randomSong} sectionDuration={30000} total={30000}/>
        </div>
    );
}
