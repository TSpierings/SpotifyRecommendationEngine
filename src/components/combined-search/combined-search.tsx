import { debounce } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { SearchTypes } from '../../api/search';
import { Artist } from '../../interfaces/spotify/artist';
import { Track } from '../../interfaces/spotify/track';
import { RootState } from '../../store';
import { fetchSearchItems, setSeed } from '../../store/recommendations/actions';
import { capitalize } from '../../util/capitalize';
import { ArtistCard } from '../artist-card/artist-card';
import { TrackCard } from '../track-card/track-card';
import './combined-search.scss';

const mapStateToProps = (state: RootState) => ({
  access_token: state.authentication.access_token,
  foundArtists: state.recommendation.foundArtists,
  foundTracks: state.recommendation.foundTracks,
  genres: state.recommendation.availableGenreSeeds
});

function mapDispatchToProps(dispatch: any) {
  return {
    searchItems: (query: string, types: Array<SearchTypes>) => dispatch(fetchSearchItems(query, types)),
    setSeed: (seed: Artist | Track | string, index: number) => dispatch(setSeed(seed, index))
  }
}

interface CombinedSearchProps {
  access_token: string | null;
  foundArtists: Array<Artist> | null;
  foundTracks: Array<Track> | null;
  genres: Array<string> | null;
  searchItems(query: string, types: Array<SearchTypes>): any;
  setSeed(seed: Artist | Track | string, index: number): any;
};

class ConnectedCombinedSearch extends React.Component<CombinedSearchProps, {}> {
  private searchValue = '';
  private debouncedSearch = debounce(this.search, 500);

  constructor(props: CombinedSearchProps) {
    super(props);
  }

  search(query: string) {
    this.props.searchItems(query, [SearchTypes.Artist, SearchTypes.Track]);
    this.searchValue = query;
  }

  inputChange = (value: string) => {
    this.debouncedSearch.cancel();
    this.debouncedSearch(value);
  }

  render() {
    const matchingGenres = this.props.genres?.filter(genre => this.searchValue ? genre.includes(this.searchValue) : false);

    return <div className="combined-search">
      <input type="text" onChange={(e) => this.inputChange(e.target.value)}></input>
      <section className="search-results">

        <div className="artist">
          <label>Artists</label>
          {this.props.foundArtists?.length === 0 ?
            <span>No artists found</span> :
            this.props.foundArtists?.map(artist => <li key={artist.id} onClick={() => this.props.setSeed(artist, 0)}><ArtistCard artist={artist}/></li>)}
        </div>

        <ul className="track">
          <label>Tracks</label>
          {this.props.foundTracks?.length === 0 ?
            <span>No tracks found</span> :
            this.props.foundTracks?.map(track => <li key={track.id}><TrackCard track={track} /></li>)}
        </ul>

        <ul className="genre">
          <label>Genres</label>
          {matchingGenres?.length === 0 && this.searchValue ?
            <span>No genres found</span> :
            this.props.genres?.filter(genre => this.searchValue ? genre.includes(this.searchValue) : false)?.map(genre =>
              <li key={genre}><h3>{capitalize(genre)}</h3></li>)}
        </ul>
      </section>
    </div>;
  }
}

const CombinedSearch = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedCombinedSearch);

export default CombinedSearch;
