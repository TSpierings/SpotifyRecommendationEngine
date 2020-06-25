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
  foundTracks: state.recommendation.foundTracks
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
    if (!isNull(this.props.foundArtists)) {
      console.log(this.props.foundArtists);
    }

    if (!isNull(this.props.foundTracks)) {
      console.log(this.props.foundTracks);
    }
  }

  render() {
    return <div className="combined-search">
        <h1>This is CombinedSearch</h1>
        <input type="text"></input>
        <button onClick={() => this.search()}>Search!</button>
      </div>;
  }
}

const CombinedSearch = connect(
  mapStateToProps,
  mapDispatchToProps
) (ConnectedCombinedSearch);

export default CombinedSearch;
