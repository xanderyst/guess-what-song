import { Artist } from './common/types';

interface ArtistsListProps {
    artists: Artist[];
    selectArtist: (artist: Artist) => void;
}

export default function ArtistsList({ artists, selectArtist }: ArtistsListProps) {
    return (
        <div className="mt-4">
        {artists.map((artist) => (
            <div
                key={artist.artistId}
                onClick={() => selectArtist(artist)}
                className="p-4 border-b cursor-pointer hover:bg-gray-100 flex"
            >
            {artist.artistName} {artist.primaryGenreName && <div className="ml-1 text-zinc-400">({artist.primaryGenreName})</div>}
            </div>
        ))}
        </div>
    );
}
  