import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/login/LoginScreen';
import SignUpScreen from '../screens/signup/SignUpScreen';
import HomeScreen from '../screens/home/HomeScreen';
import AddNotes from '../screens/addNotes/AddNotes';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddNotes" component={AddNotes} />
    </Stack.Navigator>  
   </NavigationContainer>
  )
}

export default AppNavigation