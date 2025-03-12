// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { TextInput, Button } from 'react-native-paper';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../App';
// import { registerUser } from '../../api/api';

// type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

// interface Props {
//   navigation: SignupScreenNavigationProp;
// }

// const SignupScreen: React.FC<Props> = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [error, setError] = useState('');

//   const handleSignup = () => {
//     if (!email || !password || !confirmPassword) {
//       setError('All fields are required.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError('Passwords do not match.');
//       return;
//     }

//     setError('');
//     // navigation.replace('MainApp'); // Replace with actual signup logic
//    registerUser(email, password);

//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create an Account</Text>

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

//       <TextInput
//         label="Confirm Password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         mode="outlined"
//         secureTextEntry={!confirmPasswordVisible}
//         right={<TextInput.Icon icon={confirmPasswordVisible ? "eye-off" : "eye"} onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />}
//         style={styles.input}
//       />

//       {error ? <Text style={styles.error}>{error}</Text> : null}

//       <Button mode="contained" onPress={handleSignup} style={styles.button}>
//         Sign Up
//       </Button>

//       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.link}>Already have an account? Login</Text>
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

// export default SignupScreen;
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { registerUser } from '../../api/api';
import Toast from 'react-native-toast-message';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError('All fields are required.');
      Toast.show({ type: 'error', text1: 'Error', text2: 'All fields are required' });
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      Toast.show({ type: 'error', text1: 'Error', text2: 'Passwords do not match' });
      return;
    }

    setError('');
    
    try {
      await registerUser(email, password);
      Toast.show({ type: 'success', text1: 'Success', text2: 'Account created successfully!' });

      navigation.replace('MainApp'); // Navigate after successful signup
    } catch (error) {
      setError('Failed to create account.');
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to create account' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

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

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        mode="outlined"
        secureTextEntry={!confirmPasswordVisible}
        right={<TextInput.Icon icon={confirmPasswordVisible ? "eye-off" : "eye"} onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        <Text>Sign Up</Text>
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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

export default SignupScreen;
