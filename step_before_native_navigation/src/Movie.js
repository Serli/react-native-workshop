import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as styles from "./styles";

export default class Movie extends Component {

  constructor(props) {
    super(props);
  }

  onPress = item => {
    const { navigate } = this.props.navigation;
    navigate({ routeName: 'movieDetail', params: { item } });
  }

  render() {
    const {item} = this.props;
    let release_date = item.release_date.split('-');
    const year = release_date[0];
    const month = release_date[1];
    const day = release_date[2];
    release_date = `${day}/${month}/${year}`;
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => this.onPress(item)} style={[styles.movie.subcontainer]}>
        <Image style={styles.movie.poster} resizeMode={'contain'} source={{uri:item.image}}/>
        <View style={styles.movie.previewContainer}>
          <Text style={styles.movie.title}>{`${item.title}`}</Text>
          <Text style={styles.movie.centeredText}>{`(${release_date})`}</Text>
          <View style={styles.movie.synopsisPreview}>
            <Text style={styles.movie.centeredLibelle}>{`Synopsis :`}</Text>
            <Text numberOfLines={3} style={[{color: 'grey'}, styles.movie.centeredText]}>{`${item.overview}`}</Text>
          </View>
          <View style={styles.movie.centeredRowContainer}>
            <Text style={styles.movie.libelle}>{`Note des utilisateurs : `}</Text>
            <Text style={styles.movie.text}>{`${item.vote_average} `}</Text>
            <Ionicons name={'ios-star'} size={18}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}