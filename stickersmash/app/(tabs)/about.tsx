import { Text, View, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.text}>{'\n'} CSCI 3660, Mobile Application Development</Text>
      <Text style={styles.text}>{'\n'} Group 3 Members:</Text>
      <Text style={styles.text}>Sam Charles, 
        Destani Fountain, 
        Walden Hackle, 
      </Text>
      <Text style={styles.text}>
        Josh Ochs,
        Clark Serecky, 
        Damien Smith
      </Text>

      <Text style={styles.text}>{'\n'} To log in:</Text>
      <Text style={styles.text}>Username: admin</Text>
      <Text style={styles.text}>Password: password123</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
