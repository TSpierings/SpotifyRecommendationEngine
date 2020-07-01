import * as React from 'react';
import { connect } from 'react-redux';
import { Track } from '../../interfaces/spotify/track';
import { RootState } from '../../store';
import { fetchRecommendationResults } from '../../store/recommendations/actions';
import { TrackCard } from '../track-card/track-card';
import './recommendation-results.scss';

const mapStateToProps = (state: RootState) => ({
  access_token: state.authentication.access_token,
  recommendationResults: state.recommendation.recommendationResults
});

function mapDispatchToProps(dispatch: any) {
  return {
    fetchRecommendationResults: () => dispatch(fetchRecommendationResults()),
  }
}

interface RecommendationResultsProps {
  access_token: string | null;
  recommendationResults: Array<Track> | null;
  fetchRecommendationResults(): any;
};

export class ConnectedRecommendationResults extends React.Component<RecommendationResultsProps, {}> {

  constructor(props: RecommendationResultsProps) {
    super(props);
  }

  render() {
    return <div className="recommendation-results">
      <section className="button">
        <button onClick={() => this.props.fetchRecommendationResults()}>Recommend something</button>
      </section>
      <ul className="tracks">
        {this.props.recommendationResults?.length === 0 ? 
          <span>No results</span> :
          this.props.recommendationResults?.map(track => <li key={track.id}><TrackCard track={track}/></li>)}
      </ul>
    </div>
  }
}

const RecommendationResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedRecommendationResults);

export default RecommendationResults;
