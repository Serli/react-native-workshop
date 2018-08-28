import React, { Component } from "react";
import { View, FlatList, Text, Image, TouchableOpacity, Alert } from "react-native";
import Movie from "./Movie";
import * as styles from "./styles";

export default class Favorites extends Component {

  constructor(props) {
    super(props);
    // TODO: Dans les paramètres de navigation, passer la fonction qui supprime tous les favoris.
  }

  renderSeparator() {
    return <View style={styles.movie.separator} />;
  }

  updateAvatar = () => {
    // TODO: Utiliser ImagePicker pour modifier l'avatar
      Alert.alert(`Tentative de modification de l'avatar`);
    //
  }

  render() {
    return (
      <View style={styles.movie.container}>
        <View style={styles.movie.profileContainer}>
          <TouchableOpacity onPress={this.updateAvatar}>
            <Image style={styles.movie.profilPic} resizeMode={'cover'} source={require('./assets/defaultPic.png')} />
          </TouchableOpacity>
        </View>
        {/* TODO: Afficher la liste de favoris */}
      </View>
    )
  }
};