import * as React from 'react';
import './home.scss';

export class Home extends React.Component<{}, {}> {

  authenticate() {
    const clientId = 'b555c04661b94caabdbf19cdc57170b5';
    const responseType = 'token';
    const redirectUri = 'http://localhost:3000/authenticate';
    const state = Math.round(Math.random() * 1000000);
    const scopes = 'user-read-private'
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&state=${state}&show_dialog=false&scopes=${scopes}`;
  }

  render() {
    return <div className="content">
      <header>
        <h1>Some sweet app name</h1>
      </header>
      <section className="info">
        <p>This application requires permission to search the spotify library for tracks/artists/genres. For that we require your authorization.</p>
        <p>By clicking the button below, you will be redirected to Spotify, there you need to login and authorize the app for the mentioned permissions.</p>
      </section>
      <section className="authorization">
        <button onClick={() => this.authenticate()}>Click here to authenticate Spotify</button>
      </section>      
    </div>;
  }
}
