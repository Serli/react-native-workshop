import { StyleSheet } from "react-native";

export const movie = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "white"
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
    fontWeight: 'bold'
  },
  libelle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  centeredLibelle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 14,
    textAlign: 'justify'
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 14
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
