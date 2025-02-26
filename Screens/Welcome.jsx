import { View, Text, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";


function Welcome({ navigation }) {

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    navigation.replace("Login"); // Go back to Login screen
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold">Welcome to the App!</Text>
      <TouchableOpacity
        className="bg-red-500 p-3 rounded w-80 items-center mt-5"
        onPress={handleLogout}
      >
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Welcome