
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../App';

// type LandingScreenProps = {
//   navigation: StackNavigationProp<RootStackParamList, 'Landing'>;
// };

// const LandingScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Welcome to Notes App</Text>
//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AuthScreen')}>
//         <Text style={styles.buttonText}>Get Started</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
//   text: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   button: { backgroundColor: '#1D2231', padding: 15, borderRadius: 8 },
//   buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
// });

// export default LandingScreen;

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import EncryptedStorage from 'react-native-encrypted-storage';

type LandingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Landing'>;
};

const LandingScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await EncryptedStorage.getItem('access_token');
        if (token) {
          navigation.replace('MainApp'); // Skip to MainApp if token exists
        }
      } catch (error) {
        console.log('Error checking token:', error);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Notes App</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AuthScreen')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  text: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: { backgroundColor: '#1D2231', padding: 15, borderRadius: 8 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default LandingScreen;

