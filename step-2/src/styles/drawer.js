import { StyleSheet } from "react-native";

export const drawer = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    padding: 10,
    backgroundColor: "#efefef"
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10
  },
  iconView: {
    width: 25,
    alignItems: 'center'
  },
});
