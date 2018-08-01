import React, {Component} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {THE_MOVIE_DB} from './api/constants'


export default class Person extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {person} = this.props;
    return (
      <View style={styles.container}>
        <Image style={{ height: 170, width: 120}} resizeMode={'contain'} source={person.profile_path?{uri:`${THE_MOVIE_DB.image}${person.profile_path}`}:require('./assets/default.png')}/>
        <View style={{flex:1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontWeight: 'bold'}} >{person.name}</Text>
        <Text style={{textAlign: 'center'}} >{person.character}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 250,
    margin: 5,
  },
  background: {
    backgroundColor: "#ccd3e0"
  },
  title: {
    fontSize: 18,
    textAlign: 'justify',
    fontWeight: 'bold',
  },
  libelle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 14,
    textAlign: 'justify'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  }
});