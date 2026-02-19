import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/SplashScreen.png')}
               style={{resizeMode:'contain',height:100,width:100}} />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#e3e2e2'
    },
});
