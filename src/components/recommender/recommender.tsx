import * as React from 'react';
import { connect } from 'react-redux';
import { Artist } from '../../interfaces/spotify/artist';
import { Track } from '../../interfaces/spotify/track';
import { RootState } from '../../store';
import { fetchAndPopulateGenreSeeds, setActiveSeedSlot } from '../../store/recommendations/actions';
import CombinedSearch from '../combined-search/combined-search';
import './recommender.scss';
import { SeedSlot } from '../seed-slot/seed-slot';
import { getRecommendations } from '../../api/recommendations';
import { isString } from 'util';

const mapStateToProps = (state: RootState) => ({
  access_token: state.authentication.access_token,
  selectedSeeds: state.recommendation.selectedSeeds
});

function mapDispatchToProps(dispatch: any) {
  return {
    fetchAndPopulateGenreSeeds: () => dispatch(fetchAndPopulateGenreSeeds()),
    setActiveSeedSlot: (slot: number) => dispatch(setActiveSeedSlot(slot))
  }
}

interface RecommenderProps {
  access_token: string | null;
  selectedSeeds: Array<Artist | Track | string | null>;
  fetchAndPopulateGenreSeeds(): any;
  setActiveSeedSlot(slot: number): any;
};

class ConnectedRecommender extends React.Component<RecommenderProps, {}> {

  constructor(props: RecommenderProps) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAndPopulateGenreSeeds();
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
    return <div className="recommender">
      <header>
        <h1>Find me some Grailz</h1>
      </header>
      <section className="seeds">
        <ul className="seed-slots">
          {this.props.selectedSeeds.map((seed, index) =>
            <li key={index} className="slot" onClick={() => this.props.setActiveSeedSlot(index)}><SeedSlot seed={seed} /></li>
          )}
        </ul>

        <p>You can select up to 5 seeds to base your recommendations on.</p>
      </section>
      <section className="tools">
        <CombinedSearch />
        <section className="recommend-button">
          <button onClick={() => this.recommend()}>Recommend something</button>
        </section>
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
)(ConnectedRecommender);

export default Recommender;
