// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const onboardingData = [
//   { id: '1', title: 'Welcome!', description: 'Organize your notes efficiently.', image: require('../../assets/onboard1.png') },
//   { id: '2', title: 'Stay Synced', description: 'Access your notes anytime, anywhere.', image: require('../../assets/onboard2.png') },
//   { id: '3', title: 'Get Started', description: 'Start managing your notes today!', image: require('../../assets/onboard3.png') }
// ];

// const OnboardingScreen = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigation = useNavigation();

//   const handleNext = async () => {
//     if (currentIndex < onboardingData.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       await AsyncStorage.setItem('onboardingCompleted', 'true');
//     //   navigation.replace('AuthScreen'); // Navigate to Auth Screen
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={onboardingData[currentIndex].image} style={styles.image} />
//       <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>
//       <Text style={styles.description}>{onboardingData[currentIndex].description}</Text>

//       <TouchableOpacity style={styles.button} onPress={handleNext}>
//         <Text style={styles.buttonText}>{currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
//   image: { width: 300, height: 300, marginBottom: 20 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
//   description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
//   button: { backgroundColor: '#3498db', padding: 15, borderRadius: 8 },
//   buttonText: { color: '#fff', fontSize: 18 }
// });

// export default OnboardingScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type OnboardingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const onboardingData = [
    "Welcome to Notes App! Easily organize your notes.",
    "Secure your notes with encrypted storage.",
    "Start now and never lose your notes again!"
  ];

  useEffect(() => {
    checkIfOnboardingIsComplete();
  }, []);

  const checkIfOnboardingIsComplete = async () => {
    const isComplete = await EncryptedStorage.getItem("onboarding_complete");
    if (isComplete === "true") {
      navigation.replace("Landing");
    }
  };

  const handleNext = async () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      await EncryptedStorage.setItem("onboarding_complete", "true");
      navigation.replace("Landing");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{onboardingData[currentPage]}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentPage < onboardingData.length - 1 ? "Next" : "Get Started"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 18, textAlign: 'center', marginBottom: 20 },
  button: { backgroundColor: '#1D2231', padding: 12, borderRadius: 8 },
  buttonText: { color: 'white', fontSize: 16 },
});

export default OnboardingScreen;
