import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import * as styles from '../styles'

export default class DrawerContainer extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.drawer.container}>
                <View style={{backgroundColor: "#efefef", height: StatusBar.currentHeight}}/>
                {/* TODO: rendre le drawer */}
            </View>
        )
    }
}