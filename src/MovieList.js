import React, { Component } from "react";
import { View, FlatList, Text, TouchableOpacity, LayoutAnimation, UIManager } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { THE_MOVIE_DB } from "./api/constants";
import { getPopular, getNowPlaying, getTopRated } from "./services/movie";
import Movie from "./Movie";
import * as styles from "./styles";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      page: 1,
      list: [],
      ascending: true,
    };
    this.clickable = true;
    this.lastY = 0;
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentDidMount() {
    this.updateList(this.state.page);
  }

  getImageUrl(path) {
    return `${THE_MOVIE_DB.image}${path}`;
  }

  updateList = async (page = this.state.page) => {
    await this.setState({ fetching: true });
    let response;
    if(this.props.navigation.state.params.type === 1){
      response = await getNowPlaying(page);
    } else if(this.props.navigation.state.params.type === 2){
      response = await getPopular(page);
    } else {
      response = await getTopRated(page);
    }
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

  handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    if(y >= 0){
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if(y - this.lastY > 0 && this.state.ascending){
        this.setState({ascending: false});
      } else if(y - this.lastY < 0 && !this.state.ascending){
        this.setState({ascending: true});
      }
      this.lastY = y;
    }
  } 

  render() {
    console.log(this.lastY)
    return (
      <View style={styles.movie.container}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={this.state.list}
          refreshing={this.state.fetching}
          onRefresh={this.updateList}
          renderItem={({ item }) => <Movie item={item} {...this.props} />}
          keyExtractor={item => String(item.id)}
          onScroll={this.handleScroll}
          bounces={this.state.ascending}
        />
        <View style={this.state.ascending ? styles.movieList.pageContainerVisible : styles.movieList.pageContainerHidden}>
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
