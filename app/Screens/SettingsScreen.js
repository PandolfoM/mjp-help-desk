import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import { updateEmail, updateProfile } from "firebase/auth/react-native";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { AppForm as Form, AppFormField as FormField } from "../components/form";
import { AuthContext } from "../auth/context";
import { db, storage } from "../../firebaseConfig";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import colors from "../config/colors";
import Icon from "../components/Icon";
import SubmitButton from "../components/form/SubmitButton";
import Screen from "../components/Screen";
import ErrorMessage from "../components/ErrorMessage";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(1).label("Name"),
  email: Yup.string().email().label("Email"),
});

function SettingsScreen() {
  const [emailErr, setEmailErr] = useState("");
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

  const handleSubmit = async ({ name, email }) => {
    try {
      setLoading(true);
      if (name) {
        await updateProfile(currentUser, {
          displayName: name,
        }).then(() => {
          setLoading(false);
        });
      }

      if (email) {
        updateEmail(currentUser, email)
          .then(() => {
            setEmailErr("");
            setLoading(false);
          })
          .catch((e) => {
            let code = JSON.stringify(e.code);
            let requiresLogin = code.includes("requires-recent-login");
            let alreadyInUse = code.includes("email-already-in-use");
            requiresLogin && setEmailErr("Login again and try again");
            alreadyInUse && setEmailErr("Email already in use");
            !requiresLogin && !alreadyInUse && setEmailErr(code);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={{ flex: 1 }}>
        <Screen>
          <View style={styles.container}>
            <View style={styles.setPfp}>
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
              {image && (
                <TouchableOpacity onPress={removeImage} activeOpacity={0.8}>
                  <AppText style={styles.selectColor}>
                    Remove Profile Picture
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.form}>
              <AppText>Edit Account Details</AppText>
              <Form
                inititalValues={{
                  name: "",
                  email: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}>
                <FormField
                  autoCapitalize="words"
                  autoCorrect={false}
                  name="name"
                  placeholder="Name"
                  textContentType="name"
                />
                <FormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  name="email"
                  placeholder="Email"
                  textContentType="emailAddress"
                />
                <ErrorMessage visible={emailErr} error={emailErr} />
                <AppText style={{ color: colors.danger, paddingVertical: 10 }}>
                  * Blank fields will not be changed
                </AppText>
                <SubmitButton title={"Edit Details"} />
              </Form>
            </View>
          </View>
        </Screen>
      </KeyboardAvoidingView>
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
  form: {
    width: "100%",
  },
  screen: {
    flex: 1,
  },
  selectColor: {
    color: colors.primary,
    paddingVertical: 10,
  },
  setPfp: {
    paddingBottom: 20,
    alignItems: "center",
  },
});

export default SettingsScreen;
