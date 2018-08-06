import React, {Component} from 'react';
import { View } from 'react-native';
import * as styles from "./styles";

export default class Person extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {person} = this.props;
    return (
      <View style={styles.person.container}>
        {/* TODO: rendre la carte d'une personne */}
      </View>
    );
  }
}