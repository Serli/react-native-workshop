import { StyleSheet } from "react-native";

export const movieList = StyleSheet.create({
  pageContainerVisible: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent:'center'
  },
  pageContainerHidden: {
    position: 'absolute',
    bottom: -50,
    width: '100%',
    flexDirection: 'row',
    justifyContent:'center'
  },
  button: {
    backgroundColor: '#efefef',
    height:35,
    width:35,
    marginHorizontal: 16,
    borderRadius: 50,
    borderColor: '#BBB',
    borderWidth:1,
    justifyContent: 'center',
    alignItems:'center'
  },
  pageNumber: {
    color:'black',
    textAlign:'center',
  }
});

export const movie = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white"
  },
  noFavoritesContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  noFavoritesText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'black'
  },
  subcontainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  previewContainer: {
    flex:1,
    marginLeft: 10
  },
  centeredRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favoriteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    marginHorizontal: '25%',
    height: 40,
    marginBottom: 20
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10
  },
  synopsisPreview: {
    marginVertical: 10
  },
  separator: {
    height: 0.5,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#BBB"
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black'
  },
  libelle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  centeredLibelle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  text: {
    fontSize: 14,
    textAlign: 'justify',
    color: 'black'
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black'
  },
  poster: {
    width:100,
    height: 150
  },
  backdrop: {
    height: 235,
    width: "100%"
  }
});
