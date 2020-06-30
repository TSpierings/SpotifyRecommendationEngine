import * as React from 'react';
import { connect } from 'react-redux';
import { isString } from 'util';
import { getRecommendations } from '../../api/recommendations';
import { Artist } from '../../interfaces/spotify/artist';
import { Track } from '../../interfaces/spotify/track';
import { RootState } from '../../store';
import './recommendation-results.scss';

const mapStateToProps = (state: RootState) => ({
  access_token: state.authentication.access_token,
  selectedSeeds: state.recommendation.selectedSeeds
});

function mapDispatchToProps(dispatch: any) {
  return {}
}

interface RecommendationResultsProps {
  access_token: string | null;
  selectedSeeds: Array<Artist | Track | string | null>;
};

export class ConnectedRecommendationResults extends React.Component<RecommendationResultsProps, {}> {

  constructor(props: RecommendationResultsProps) {
    super(props);
  }

  recommend() {
    const tracks = this.props.selectedSeeds
      .filter(seed => !isString(seed) && seed?.type === 'track')
      .map(track => (track as Track).id);
    const artists = this.props.selectedSeeds
      .filter(seed => !isString(seed) && seed?.type === 'artist')
      .map(artist => (artist as Artist).id);
    const genres = this.props.selectedSeeds
      .filter(seed => isString(seed))
      .map(genre => genre! as string);

    getRecommendations(this.props.access_token!, artists, tracks, genres)
      .then(response => {
        console.log(response)
      });
  }

  render() {
    return <section className="recommend-button">
      <button onClick={() => this.recommend()}>Recommend something</button>
    </section>
  }
}

const RecommendationResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedRecommendationResults);

export default RecommendationResults;
