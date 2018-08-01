import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import Person from './Person';
import { getCredits } from './services/movie'

export default class MovieDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actors: []
    }
  }

  async componentDidMount() {
    const {item} = this.props.navigation.state.params;
    const response = await getCredits(item.id);
    const actors = response.cast
    this.setState({actors});
  }

  render() {
    const {item} = this.props.navigation.state.params;
    let release_date = item.release_date.split('-');
    const year = release_date[0];
    const month = release_date[1];
    const day = release_date[2];
    release_date = `${day}/${month}/${year}`;
    return (
      <ScrollView style={styles.container}>
        <Image style={{ height: 235, width: "100%"}} resizeMode={'cover'} source={{uri:item.backdrop}}/>
        <View style={{marginTop: 10, marginHorizontal: 10}}>
          <View style={styles.rowContainer}><Text style={styles.libelle}>{`Titre : `}</Text><Text style={styles.text}>{`${item.title}`}</Text></View>
          <Text style={[styles.libelle, {marginBottom: 3}]}>{`Synopsis :`}</Text>
          <Text style={[styles.text, {marginBottom: 10}]}>{`${item.overview}`}</Text>
          <View style={styles.rowContainer}><Text style={styles.libelle}>{`Note des utilisateurs : `}</Text><Text style={styles.text}>{`${item.vote_average} `}</Text></View>
          <View style={styles.rowContainer}><Text style={styles.libelle}>{`Date de sortie : `}</Text><Text style={styles.text}>{`${release_date}`}</Text></View>
          {this.state.actors.length > 0 &&
            <View>
              <Text style={[styles.libelle, {marginBottom: 3}]}>{`Casting :`}</Text>
              <FlatList
                data={this.state.actors}
                horizontal={true}
                renderItem={({item}) => (
                  <Person person={item}/>
                )}
                keyExtractor = { (actor, index) => String(actor.id) + index}
              />
            </View>
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white'
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