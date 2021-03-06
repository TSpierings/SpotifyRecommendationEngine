import * as React from 'react';
import './artist-card.scss';
import { Artist } from '../../interfaces/spotify/artist';

interface ArtistCardProps {
  artist: Artist
}

export class ArtistCard extends React.Component<ArtistCardProps, {}> {

  constructor(props: ArtistCardProps) {
    super(props);
  }

  render() {
    return <>
      <div className="artist-info">
        <img src={this.props.artist.images[0]?.url}/>
        <h3>{this.props.artist.name}</h3>
      </div>      
      <p className='artist-genres'>
        {this.props.artist.genres.map(genre => <span key={genre}>{genre}</span>)}
      </p>
    </>;
  }
}
