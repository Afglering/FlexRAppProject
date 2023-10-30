import React, { useEffect, useRef } from 'react';
import { Image, Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./App";

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Splash"
>;


const Splash = () => {
    const fadeIn = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<SplashScreenNavigationProp>();
  
    useEffect(() => {
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, [fadeIn]);
  
    const handlePress = () => {
        navigation.navigate("InfoSwipe");
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
          <Animated.View style={{ ...styles.imageContainer, opacity: fadeIn }}>
            <Image
              style={styles.backgroundImage}
              resizeMode="cover"
              source={require('./assets/promotion/Ellipse_8.png')}
            />
            <Image
              style={styles.logoImage}
              resizeMode="cover"
              source={require('./assets/promotion/lion_head1.png')}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#006266',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: 302/2,
    height: 298/2,
  },
  logoImage: {
    position: 'absolute',
    width: 249/2,
    height: 246/2,
  },
});

export default Splash;
