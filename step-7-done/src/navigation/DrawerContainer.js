import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, View, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as styles from '../styles'

export default class DrawerContainer extends Component {

    constructor(props) {
        super(props);
    }

    navigateTo = (route, params) => {
        this.props.navigation.navigate(route, params);
    }

    render() {
        return (
            <View style={styles.drawer.container}>
                <View style={{backgroundColor: "#efefef", height: StatusBar.currentHeight}}/>
                <ScrollView style={styles.drawer.scrollView}>
                    <TouchableOpacity style={styles.drawer.button} onPress={() => this.navigateTo('NowPlaying', {type: 1})}>
                        <View style={styles.drawer.iconView}>
                            <Ionicons name={`ios-easel`} size={25} color={'black'} />
                        </View>
                        <Text style={styles.drawer.text}>À l'affiche</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawer.button} onPress={() => this.navigateTo('Popular', {type: 2})}>
                        <View style={styles.drawer.iconView}>
                            <Ionicons name={`ios-flame`} size={25} color={'black'} />
                        </View>
                        <Text style={styles.drawer.text}>Populaires</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawer.button} onPress={() => this.navigateTo('TopRated', {type: 3})}>
                        <View style={styles.drawer.iconView}>
                            <Ionicons name={`ios-star`} size={25} color={'black'} />
                        </View>
                        <Text style={styles.drawer.text}>Les mieux notés</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawer.button} onPress={() => this.navigateTo('Favorites')}>
                        <View style={styles.drawer.iconView}>
                            <Ionicons name={`ios-bookmark`} size={25} color={'black'} />
                        </View>
                        <Text style={styles.drawer.text}>Favoris</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}