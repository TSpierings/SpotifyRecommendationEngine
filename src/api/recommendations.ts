/**
 * Retrieve all possible genres usable to seed a recommendation query.
 * @returns An array of strings containing genre names.
 */
export function getAvailableGenreSeeds(accessToken: string): Promise<Response> {
  const request = new Request('https://api.spotify.com/v1/recommendations/available-genre-seeds');
  request.headers.set('Authorization', 'Bearer ' + accessToken);

  return fetch(request);
}

/**
 * Get recommendations based on given seeds.
 */
export function getRecommendations(
  accessToken: string,
  seedTracks: Array<string> = [],
  seedGenres: Array<string> = [],
  seedArtists: Array<string> = []
): Promise<Response> {
  const apiUri = 'https://api.spotify.com/v1/recommendations';
  const request = new Request(`${apiUri}?seed_tracks=${seedTracks.join(',')}&seed_genres=${seedGenres.join(',')}&seed_artists=${seedArtists.join(',')}`);
  request.headers.set('Authorization', 'Bearer ' + accessToken);

  return fetch(request);
}
