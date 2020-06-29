import * as React from 'react';
import { Artist } from '../../interfaces/spotify/artist';
import { Track } from '../../interfaces/spotify/track';
import './seed-slot.scss';
import { isString } from 'util';

interface SeedSlotProps {
  seed: Artist | Track | string | null;
}

export class SeedSlot extends React.Component<SeedSlotProps, {}> {
  constructor(props: SeedSlotProps) {
    super(props);
  }

  render() {
    if (isString(this.props.seed)) {
      return <span>{this.props.seed}</span>
    }

    if (this.props.seed?.type === 'artist') {
      return <span>{(this.props.seed as Artist).name}</span>
    }

    if (this.props.seed?.type === 'track') {
      return <span>{(this.props.seed as Track).name}</span>
    }

    return <span>Empty</span>
  }
}
