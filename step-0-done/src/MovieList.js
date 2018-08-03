import React, { Component } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { THE_MOVIE_DB } from "./api/constants";
import { getNowPlaying } from "./services/movie";
import Movie from "./Movie";
import * as styles from "./styles";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      page: 1,
      list: [],
    };
    this.clickable = true;
  }

  componentDidMount() {
    this.updateList(this.state.page);
  }

  getImageUrl(path) {
    return `${THE_MOVIE_DB.image}${path}`;
  }

  updateList = async (page = this.state.page) => {
    await this.setState({ fetching: true });
    const response = await getNowPlaying(page);
    const list = response.results;
    list.forEach(item => {
      item.image = this.getImageUrl(item.poster_path);
      item.backdrop = this.getImageUrl(item.backdrop_path);
    });
    await this.setState({
      fetching: false,
      page,
      list,
      totalPages: response.total_pages
    });
  }

  renderSeparator() {
    return <View style={styles.movie.separator} />;
  }

  changePage = async newPage => {
    if(this.clickable && newPage > 0 && newPage <= this.state.totalPages && newPage !== this.state.page){
      this.clickable = false;
      await this.updateList(newPage);
      this.clickable = true;
    }
  }

  render() {
    return (
      <View style={styles.movie.container}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={<View style={{ height: 50 }} />}
          data={this.state.list}
          refreshing={this.state.fetching}
          onRefresh={this.updateList}
          renderItem={({ item }) => <Movie item={item} {...this.props} />}
          keyExtractor={item => String(item.id)}
        />
        <View style={styles.movieList.pageContainerVisible}>
          <TouchableOpacity onPress={() => this.changePage(1)} activeOpacity={0.9} style={styles.movieList.button}>
            <Ionicons name={'ios-skip-backward'} color={'#111'} size={18}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changePage(this.state.page - 1)} activeOpacity={0.9} style={styles.movieList.button}>
            <Ionicons name={'ios-arrow-back'} color={'black'} size={18}/>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={styles.movieList.button}>
            <Text style={styles.movieList.pageNumber}>{this.state.page}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changePage(this.state.page + 1)} activeOpacity={0.9} style={styles.movieList.button}>
            <Ionicons name={'ios-arrow-forward'} color={'black'} size={18}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.changePage(this.state.totalPages)} activeOpacity={0.9} style={styles.movieList.button}>
            <Ionicons name={'ios-skip-forward'} color={'#111'} size={18}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
