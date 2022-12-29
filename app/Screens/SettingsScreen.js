import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth/react-native";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import { AuthContext } from "../auth/context";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import colors from "../config/colors";
import { db, storage } from "../../firebaseConfig";
import Icon from "../components/Icon";

function SettingsScreen() {
  const { currentUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImage(currentUser.photoURL);
    setLoading(false);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      try {
        setLoading(true);
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
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const removeImage = async () => {
    setLoading(true);
    try {
      await updateProfile(currentUser, {
        photoURL: "",
      });

      await updateDoc(doc(db, "users", currentUser.uid), {
        photoURL: "",
      });

      setImage(null);
      setLoading(false);
    } catch (e) {
      console.log(e);
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
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.container}>
        {!image ? (
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={pickImage}
            activeOpacity={0.8}>
            <Image style={styles.avatar} source={{ uri: image }} />
            <Icon
              style={styles.camera}
              name="camera"
              backgroundColor="transparent"
              iconColor={"rgba(255, 255, 255, 0.9)"}
              size={80}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={pickImage}
            activeOpacity={0.8}>
            <Image style={styles.avatar} source={{ uri: image }} />
            <Icon
              style={styles.camera}
              name="camera"
              backgroundColor="transparent"
              iconColor={"rgba(255, 255, 255, 0.9)"}
              size={80}
            />
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity onPress={pickImage}>
          <AppText style={styles.selectColor}>Select Image</AppText>
        </TouchableOpacity> */}
        {image && (
          <TouchableOpacity onPress={removeImage} activeOpacity={0.8}>
            <AppText style={styles.selectColor}>Remove Profile Picture</AppText>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: colors.dark,
  },
  avatarContainer: {
    position: "relative",
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    position: "absolute",
  },
  container: {
    padding: 10,
    alignItems: "center",
  },
  selectColor: {
    color: colors.primary,
    paddingVertical: 10,
  },
});

export default SettingsScreen;
