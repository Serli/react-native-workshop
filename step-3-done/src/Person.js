import React, {Component} from 'react';
import { Text, View, Image } from 'react-native';
import {THE_MOVIE_DB} from './api/constants';
import * as styles from "./styles";

export default class Person extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {person} = this.props;
    return (
      <View style={styles.person.container}>
        <Image style={styles.person.image} resizeMode={'contain'} source={person.profile_path?{uri:`${THE_MOVIE_DB.image}${person.profile_path}`}:require('./assets/default.png')}/>
        <View style={styles.person.textContainer} >
          <Text style={styles.person.name} >{person.name}</Text>
          <Text style={styles.person.character} >{person.character}</Text>
        </View>
      </View>
    );
  }
}