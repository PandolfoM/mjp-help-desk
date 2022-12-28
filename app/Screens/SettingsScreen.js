import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "firebase/auth/react-native";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import { AuthContext } from "../auth/context";
import Button from "../components/Button";
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
          <Icon
            sizeMultiplier={1}
            iconColor={colors.dark}
            backgroundColor="transparent"
            name="account-circle"
            size={150}
          />
        ) : (
          <Image style={styles.avatar} source={{ uri: image }}></Image>
        )}
        <Button title={"Select Image"} onPress={pickImage} />
        {image && (
          <Button title={"Remove Profile Picture"} onPress={removeImage} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.dark,
  },
  container: {
    padding: 10,
    alignItems: "center",
  },
});

export default SettingsScreen;
