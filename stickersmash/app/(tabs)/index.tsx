import { View, Text, TextInput, Button, StyleSheet, Animated, Platform } from "react-native";
import { useState, useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { type ImageSource } from "expo-image";
import { captureRef } from "react-native-view-shot";
import domtoimage from "dom-to-image";

import ImageViewer from "@/components/ImageViewer";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import ButtonComponent from "@/components/Button";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  // State to track login
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shakeAnimation] = useState(new Animated.Value(0));

  // Sticker Smash state
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  if (status === null) {
    requestPermission();
  }

  // Dummy login credentials
  const correctUsername = "admin";
  const correctPassword = "password123";

  const handleLogin = () => {
    if (username === correctUsername && password === correctPassword) {
      setLoggedIn(true);
    } else {
      // Animate the input box if the login fails
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]).start();
    }
  };

  // Show login screen if the user is not logged in
  if (!loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ccc"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </Animated.View>
        <Button title="Login" onPress={handleLogin} />
      </View>
    );
  }

  // Sticker Smash Image Upload Functionality
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  // Image upload UI (after login)
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <ButtonComponent theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <ButtonComponent label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffd33d",
    marginBottom: 20,
  },
  input: {
    width: 250,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    borderRadius: 5,
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

