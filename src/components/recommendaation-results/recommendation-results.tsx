import * as React from 'react';
import { connect } from 'react-redux';
import { Track } from '../../interfaces/spotify/track';
import { RootState } from '../../store';
import { fetchRecommendationResults } from '../../store/recommendations/actions';
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
    return <section className="recommend-button">
      <button onClick={() => this.props.fetchRecommendationResults()}>Recommend something</button>
    </section>
  }
}

const RecommendationResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedRecommendationResults);

export default RecommendationResults;
