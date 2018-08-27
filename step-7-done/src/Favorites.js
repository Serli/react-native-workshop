import React, { Component } from "react";
import { connect } from "react-redux";
import { View, FlatList, Text } from "react-native";
import Movie from "./Movie";
import * as Actions from "./redux/actions";
import * as styles from "./styles";

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

  render() {
    if(this.props.favorites.length === 0) {
      return (
        <View style={styles.movie.noFavoritesContainer}>
          <Text style={styles.movie.noFavoritesText}>Vous n'avez aucun favoris</Text>
        </View>
      )
    }
    else {
      return (
        <View style={styles.movie.container}>
          <FlatList
            ItemSeparatorComponent={this.renderSeparator}
            data={this.props.favorites}
            renderItem={({ item }) => <Movie item={item} {...this.props} />}
            keyExtractor={item => String(item.id)}
          />
        </View>
      )
    }
  }
}

const mapStateToProps = store => {
  return {
      favorites: store.favorites.movies,
  }
};

export default connect(mapStateToProps)(Favorites);