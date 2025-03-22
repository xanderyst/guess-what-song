import { useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import GuessingPhase from "./GuessingPhase";
import GameEndPhase from "./GameEndPhase";
import { Skeleton } from "./components/ui/skeleton";
import { Artist, Song } from "./common/types";
import { Button } from "./components/ui/button";
import { useTranslation } from 'react-i18next';
import { langMap, chineseGenre } from "./common/constants";

interface GuessSongContainerProps {
  artist: Artist;
  fetchNewArtist: () => void;
}

interface ItunesApiResponse {
  results: Song[];
}

const computeCountry = (genre:string, country:string) => {
  if(!genre) return country;
  return chineseGenre.some(word => genre.toLowerCase().includes(word.toLowerCase())) ? 'tw' : country;
};

const normalizeSongName = (song: Song): string => {
  const original = song.trackName.split('(')[0].trim();
  const capitalized = original.replace(/\b\w/g, char => char.toUpperCase());
  return capitalized;
}

export default function GuessSongContainer({ artist, fetchNewArtist }: GuessSongContainerProps) {
  const { t, i18n } = useTranslation(); // Get language settings
  const { artistId, primaryGenreName } = artist;
  // Get current language settings or default to 'en-US'
  const { country } = langMap[i18n.language] || langMap["en-US"];
  const computedCountry = computeCountry(primaryGenreName, country);

  //  const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=200&lang=zh_tw&country=tw`;
  const url = `https://corsanywhere-hsptaajs.b4a.run/https://itunes.apple.com/lookup?id=${artistId}&entity=song&limit=200&country=${computedCountry}`;
  const { loading, data, error } = useFetch<ItunesApiResponse>(url);
  
  const [randomSong, setRandomSong] = useState<Song | null>(null);
  const [endGameMessage, setEndGameMessage] = useState<string>("");
  const [attempts, setAttempts] = useState<string[]>([]);

  const songs = data?.results?.filter((item) => item.wrapperType === "track").map((song) => {
    return {...song, trackName: normalizeSongName(song)};
  }) || [];

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

  if (loading)
    return (
      <div className="flex flex-col items-center pt-30 gap-10">
        {emptyArray.map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <Skeleton className="bg-gray-200 h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="bg-gray-200 h-4 w-[250px]" />
              <Skeleton className="bg-gray-200 h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );

  if (error) return <div>There is an error</div>;
  if (!loading && !songs.length) return (
    <div className="flex flex-col items-center font-medium mt-4">
    {t("artist_no_songs")}
    <Button className="mt-7" onClick={fetchNewArtist}>{t("different_artist")}</Button>
    </div>
  )
  return (
    <>
      {data && randomSong && (
        <div>
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
      )}
    </>
  );
}
