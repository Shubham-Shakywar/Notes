import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from './src/screens/login/LoginScreen'
import AppNavigation from './src/navigation/Index'
import { PaperProvider } from 'react-native-paper'

const App = () => {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  )
}

export default App