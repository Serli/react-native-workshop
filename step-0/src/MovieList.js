import React, { Component } from "react";
import { View, Text } from "react-native";
import { THE_MOVIE_DB } from "./api/constants";
import * as styles from "./styles";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.updateList();
  }

  getImageUrl(path) {
    return `${THE_MOVIE_DB.image}${path}`;
  }

  updateList = async () => {
    // TODO: récupérer la liste des films
  }

  render() {
    return (
      <View style={styles.movie.container}>
        {/* TODO */}
        <View style={{flex:1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>Liste des films</Text>
        </View>
        {/* ==== */}
      </View>
    )
  }
}
