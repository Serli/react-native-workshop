import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import MovieList from "../MovieList";
import MovieDetail from "../MovieDetail";

export default class AppNavigation extends Component {
  render() {
    const Stack = createStackNavigator(
      {
        movieList: {
          screen: MovieList,
          navigationOptions: () => {
            return {
              headerTitle: "Populaires"
            };
          }
        },
        movieDetail: {
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
          headerStyle: {backgroundColor: '#efefef'},
          headerTintColor: "black"
        }),
        initialRouteName: "movieList"
      }
    );
    return <Stack />;
  }
}
