import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./components/ui/button";
import { AutoComplete } from "./components/autocomplete";
import { uniq } from "lodash";
import MusicPlayer from "./MusicPlayer";
import { Song } from "./common/types";
import { useTranslation } from 'react-i18next';

function RenderGuess ({ guess }: {guess: string}) {
    const { t } = useTranslation();
    if (guess === '') return (<>{t("skipped")}</>);
    if (guess) return (<><X color="red"/> {guess}</>);
    return (<></>);
}

interface GuessingPhaseProps {
    randomSong: Song;
    songList: Song[];
    setEndGameMessage: (message: string) => void;
    setAttempts: (attempts: string[]) => void;
}

export default function GuessingPhase({ randomSong, songList, setEndGameMessage, setAttempts }: GuessingPhaseProps) {
    const { t } = useTranslation();
    const [guessSongInput, setGuessSongInput] = useState("");
    const [guessCount, setGuessCount] = useState(0);
    const [playTime, setPlayTime] = useState(1000);
    const [guesses, setGuesses] = useState<string[]>([]);

    const songNames = songList.map((song) => song.trackName);
    const options = uniq(songNames).map((song) => ({ value: song, label: song }));

    const confirmGuess = () => {
        const newGuesses = [...guesses];
        newGuesses[guessCount] = guessSongInput ? guessSongInput : '';

        if (guessSongInput && guessSongInput === randomSong.trackName) {
            setPlayTime(30000);
            setAttempts(newGuesses);
            setEndGameMessage(t("you_win", { time: playTime / 1000 }));
            return;
        }
        if (guessCount === 5) {
            setPlayTime(30000);
            setAttempts(newGuesses);
            setEndGameMessage(t("you_lose"));
            return;
        }
        
        setGuessSongInput('');
        setGuesses(newGuesses);
        setGuessCount(guessCount + 1);
        setPlayTime(playTime + (guessCount + 1) * 1000);
    };

    const computeGuessColor = (number: number) => {
        if((number-1)< guessCount) return 'bg-secondary text-zinc-400';
        if((number-1) === guessCount) return 'border-primary text-zinc-900';
        return 'text-zinc-400 border-zinc-400';
    }

    return (
        <>
            <div className="rounded-3xl pb-8 pl-3 pr-3 space-y-4">
                {[1, 2, 3, 4, 5, 6].map((number) => (
                    <div key={number} className="flex items-center gap-4">
                        <div className={`w-8 h-8 ${computeGuessColor(number)} rounded-full border flex items-center justify-center`}>
                            {number}
                        </div>
                        <div className={`flex-1 h-11 ${computeGuessColor(number)} rounded-full border px-4 flex items-center`}>
                            <span className="flex text-zinc-400">
                                <RenderGuess guess={guesses[number-1]} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <MusicPlayer song={randomSong} sectionDuration={playTime}/>
            <AutoComplete
                options={options}
                emptyMessage={t("no_results")}
                placeholder={t("search_placeholder")}
                onValueChange={setGuessSongInput}
                value={guessSongInput}
            />
            <div className="flex justify-between pt-3">
                <Button variant="secondary" onClick={confirmGuess}>{t("skip")} +{guessCount+1} sec</Button>
                <Button disabled={!guessSongInput} onClick={confirmGuess}>{t("submit")}</Button>
            </div>
        </>
    );
}
