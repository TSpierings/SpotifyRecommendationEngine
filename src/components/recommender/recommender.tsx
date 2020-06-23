import * as React from 'react';
import './recommender.scss';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { isNull } from 'util';

const mapStateToProps = (state: RootState) => ({
  access_token: state.authentication.access_token
});

interface RecommenderProps {
  access_token: string | null;
};

export class ConnectedRecommender extends React.Component<RecommenderProps, {}> {

  constructor(props: RecommenderProps) {
    super(props);
  }

  recommend() {
    if (isNull( this.props.access_token)) {
      console.log('no access token');
      return;
    }

    const recommendationApi = 'https://api.spotify.com/v1/recommendations';
    const seedGenres = 'forro';
    const request = new Request(`${recommendationApi}?seed_genres=${seedGenres}`);
    request.headers.set('Authorization', 'Bearer ' + this.props.access_token);

    fetch(request)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  render() {
    return <>
      <h1>This is recommender</h1>
      <button onClick={() => this.recommend()}>Recommend something</button>
    </>;
  }
}

const Recommender = connect(mapStateToProps) (ConnectedRecommender);

export default Recommender;
