import React, { Component } from 'react';
import { connect } from "react-redux";
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as styles from "./styles";

class Movie extends Component {

  constructor(props) {
    super(props);
  }

  onPress = item => {
    const { navigate } = this.props.navigation;
    navigate({ routeName: 'MovieDetail', params: { item } });
  }

  render() {
    const {item} = this.props;
    let release_date = item.release_date.split('-');
    const year = release_date[0];
    const month = release_date[1];
    const day = release_date[2];
    release_date = `${day}/${month}/${year}`;
    const isFavorite = this.props.favorites.findIndex(item2 => item2.id === item.id) !== -1;

    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => this.onPress(item)} style={[styles.movie.subcontainer]}>
        <Image style={styles.movie.poster} resizeMode={'contain'} source={{uri:item.image}}/>
        <View style={styles.movie.previewContainer}>
          <Text style={styles.movie.title}>{`${item.title}`}</Text>
          <Text style={styles.movie.centeredText}>{`(${release_date})`}</Text>
          {isFavorite && <Ionicons style={{alignSelf: 'center', marginTop: 10}} name={`ios-bookmark`} color={'black'} size={25}/>}
          <View style={styles.movie.synopsisPreview}>
            <Text style={styles.movie.centeredLibelle}>{`Synopsis :`}</Text>
            <Text numberOfLines={3} style={[styles.movie.centeredText, {color: 'grey'}]}>{`${item.overview}`}</Text>
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
};

const mapStateToProps = store => {
  return {
      favorites: store.favorites.movies,
  }
};

export default connect(mapStateToProps)(Movie);