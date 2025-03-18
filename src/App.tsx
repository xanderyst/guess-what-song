import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import ArtistsList from "./ArtistsList";
import GuessSongContainer from "./GuessSongContainer";
import { useState, useEffect } from "react";
import logo from "./assets/guess-what-song-logo.svg";
import useFetch from "./hooks/useFetch";
import { Artist } from './common/types';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./components/LanguageSwitcher"; // Import the toggle component

// Define response type for API
interface ItunesApiResponse {
  results: Artist[];
}

function App() {
  const { t, i18n } = useTranslation(); // Get language settings
  const [artistInput, setArtistInput] = useState<string>("");
  const [debouncedArtist, setDebouncedArtist] = useState<string | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Map language to corresponding country and language codes
  const langMap: Record<string, { lang: string; country: string }> = {
    "zh-TW": { lang: "zh_tw", country: "tw" },
    "en-US": { lang: "en_us", country: "us" },
  };
  
  // Get current language settings or default to 'en-US'
  const { lang, country } = langMap[i18n.language] || langMap["en-US"];

  const processAndSetDebounceArtist = () => {
    const newArtistInput = artistInput.replace(' ', '+');
    setDebouncedArtist(newArtistInput);
  }

  // Debounce user input but only update if there's input
  useEffect(() => {
    const handler = setTimeout(() => {
      processAndSetDebounceArtist();
    }, 300);
    return () => clearTimeout(handler);
  }, [artistInput]);

  // const searchUrl = debouncedArtist
  //   ? `https://itunes.apple.com/search?term=${encodeURIComponent(
  //       debouncedArtist
  //     )}&media=music&entity=musicArtist&limit=10&lang=zh_tw&country=tw`
  //   : null; // Prevent API call when search is empty

  // const searchUrl = debouncedArtist
  //   ? `https://itunes.apple.com/search?term=${encodeURIComponent(
  //       debouncedArtist
  //     )}&entity=musicArtist&limit=10`
  //   : null; // Prevent API call when search is empty

  // Dynamically update search URL based on language
  const searchUrl = debouncedArtist
    ? `https://itunes.apple.com/search?term=${encodeURIComponent(
        debouncedArtist
      )}&entity=musicArtist&lang=${lang}&country=${country}`
    : null;

  const { data } = useFetch<ItunesApiResponse>(searchUrl);

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
      <div className="flex items-center justify-between w-full mt-6 mb-6">
        <div className="flex-1"></div> {/* Empty div to push logo to center */}
        <img className="h-20 mx-auto" src={logo} alt="Guess What Song Logo" />
        <div className="flex-1 flex justify-end self-start">
          <LanguageSwitcher />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8">{t("title")}</h1>
      </div>

      {!selectedArtist && (
        <div>
          <h4 className="font-medium mt-4 mb-7">
          {t("search_description")}
          </h4>
          <Input
            placeholder={t("search_artist")}
            value={artistInput}
            onChange={(e) => setArtistInput(e.target.value)}
            className="border p-2 w-full"
          />
          <Button
            className="mt-4 p-2 text-white rounded w-full"
            onClick={() => processAndSetDebounceArtist()}
            disabled={!artistInput.trim()} // Disable search if empty
          >
            {t("search")}
          </Button>
          {debouncedArtist && data && <ArtistsList artists={data.results} selectArtist={onArtistClick} />}
        </div>
      )}

      {selectedArtist && <GuessSongContainer artist={selectedArtist} fetchNewArtist={fetchNewArtist} />}
    </main>
  );
}

export default App;
