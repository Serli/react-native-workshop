import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import MovieList from "../MovieList";
import MovieDetail from "../MovieDetail";

export default class AppNavigation extends Component {
  render() {
    const Stack = createStackNavigator(
      {
        MovieList: {
          screen: MovieList,
          navigationOptions: () => {
            return {
              headerTitle: "À l'affiche"
            };
          }
        },
        MovieDetail: {
          screen: MovieDetail,
          navigationOptions: ({ navigation }) => {
            return {
              headerTitle: navigation.state.params.item.title
            };
          }
        }
      },
      {
        navigationOptions: () => ({
          headerTintColor: "black"
        }),
        initialRouteName: "MovieList"
      }
    );
    return <Stack />;
  }
}
