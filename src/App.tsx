import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import ArtistsList from './ArtistsList';
import GuessSongContainer from "./GuessSongContainer";
import { useState, useEffect } from 'react';
import useFetch from "./hooks/useFetch";
import { uniq } from "lodash";
import logo from './assets/guess-what-song-logo.svg';

interface Artist {
  artistId: number,
  artistLinkUrl: string,
  artistName: string,
  artistType: string,
  primaryGenreId: number,
  primaryGenreName: string,
  wrapperType: string
}

function App() {
  const fetchArtists = async (query: string) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&media=music&entity=musicArtist&limit=10&lang=zh_tw&country=tw`;
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    const { results } = data;
    setArtistList(results);
    setLoading(false);
    console.log('data', data);
  }

  const onArtistClick = async (artist) => {
    setSelectedArtist(artist);
  }

  const fetchNewArtist = () => {
    setSelectedArtist(null);
    setArtistInput('');
  }

  const [loading, setLoading] = useState(false);
  const [artistInput, setArtistInput] = useState('');
  const [debouncedArtist, setDebouncedArtist] = useState('');
  const [artistList, setArtistList] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {setDebouncedArtist(artistInput)}, 50);
    return () => clearTimeout(handler);
  }, [artistInput]);

  useEffect(() => {
    fetchArtists(debouncedArtist);
  }, [debouncedArtist]);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        <img className="h-20 m-6" src={logo} alt="" />
        <h1 className="text-2xl font-bold mb-8">Guess What Song?</h1>
      </div>
      {
        !selectedArtist &&
        <div>
          <h4 className="font-medium mt-4 mb-7">Search for an artist, and we'll randomly play a snippet of one of their songs. You have 6 chances to guess the correct song title! We support multiple languages.</h4>
          <h1 className="text-2xl font-bold mb-4"></h1>
          <Input placeholder="Search artist..." value={artistInput} onChange={(e) => setArtistInput(e.target.value)} className="border p-2 w-full"></Input>
          <Button
            className="mt-4 p-2 text-white rounded w-full"
            onClick = {()=>(fetchArtists(artistInput))}
          >Search</Button>
          <ArtistsList artists={artistList} selectArtist={onArtistClick}/>
        </div>
      }
      { selectedArtist && <GuessSongContainer artist={selectedArtist} fetchNewArtist={fetchNewArtist}/> }
    </main>
  );
}

export default App;
