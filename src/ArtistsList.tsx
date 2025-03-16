export default function ArtistsList ({artists, selectArtist}) {
    console.log('artists', artists);
    return <div className="mt-4">
        {artists.map((artist) => (
            <div key={artist.artistId} onClick = {()=>{selectArtist(artist)}} className="p-4 border-b cursor-pointer hover:bg-gray-100">{artist.artistName}</div>
        ))}
    </div>
}