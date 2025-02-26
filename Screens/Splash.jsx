import { View, Image, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'

const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(1)).current; 

    useEffect(() => {
        
        Animated.timing(fadeAnim, {
            toValue: 0, 
            duration: 1000, 
            easing: Easing.out(Easing.ease), 
            useNativeDriver: true, 
        }).start(() => {
            navigation.replace("Splash2"); 
        });
    }, []);

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <Image 
                source={require('../assets/TrabahoGo.png')} 
                className="w-[80%] h-[80%]"
                resizeMode="contain"
            />
        </View>
    );
};

export default SplashScreen;