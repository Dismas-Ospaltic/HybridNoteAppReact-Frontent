
// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
// import { TextInput, Button } from 'react-native-paper';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../App';
// import { loginUser } from '../../api/api';

// type LoginScreenProps = {
//   navigation: StackNavigationProp<RootStackParamList, 'Login'>;
// };

// const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setError('Email and password are required');
//       Alert.alert('Error', 'Email and password are required');
//       return;
//     }

//     setError('');
    
//     try {
//       await loginUser(email, password);
//       Alert.alert('Success', 'Login successful!', [{ text: 'OK', onPress: () => navigation.replace('MainApp') }]);
//     } catch (error) {
//       setError('Failed to login. Try again.');
//       Alert.alert('Error', 'Failed to login. Try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <TextInput
//         label="Email"
//         value={email}
//         onChangeText={setEmail}
//         mode="outlined"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         style={styles.input}
//       />

//       <TextInput
//         label="Password"
//         value={password}
//         onChangeText={setPassword}
//         mode="outlined"
//         secureTextEntry={!passwordVisible}
//         right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
//         style={styles.input}
//       />

//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       <Button mode="contained" onPress={handleLogin} style={styles.button}>
//         Login
//       </Button>

//       <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//         <Text style={styles.link}>Don't have an account? Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
//   title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
//   input: { marginBottom: 12 },
//   button: { marginTop: 10, backgroundColor: '#3498db' },
//   error: { color: 'red', textAlign: 'center', marginBottom: 10 },
//   link: { textAlign: 'center', marginTop: 15, color: '#3498db' },
// });

// export default LoginScreen;

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { loginUser } from '../../api/api';
import EncryptedStorage from 'react-native-encrypted-storage';

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     setError('Email and password are required');
  //     Alert.alert('Error', 'Email and password are required');
  //     return;
  //   }

  //   setError('');

  //   try {
  //     const response = await loginUser(email, password);
  //     if (response?.access_token) {
  //       Alert.alert('Success', 'Login successful!', [
  //         { text: 'OK', onPress: () => navigation.replace('MainApp') }
  //       ]);
  //     }
  //   } catch (error: any) {
  //     setError(error.message || 'Failed to login. Try again.');
  //     Alert.alert('Error', error.message || 'Failed to login. Try again.');
  //   }
  // };


  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      Alert.alert('Error', 'Email and password are required');
      return;
    }
  
    setError('');
  
    try {
      const response = await loginUser(email, password);
      if (response?.access_token) {
        await EncryptedStorage.setItem('access_token', response.access_token);
        await EncryptedStorage.setItem('refresh_token', response.refresh_token);
        
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => navigation.replace('MainApp') }
        ]);
      }
    } catch (error: any) {
      setError(error.message || 'Failed to login. Try again.');
      Alert.alert('Error', error.message || 'Failed to login. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry={!passwordVisible}
        right={<TextInput.Icon icon={passwordVisible ? "eye-off" : "eye"} onPress={() => setPasswordVisible(!passwordVisible)} />}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
      Login
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { marginBottom: 12 },
  button: { marginTop: 10, backgroundColor: '#3498db' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  link: { textAlign: 'center', marginTop: 15, color: '#3498db' },
});

export default LoginScreen;
