import { StyleSheet } from "react-native";

export const person = StyleSheet.create({
  container: {
    width: 120,
    height: 250,
    margin: 5
  },
  textContainer: {
    flex:1,
    justifyContent: 'center'
  },
  image: {
    height: 170,
    width: 120
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14
  },
  character: {
    textAlign: 'center',
    fontSize: 14
  }
});
