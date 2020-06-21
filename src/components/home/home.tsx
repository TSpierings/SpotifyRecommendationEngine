import * as React from 'react';
import './home.scss';

export class Home extends React.Component<{}, {}> {

  authenticate() {
    const clientId = 'b555c04661b94caabdbf19cdc57170b5';
    const responseType = 'token';
    const redirectUri = 'http://localhost:3000/authenticate';
    const state = Math.round(Math.random() * 1000000);
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&state=${state}`;
  }

  render() {
    return <div>
      <h1>This is home</h1>
      <button onClick={() => this.authenticate()}>Click here to authenticate Spotify</button>
    </div>;
  }
}
