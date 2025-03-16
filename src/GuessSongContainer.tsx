import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import GuessingPhase from './GuessingPhase';
import GameEndPhase from './GameEndPhase';
import { Skeleton } from './components/ui/skeleton';
import AppleMusicEmbed from './components/apple-music-embed';
export default function GuessSongContainer({ artist, fetchNewArtist }) {
    const { artistId } = artist;
    const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=200&lang=zh_tw&country=tw`;
    const { loading, data, error } = useFetch(url);
    const [randomSong, setRandomSong] = useState(null);
    const [endGameMessage, setEndGameMessage] = useState("");
    const [attempts, setAttempts] = useState([]);

    const songs = data?.results?.filter(item => item.wrapperType === "track") || [];
    console.log('songs', songs);
    useEffect(() => {
        if (songs.length > 0) {
            selectRandomSong();
        }
    }, [data]);

    const selectRandomSong = () => {
        if (songs.length > 0) {
            const randomSongIndex = Math.floor(Math.random() * songs.length);
            setRandomSong(songs[randomSongIndex]);
            setEndGameMessage(""); // Reset end game message
        }
    };

    const emptyArray = new Array(6).fill(0);

    if (loading) return (<>
    <div className="flex flex-col items-center pt-30 gap-10">
        {emptyArray.map((_, index) => {
            return <div key={index} className="flex items-center space-x-4">
            <Skeleton className="bg-gray-200 h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="bg-gray-200 h-4 w-[250px]" />
                <Skeleton className="bg-gray-200 h-4 w-[200px]" />
            </div>
        </div>
        })}
    </div>
    </>)
    if (error) return <div>There is an error</div>;

    return (
        <>{
            data && randomSong &&
            <div>
                {/* <div className="p-10" style={{display: endGameMessage ? 'block' : 'none'}}>
                    <AppleMusicEmbed songUrl={randomSong.trackViewUrl}/>
                </div> */}
                {endGameMessage ? (
                    <GameEndPhase 
                        randomSong={randomSong}
                        endGameMessage={endGameMessage}
                        selectRandomSong={selectRandomSong}
                        fetchNewArtist={fetchNewArtist}
                        attempts={attempts}
                    />
                ) : (
                    <GuessingPhase 
                        randomSong={randomSong}
                        songList={songs}
                        setEndGameMessage={setEndGameMessage}
                        setAttempts={setAttempts}
                    />
                )}
            </div>
        }
        </>
    );
}
