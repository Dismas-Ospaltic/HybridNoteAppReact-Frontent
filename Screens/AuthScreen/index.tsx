// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const AuthScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome</Text>
//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.button, { backgroundColor: '#DB4437' }]}>
//         <Text style={styles.buttonText}>Login with Google</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.button, { backgroundColor: '#4267B2' }]}>
//         <Text style={styles.buttonText}>Login with Facebook</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   button: { width: '80%', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10, backgroundColor: '#3498db' },
//   buttonText: { color: '#fff', fontSize: 18 }
// });

// export default AuthScreen;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type AuthScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AuthScreen'>;
};

const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Choose how you want to log in:</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonOutline}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonOutline}>
        <Text style={styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: '#1D2231', padding: 12, borderRadius: 8, marginBottom: 10 },
  buttonOutline: { backgroundColor: '#4267B2', padding: 12, borderRadius: 8, marginBottom: 10 },
  buttonText: { color: 'white', fontSize: 16 },
});

export default AuthScreen;
