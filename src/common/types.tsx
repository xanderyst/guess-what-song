export interface Artist {
    artistId: number;
    artistLinkUrl: string;
    artistName: string;
    artistType: string;
    primaryGenreId: number;
    primaryGenreName: string;
    wrapperType: string;
  }

  export interface Song {
    wrapperType: string;
    kind: string;
    artistId: string;
    trackId: number;
    artistName: string;
    trackName: string;
    trackViewUrl: string;
    previewUrl: string;
  }