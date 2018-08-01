import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Movie extends Component {

  constructor(props) {
    super(props);
  }

  onPress = (item) => {
    const {navigate} = this.props.navigation;
    navigate({routeName: 'movieDetail', params: {item}});
  }

  render() {
    const {item} = this.props;
    let release_date = item.release_date.split('-');
    const year = release_date[0];
    const month = release_date[1];
    const day = release_date[2];
    release_date = `${day}/${month}/${year}`;
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => this.onPress(item)} style={[styles.container]}>
        <Image style={{width:100, height: 150}} resizeMode={'contain'} source={{uri:item.image}}/>
        <View style={{flex:1, marginLeft: 10}}>
          <Text style={styles.title}>{`${item.title}`}</Text>
          <Text style={{textAlign: 'center'}}>{`(${release_date})`}</Text>
          <Text style={{marginTop: 10, textAlign: 'center', fontWeight: 'bold'}}>{`Synopsis :`}</Text>
          <Text numberOfLines={3} style={{marginBottom: 10, color: 'grey', textAlign: 'center'}}>{`${item.overview}`}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontWeight: 'bold'}}>{`Note des utilisateurs : `}</Text><Text>{`${item.vote_average} `}</Text><Ionicons name={'ios-star'} size={18}/></View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  background: {
    backgroundColor: "#ccd3e0"
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  right: {
     alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontSize: 16
  },
  checkbox: {
    marginRight: 0,
    marginLeft: 7,
  }
});