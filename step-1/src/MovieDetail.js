import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import * as styles from "./styles";

export default class movie extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actors: []
    }
  }

  componentDidMount() {
    this.updateActors();
  }
  
  updateActors = async () => {
    // TODO: récupérer la liste des acteurs
  }

  render() {
    return (
      <ScrollView style={styles.movie.container}>
        {/* TODO */}
        <View style={{flex:1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>Description du film</Text>
        </View>
        {/* ==== */}
      </ScrollView>
    );
  }
}