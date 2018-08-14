import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import MovieList from './src/MovieList';

export default class App extends Component {
  
  render() {
    return (
      <SafeAreaView style={{ flex:1 }}>
        <View style={{height: StatusBar.currentHeight}}/>
        <MovieList />
      </SafeAreaView>
    );
  }
}
