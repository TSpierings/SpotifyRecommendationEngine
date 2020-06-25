import * as React from 'react';
import './combined-search.scss';
import { RootState } from '../../store';
import { fetchSearchItems } from '../../store/recommendations/actions';
import { SearchTypes } from '../../api/search';
import { connect } from 'react-redux';
import { Artist } from '../../interfaces/spotify/artist';
import { Track } from '../../interfaces/spotify/track';
import { isNull } from 'util';

const mapStateToProps = (state: RootState) => ({
  access_token: state.authentication.access_token,
  foundArtists: state.recommendation.foundArtists,
  foundTracks: state.recommendation.foundTracks,
  genres: state.recommendation.availableGenreSeeds
});

function mapDispatchToProps(dispatch: any) {
  return {
    searchItems: (query: string, types: Array<SearchTypes>) => dispatch(fetchSearchItems(query, types))
  }
}

interface CombinedSearchProps {
  access_token: string | null;
  foundArtists: Array<Artist> | null;
  foundTracks: Array<Track> | null;
  genres: Array<string> | null;
  searchItems(query: string, types: Array<SearchTypes>): any;
};

class ConnectedCombinedSearch extends React.Component<CombinedSearchProps, {}> {

  constructor(props: CombinedSearchProps) {
    super(props);
  }

  search() {
    this.props.searchItems('test', [SearchTypes.Artist, SearchTypes.Track]);
  }

  componentDidUpdate() {

  }

  render() {
    return <div className="combined-search">
        <h1>This is CombinedSearch</h1>
        <input type="text"></input>
        <button onClick={() => this.search()}>Search!</button>
        <section className="search-results">
          <ul>
            {this.props.foundArtists?.map(artist => <li key={artist.id}>{artist.name}</li>)}
          </ul>
          <ul>
            {this.props.foundTracks?.map(track => <li key={track.id}>{track.name}</li>)}
          </ul>
          <ul>
            {this.props.genres?.filter(genre => genre.includes('metal'))?.map(genre => <li key={genre}>{genre}</li>)}
          </ul>
        </section>
      </div>;
  }
}

const CombinedSearch = connect(
  mapStateToProps,
  mapDispatchToProps
) (ConnectedCombinedSearch);

export default CombinedSearch;
