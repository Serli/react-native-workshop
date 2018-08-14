import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import MovieList from "../MovieList";
import MovieDetail from "../MovieDetail";

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

export default class AppNavigation extends Component {

  render() {
    return <Stack />;
  }
}
