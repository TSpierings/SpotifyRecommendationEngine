import * as React from 'react';
import './track-card.scss';
import { Track } from '../../interfaces/spotify/track';

interface TrackCardProps {
  track: Track
}

export class TrackCard extends React.Component<TrackCardProps, {}> {

  constructor(props: TrackCardProps) {
    super(props);
  }

  render() {
    return <>
      <div className="track-name">
        <img src={this.props.track.album.images[0]?.url}/>
        <h3>{this.props.track.name}</h3>
      </div>      
      <p className='track-info'>
        <span>{this.props.track.artists[0].name}</span>
        <span>{this.props.track.album.name}</span>
      </p>
    </>;
  }
}
