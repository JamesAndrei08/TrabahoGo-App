import "./global.css";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

import Login from './Screens/Login';
import Register from "./Screens/Register";
import Welcome from "./Screens/Welcome";
import SplashScreen from "./Screens/Splash";
import Splash2 from "./Screens/Splash2";
import GetStarted from "./Screens/GetStarted";

const Stack = createNativeStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

function InsideLayout() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("User:", user);
      setUser(user);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
        { user ? (
          <Stack.Screen name="Welcome" component={InsideLayout} />
        ) : (
          <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptionStyle}>
        <>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Splash2" component={Splash2} />
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Welcome" component={Welcome} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
