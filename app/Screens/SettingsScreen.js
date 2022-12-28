import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth/react-native";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useContext, useState } from "react";
import { View, StyleSheet, Image, Platform } from "react-native";
import { db, storage } from "../../firebaseConfig";
import { AuthContext } from "../auth/context";
import Button from "../components/Button";

import colors from "../config/colors";

function SettingsScreen() {
  const { currentUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      try {
        const uploadUrl = await uploadImageAsync(result.assets[0].uri);
        setImage(uploadUrl);

        try {
          await updateProfile(currentUser, {
            photoURL: uploadUrl,
          });

          await updateDoc(doc(db, "users", currentUser.uid), {
            photoURL: uploadUrl,
          });
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, currentUser.uid);
    const result = await uploadBytesResumable(fileRef, blob);

    blob.close();

    return await getDownloadURL(fileRef);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: image }}></Image>
      <Button title={"Select Image"} onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.dark,
  },
  container: {
    padding: 10,
    alignItems: "center",
  },
});

export default SettingsScreen;
