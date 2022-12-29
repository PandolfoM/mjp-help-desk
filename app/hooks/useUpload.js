import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext } from "react";
import { storage } from "../../firebaseConfig";
import { AuthContext } from "../auth/context";

export default useUpload = () => {
  const { currentUser } = useContext(AuthContext);

  const uploadImage = async (uri) => {
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
  };

  return { uploadImage };
};
