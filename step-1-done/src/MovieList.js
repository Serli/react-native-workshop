import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { THE_MOVIE_DB } from "./api/constants";
import { getNowPlaying } from "./services/movie";
import Movie from "./Movie";
import * as styles from "./styles";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      list: [],
    };
  }

  componentDidMount() {
    this.updateList();
  }

  getImageUrl(path) {
    return `${THE_MOVIE_DB.image}${path}`;
  }

  updateList = async () => {
    await this.setState({ fetching: true });
    const response = await getNowPlaying();
    const list = response.results;
    list.forEach(item => {
      item.image = this.getImageUrl(item.poster_path);
      item.backdrop = this.getImageUrl(item.backdrop_path);
    });
    await this.setState({
      fetching: false,
      list
    });
  }

  renderSeparator() {
    return <View style={styles.movie.separator} />;
  }

  render() {
    return (
      <View style={styles.movie.container}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={this.state.list}
          refreshing={this.state.fetching}
          onRefresh={this.updateList}
          renderItem={({ item }) => <Movie item={item} {...this.props} />}
          keyExtractor={item => String(item.id)}
        />
      </View>
    )
  }
}
