import React, { Component } from 'react';
import AppNavigation from './src/navigation/AppNavigation';

console.ignoredYellowBox = ['Warning: isMounted(...) is deprecated'];

export default class App extends Component {
  
  render() {
    return (
        <AppNavigation />
    );
  }
}
