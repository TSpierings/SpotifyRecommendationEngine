/**
 * All authentication constants necessary for Spotify's authentication API.
 */
export const AuthenticationDetails = {
  uri: 'https://accounts.spotify.com/authorize',
  clientId: 'b555c04661b94caabdbf19cdc57170b5',
  responseType: 'token',
  redirectUri: 'http://localhost:3000/authenticate',
  scopes: 'user-read-private'
}

/**
 * A redirect to Spotify's authenticate URI with the necessary authentication details.
 */
export function authenticate() {
  window.location.href = `${AuthenticationDetails.uri}?client_id=${AuthenticationDetails.clientId}&response_type=${AuthenticationDetails.responseType}&redirect_uri=${AuthenticationDetails.redirectUri}&scopes=${AuthenticationDetails.scopes}`;
}
