import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = ({ navigation }) => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !phone) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        const phoneRegex = /^09\d{9}$/;
        if (!phoneRegex.test(phone)) {
            Alert.alert("Error", "Enter a valid Philippine mobile number (11 digits, starting with 09).");
            return;
        }

            
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            Alert.alert("Error", "Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match!");
            return;
        }
    
        try {
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            Alert.alert("Success", "Account Created Successfully!");
            navigation.replace("Login"); 
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };
    

    return ( // ✅ Make sure to RETURN the JSX
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height" || Platform.OS === "android" ? "padding" : "height"} className="flex-1 justify-center items-center bg-white">
            <Text className="text-3xl font-bold mb-10">Register</Text>

            <View className="flex-row w-80 gap-2">
                <TextInput
                    className="border border-gray-300 rounded flex-1"
                    placeholder="First Name"
                    placeholderTextColor="gray-50"
                    value={firstName}
                    onChangeText={(text) => setfirstName(text)}
                />
                <TextInput
                    className="border border-gray-300 rounded flex-1"
                    placeholder="Last Name"
                    placeholderTextColor="gray-50"
                    value={lastName}
                    onChangeText={(text) => setlastName(text)}
                />
            </View>

            <TextInput
                className="border border-gray-300 rounded my-2 w-80"
                placeholder="Email"
                placeholderTextColor="gray-50"
                autoCapitalize='none'
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                className="border border-gray-300 rounded my-2 w-80"
                placeholder="Phone"
                placeholderTextColor="gray-50"
                keyboardType='numeric'
                maxLength={11}
                value={phone}
                onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, '');
                    setPhone(numericText);
                    }}
            />

            <View className="border border-gray-300 rounded my-2 w-80 flex-row items-center">
                <TextInput
                    className="flex-1"
                    placeholder="Password"
                    placeholderTextColor="gray-50"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                />
                {isPasswordFocused && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye" : "eye-off"} size={16} color="gray" />
                    </TouchableOpacity>
                )}
            </View>

            <View className="border border-gray-300 rounded my-2 w-80 flex-row items-center">
                <TextInput
                    className="flex-1"
                    placeholder="Confirm Password"
                    placeholderTextColor="gray-50"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    onBlur={() => setIsConfirmPasswordFocused(false)}
                />
                {isConfirmPasswordFocused && (
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={16} color="gray" />
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity 
                className="bg-blue-500 p-3 rounded w-80 mt-2"
                onPress={handleRegister}>
                <Text className="text-white text-center font-semibold">Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.replace("Login")}>
                <Text className="text-blue-500 mt-4">Already have an account? Login</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default Register;
