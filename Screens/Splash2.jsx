import { View, Text, SafeAreaView, StatusBar, Button } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons";

const Splash2 = ({ navigation }) => {
  return (
    <View className="flex-1 bg-white">
      <View className="items-center justify-top">
        <View className="bg-[#613DC1] w-[100%] h-[75%] rounded-bl-[50px] rounded-br-[50px]" />
      </View>
      <View className='flex items-center mt-[-90px] gap-5'>
        <Text className='text-5xl font-semibold'>Say hello to {"\n"}TrabahoGo!</Text>
        <Text className='text-lg'>Connecting you with trusted, {"\n"}short-term service providers</Text>
      </View>
      <View className='items-center mt-[20px]'>
        <Ionicons 
          name="arrow-forward-circle-outline" 
          size={80} 
          color="#613DC1" 
          onPress={() => navigation.replace("GetStarted")}
          />
      </View>
    </View>
  )
}

export default Splash2