import React, { Component } from "react";
import { connect } from "react-redux";
import { View, FlatList, Text, Image, TouchableOpacity, Alert } from "react-native";
import Movie from "./Movie";
import * as Actions from "./store/actions";
import * as styles from "./styles";
import ImagePicker from 'react-native-image-picker'

class Favorites extends Component {

  constructor(props) {
    super(props);
    const {navigation, dispatch} = this.props;
    navigation.setParams({
      clearFavorites: () => { dispatch(Actions.favorites.clear()) }
    });
  }

  renderSeparator() {
    return <View style={styles.movie.separator} />;
  }

  updateAvatar = () => {
    ImagePicker.showImagePicker({
      title:'Sélectionnez votre avatar', 
      takePhotoButtonTitle: 'Prendre une photo ...',
      chooseFromLibraryButtonTitle: 'Choisir depuis la gallerie ...',
      cancelButtonTitle: 'Annuler'
    }, (response) => {
      if (response.didCancel) {
        console.log('Canceled');
      }
      else if (response.error) {
        Alert.alert(`Nous n'avons pas pu importer votre image`);
      }
      else {
        this.props.dispatch(Actions.user.updateAvatar({ uri: response.uri }));
      }
    })
  }

  render() {
    return (
      <View style={styles.movie.container}>
        <View style={styles.movie.profileContainer}>
          <TouchableOpacity onPress={this.updateAvatar}>
            <Image style={styles.movie.profilPic} resizeMode={'cover'} source={this.props.avatar} />
          </TouchableOpacity>
        </View>
        { this.props.favorites.length === 0 ?
          <View style={styles.movie.noFavoritesContainer}>
            <Text style={styles.movie.noFavoritesText}>Vous n'avez aucun favoris</Text>
          </View>
        :
          <FlatList
            ItemSeparatorComponent={this.renderSeparator}
            data={this.props.favorites}
            renderItem={({ item }) => <Movie item={item} {...this.props} />}
            keyExtractor={item => String(item.id)}
          />
        }
      </View>
    )
  }
};

const mapStateToProps = store => {
  return {
      favorites: store.favorites.movies,
      avatar: store.user.avatar,
  }
};

export default connect(mapStateToProps)(Favorites);