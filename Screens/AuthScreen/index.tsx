
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

      {/* Email/Password Login */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Google Login */}
      <TouchableOpacity style={[styles.buttonOutline, { borderColor: '#DB4437' }]} onPress={() => console.log('Google Login')}>
        <Text style={[styles.buttonText, { color: '#DB4437' }]}>Login with Google</Text>
      </TouchableOpacity>

      {/* Facebook Login */}
      <TouchableOpacity style={[styles.buttonOutline, { borderColor: '#4267B2' }]} onPress={() => console.log('Facebook Login')}>
        <Text style={[styles.buttonText, { color: '#4267B2' }]}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 18, marginBottom: 20 },
  button: { backgroundColor: '#1D2231', padding: 12, borderRadius: 8, marginBottom: 10, width: '80%', alignItems: 'center' },
  buttonOutline: { backgroundColor: 'transparent', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 2, width: '80%', alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
});

export default AuthScreen;
