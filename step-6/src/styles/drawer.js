import { StyleSheet } from "react-native";

export const drawer = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: "#009183",
    borderBottomColor: 'black',
    borderBottomWidth: 2,
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
    marginLeft: 10,
    color: 'black'
  },
  iconView: {
    width: 25,
    alignItems: 'center'
  },
});
