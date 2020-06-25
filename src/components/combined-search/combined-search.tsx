import * as React from 'react';
import './combined-search.scss';
import { RootState } from '../../store';
import { fetchSearchItems } from '../../store/recommendations/actions';
import { SearchTypes } from '../../api/search';
import { connect } from 'react-redux';
import { Artist } from '../../interfaces/spotify/artist';
import { Track } from '../../interfaces/spotify/track';
import { debounce, Cancelable } from 'lodash';
import { ArtistCard } from '../artist-card/artist-card';

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
  private searchValue = '';
  private debouncedSearch = debounce(this.search, 500);

  constructor(props: CombinedSearchProps) {
    super(props);
  }

  search (query: string) {
    this.props.searchItems(query, [SearchTypes.Artist, SearchTypes.Track]);
    this.searchValue = query;
  }

  inputChange = (value: string) => {
    this.debouncedSearch.cancel();
    this.debouncedSearch(value);
  }

  render() {
    return <div className="combined-search">
        <h1>This is CombinedSearch</h1>
        <input type="text" onChange={(e) => this.inputChange(e.target.value)}></input>
        <section className="search-results">
          <ul>
            {this.props.foundArtists?.map(artist => <li><ArtistCard key={artist.id} artist={artist}/></li>)}
          </ul>
          <ul>
            {this.props.foundTracks?.map(track => <li key={track.id}>{track.name}</li>)}
          </ul>
          <ul>
            {this.props.genres?.filter(genre => this.searchValue ? genre.includes(this.searchValue) : false)?.map(genre => <li key={genre}>{genre}</li>)}
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
