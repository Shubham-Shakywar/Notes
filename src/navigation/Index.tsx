import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import SignUpScreen from '../screens/signup/SignUpScreen';
import HomeScreen from '../screens/home/HomeScreen';
import AddNotes from '../screens/addNotes/AddNotes';
// import SplashScreen from '../screens/splash/SplashScreen';
import { supabase } from '../config/supabase';
import SplashScreen from '../screens/SplashScreen/SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false); 
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer >
      {session ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
          <Stack.Screen name="AddNotes" component={AddNotes}   options={{headerShown:false}}/>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown:false}} />
          <Stack.Screen name="SignUp" component={SignUpScreen}  options={{headerShown:false}} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
