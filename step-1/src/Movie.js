import React, { Component } from 'react';
import { View } from 'react-native';
import * as styles from "./styles";

export default class Movie extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {item} = this.props;
    let release_date = item.release_date.split('-');
    const year = release_date[0];
    const month = release_date[1];
    const day = release_date[2];
    release_date = `${day}/${month}/${year}`;
    return (
      <View style={[styles.movie.subcontainer]}>
        {/* TODO: rendre un film dans la liste */}
      </View>
    );
  }
}