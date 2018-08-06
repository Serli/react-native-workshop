import React, { Component } from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import IconFeather from 'react-native-vector-icons/Feather';
import MovieList from "../MovieList";
import MovieDetail from "../MovieDetail";
import DrawerContainer from './DrawerContainer'

export default class AppNavigation extends Component {
  render() {
    return <DrawerNavigator />;
  }
}

const createList = listTitle => {
  return (
    {
      screen: MovieList,
      navigationOptions: ({navigation}) => {
        return {
          headerTitle: listTitle,
          headerLeft: <IconFeather 
                    name='menu' 
                    color='black' 
                    size={24} 
                    style={{paddingLeft: 10}}
                    onPress={() => {
                        navigation.openDrawer();
                    }}/>,
        };
      }
    }
  );
}

const createDetail = () => {
  return ({
      screen: MovieDetail,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: navigation.state.params.item.title
        };
      }
    }
  );
}

const StackNavigator = createStackNavigator(
  {
    NowPlaying: createList("À l'affiche"),
    Popular: createList("Populaires"),
    TopRated: createList("Les mieux notés"),
    MovieDetail: createDetail(),
  },
  {
    navigationOptions: () => ({
      headerStyle: {backgroundColor: "#efefef"},
  }),
    initialRouteParams: {type: 1}
  }
)

const DrawerNavigator = createDrawerNavigator(
  {
    Stack: StackNavigator
  },
  {
    contentComponent: DrawerContainer,
    initialRouteName: "Stack",
  }
);
