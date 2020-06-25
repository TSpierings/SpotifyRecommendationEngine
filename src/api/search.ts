export enum SearchTypes {
  Artist = 'artist',
  Track = 'track',
  Album = 'album',
  Playlist = 'playlist',
  Show = 'show',
  Episode = 'episode'
}

/**
 * Search the Spotify API for albums, artists, playlists, tracks, shows or episodes.
 * https://developer.spotify.com/documentation/web-api/reference-beta/#category-search
 */
export function getSearchItems(
  accessToken: string,
  query: string,
  types: Array<SearchTypes>
): Promise<Response> {
  const apiUri = 'https://api.spotify.com/v1/search';
  const request = new Request(`${apiUri}?q=${query}&type=${types.join(',')}`);
  request.headers.set('Authorization', 'Bearer ' + accessToken);

  return fetch(request);
}
