import React, { Component } from "react";
import { createStackNavigator, createBottomTabNavigator } from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MovieList from "../MovieList";
import MovieDetail from "../MovieDetail";

export default class AppNavigation extends Component {
  render() {
    return <TabNavigator />;
  }
}

const createStack = (listTitle, type) => {
  return createStackNavigator(
    {
      MovieList: {
        screen: MovieList,
        navigationOptions: () => {
          return {
            headerTitle: listTitle
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
        headerStyle: {backgroundColor: '#efefef'},
        headerTintColor: "black",
      }),
      initialRouteParams: {type},
      initialRouteName: "MovieList"
    }
  );
}

const NowPlayingStack = createStack("À l'affiche", 1);
const PopularStack = createStack("Populaires", 2);
const TopRatedStack = createStack("Les mieux notés", 3);

const TabNavigator = createBottomTabNavigator(
  {
    NowPlaying: {
      screen: NowPlayingStack,
      navigationOptions: () => {
        return {
          header: null,
          title: "À l'affiche",          
        }
      }
    },
    Popular: { 
      screen: PopularStack, 
      navigationOptions: () => {
        return {
          header: null,
          title: 'Populaires',          
        }
      }
    },
    TopRated: {
      screen: TopRatedStack,
      navigationOptions: () => {
        return {
          header: null,
          title: 'Les mieux notés',          
        }
      }
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'NowPlaying') {
          iconName = `ios-easel${focused ? '' : '-outline'}`;
        } else if (routeName === 'Popular') {
          iconName = `ios-flame${focused ? '' : '-outline'}`;
        } else if (routeName === 'TopRated') {
          iconName = `ios-star${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#009183',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);
