
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
