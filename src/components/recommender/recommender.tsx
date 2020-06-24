import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { fetchAndPopulateGenreSeeds } from '../../store/recommendations/actions';
import './recommender.scss';

const mapStateToProps = (state: RootState) => ({
  access_token: state.authentication.access_token,
  genres: state.recommendation.availableGenreSeeds
});

function mapDispatchToProps(dispatch: any) {
  return {
    fetchAndPopulateGenreSeeds: () => dispatch(fetchAndPopulateGenreSeeds())
  }
}

interface RecommenderProps {
  access_token: string | null;
  genres: Array<string> | null;
  fetchAndPopulateGenreSeeds(): any;
};

export class ConnectedRecommender extends React.Component<RecommenderProps, {}> {

  constructor(props: RecommenderProps) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAndPopulateGenreSeeds();
  }

  recommend() {

  }

  render() {
    return <div className="recommender">
      <header>
        <h1>Find me some Grailz</h1>
      </header>
      <section className="seeds">
        <div className="seed-slots">
          <div className="slot"></div>
          <div className="slot"></div>
          <div className="slot"></div>
          <div className="slot"></div>
          <div className="slot"></div>
        </div>

        <p>You can select up to 5 seeds to base your recommendations on.</p>        
      </section>
      <section className="recommend-button">
        <button onClick={() => this.recommend()}>Recommend something</button>  
      </section>
      <nav>
        <a href="/">Home</a> |
        <a href="/about">About</a>
      </nav>
    </div>;
  }
}

const Recommender = connect(
  mapStateToProps,
  mapDispatchToProps
) (ConnectedRecommender);

export default Recommender;
