import React from "react";
import { StateProvider } from "./utils/GlobalState";

import Routes from "./utils/routes";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [imageUri, setImageUri] = useState();

  const requestPermission = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!result.granted) {
      alert("You need to enable permission to access your media library");
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.log("Error reading image", error);
    }
  };

  return (
    <StateProvider>
      <Routes />
    </StateProvider>
  );
}
