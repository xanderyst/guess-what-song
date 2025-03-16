import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import ArtistsList from "./ArtistsList";
import GuessSongContainer from "./GuessSongContainer";
import { useState, useEffect } from "react";
import logo from "./assets/guess-what-song-logo.svg";
import useFetch from "./hooks/useFetch";
import { Artist } from './common/types';

// Define response type for API
interface ItunesApiResponse {
  results: Artist[];
}

function App() {
  const [artistInput, setArtistInput] = useState<string>("");
  const [debouncedArtist, setDebouncedArtist] = useState<string | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Debounce user input but only update if there's input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedArtist(artistInput), 300);
    return () => clearTimeout(handler);
  }, [artistInput]);

  const searchUrl = debouncedArtist
    ? `https://itunes.apple.com/search?term=${encodeURIComponent(
        debouncedArtist
      )}&media=music&entity=musicArtist&limit=10&lang=zh_tw&country=tw`
    : null; // Prevent API call when search is empty

  const { data, error } = useFetch<ItunesApiResponse>(searchUrl);

  const onArtistClick = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  const fetchNewArtist = () => {
    setSelectedArtist(null);
    setArtistInput("");
    setDebouncedArtist(null);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center">
        <img className="h-20 m-6" src={logo} alt="Guess What Song Logo" />
        <h1 className="text-2xl font-bold mb-8">Guess What Song?</h1>
      </div>

      {!selectedArtist && (
        <div>
          <h4 className="font-medium mt-4 mb-7">
            Search for an artist, and we'll randomly play a snippet of one of
            their songs. You have 6 chances to guess the correct song title! We
            support multiple languages.
          </h4>
          <Input
            placeholder="Search artist..."
            value={artistInput}
            onChange={(e) => setArtistInput(e.target.value)}
            className="border p-2 w-full"
          />
          <Button
            className="mt-4 p-2 text-white rounded w-full"
            onClick={() => setDebouncedArtist(artistInput)}
            disabled={!artistInput.trim()} // Disable search if empty
          >
            Search
          </Button>

          {error && <p>Error fetching data {error.toString()}</p>}
          {debouncedArtist && data && <ArtistsList artists={data.results} selectArtist={onArtistClick} />}
        </div>
      )}

      {selectedArtist && <GuessSongContainer artist={selectedArtist} fetchNewArtist={fetchNewArtist} />}
    </main>
  );
}

export default App;
