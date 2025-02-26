import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Button, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        navigation.replace("Welcome");
    } catch (error) {
        console.log(error);
        alert('Sign in failed:' + error.message);
    } finally {
        setLoading(false);
    }
  }; 

  return (
    <View className='flex-1 justify-center items-center'>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  className='mx-5 flex-1 justify-center'>
        <Image 
          source={require('../assets/Logo.png')} 
          className="w-32 h-32 mb-10 ml-20 border border-black " 
          resizeMode="contain"
        />
        <TextInput
        className='my-1 h-12 rounded border border-gray-300 p-2 bg-white'
        value={email}
        placeholder='Email'
        placeholderTextColor="black"
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}
        >
        </TextInput>
        <TextInput
        className='my-1 h-12 rounded border border-gray-300 p-2 bg-white'
        value={password}
        placeholder='Password'
        placeholderTextColor="black"
        secureTextEntry
        autoCapitalize='none'
        onChangeText={(text) => setPassword(text)}
        >
        </TextInput>

        { loading ? (
          <ActivityIndicator size="large" color="#0000ff" /> 
        ) : (
            <>
              <Button title="Login" onPress={ signIn }/>
            </>
        )}

        <View className="flex-row items-center">
          <Text>Don't have an Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-blue-500 font-semibold">Register Now!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default Login