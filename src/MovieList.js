import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { THE_MOVIE_DB } from './api/constants'
import { getList } from './services/movie'
import Movie from './Movie'

export default class MovieList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      list: []
    }
  }

  componentDidMount() {
    this._updateList();
  }

  render() {
    return (
      <FlatList
        style={{backgroundColor: 'white'}}
        ItemSeparatorComponent={this._renderSeparator}
        data={this.state.list}
        refreshing={this.state.fetching}
        onRefresh={() => this._updateList()}
        onEndReachedTreshhold={0.5}
        renderItem={({ item }) => (
          <Movie
            item={item}          
            {...this.props}
          />
        )}
        keyExtractor = { item => String(item.id)}
      />
    );
  }

  _renderSeparator(){
    return <View style={styles.separator} />
  }

  _getImageUrl = (path) => {
    return `${THE_MOVIE_DB.image}${path}`;
  }

  _updateList = async () => {
    this.setState({ fetching: true });
    const response = await getList();
    const list = response.results;
    list.forEach(async item => {
      item.image = this._getImageUrl(item.poster_path);
      item.backdrop = this._getImageUrl(item.backdrop_path);
    });
    console.log(list);
    this.setState({
      fetching: false,
      list
    });
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  separator: {
    height: 0.5,
    width: "100%",
    alignSelf: 'center',
    backgroundColor: "#BBB"
  },
  header:{
    paddingTop: 30,
    padding: 10,
    backgroundColor: "#098cbc",
  },
  headerText: {
    fontSize: 30,
    color: "white"
  }
});