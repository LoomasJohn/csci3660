import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from "react-native";

export default function HowToScreen() {
  const openYouTubeLink = () => {
    Linking.openURL('https://youtu.be/RjWXb4FCazk');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How to Use StickerSmash:</Text>
      <Text style={styles.text}>{'\n'}1. Type in your Username and Password</Text>
      <Text style={styles.text}>2. Once you see, "Login Successful!", click close</Text>
      <Text style={styles.text}>3. Click choose a photo</Text>
      <Text style={styles.text}>4. Select a photo of your choosing from your files and then click open</Text>
      <Text style={styles.text}>5. Once your photo populates, click the plus sign button</Text>
      <Text style={styles.text}>6. You may select any of the 6 stickers to add to your photo by clicking it once</Text>
      <Text style={styles.text}>7. Once clicked, it will populate on your picture and you can move it around to your liking</Text>
      <Text style={styles.text}>8. When you are satisfied with the results, you can click save or start over by clicking reset</Text>
      <Text style={styles.text}>{'\n'}Click the video link below for a walk-through tutorial:</Text>
      
      <TouchableOpacity onPress={openYouTubeLink}>
        <Text style={styles.link}>https://youtu.be/RjWXb4FCazk</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
    padding: 20, 
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
  link: {
    color: '#1E90FF', 
    textDecorationLine: 'underline', 
    marginTop: 10, 
  },
});
