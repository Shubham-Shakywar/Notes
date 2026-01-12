import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/LoginScreen';
import SignUpScreen from '../screens/signup/SignUpScreen';
import HomeScreen from '../screens/home/HomeScreen';
import AddNotes from '../screens/addNotes/AddNotes';
import { supabase } from '../config/supabase';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data }) => {
      console.log("data--->",data)
      setSession(data.session);
    });

    // Listen to auth changes (login/logout/signUp)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {
        session ? (
          // USER LOGGED IN
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddNotes" component={AddNotes} />
          </Stack.Navigator>
        ) : (
          // USER NOT LOGGED IN
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        )
      }
    </NavigationContainer>
  );
};

export default AppNavigation;
