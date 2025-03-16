import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./components/ui/button";
import { AutoComplete } from "./components/autocomplete";
import { uniq } from "lodash";
import MusicPlayer from "./MusicPlayer";

function RenderGuess ({ guess }: {guess: string}) {
    if(guess === '') return (<>Skipped</>);
    if(guess) return (<><X color="red"/> {guess}</>)
    return (<></>)
}

interface GuessingPhaseProps {
    randomSong: any;
    songList: any[];
    setEndGameMessage: (message: string) => void;
    setAttempts: (attempts: string[]) => void;
}

export default function GuessingPhase({ randomSong, songList, setEndGameMessage, setAttempts }: GuessingPhaseProps) {
    const [guessSongInput, setGuessSongInput] = useState("");
    const [guessCount, setGuessCount] = useState(0);
    const [playTime, setPlayTime] = useState(1000);
    const [guesses, setGuesses] = useState([]);

    const songNames = songList.map((song) => song.trackName); // Single song guessing
    const options = uniq(songNames).map((song) => ({ value: song, label: song }));

    const confirmGuess = () => {
        const newGuesses = [...guesses];
        newGuesses[guessCount] = guessSongInput ? guessSongInput : '';
        if (guessSongInput && guessSongInput === randomSong.trackName) {
            setPlayTime(30000);
            setAttempts(newGuesses);
            setEndGameMessage(`You win! You got it within ${playTime / 1000} seconds`);
            return;
        }
        if (guessCount === 5) {
            setPlayTime(30000);
            setAttempts(newGuesses);
            setEndGameMessage('You lose! Better luck next time.');
            return;
        }
        setGuessSongInput('');
        setGuesses(newGuesses);
        setGuessCount(guessCount + 1);
        setPlayTime(playTime + (guessCount + 1) * 1000);
    };

    const computeGuessColor = (number: number) => {
        if((number-1)< guessCount) return 'bg-secondary';
        if((number-1) === guessCount) return 'border-primary text-zinc-900';
        return ''
    }

    return (
        <>
            <div className="rounded-3xl pb-8 pl-3 pr-3 space-y-4">
                {[1, 2, 3, 4, 5, 6].map((number) => (
                    <div key={number} className="flex items-center gap-4">
                        <div className={`w-8 h-8 ${computeGuessColor(number)} rounded-full border border-zinc-400 flex items-center justify-center text-zinc-400`}>
                            {number}
                        </div>
                        <div className={`flex-1 h-11 ${computeGuessColor(number)} rounded-full border border-zinc-400 px-4 flex items-center`}>
                            <span className="flex text-zinc-400">
                                <RenderGuess guess={guesses[number-1]}/>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <MusicPlayer song={randomSong} sectionDuration={playTime}/>
            <AutoComplete
                options={options}
                emptyMessage="No results."
                placeholder="Know it? Search for the title!"
                onValueChange={setGuessSongInput}
                value={guessSongInput}
            />
            <div className="flex justify-between pt-3">
                <Button variant="secondary" onClick={confirmGuess}>Skip +{guessCount+1} sec</Button>
                <Button disabled={!guessSongInput} onClick={confirmGuess}>Submit</Button>
            </div>
        </>
    );
}
