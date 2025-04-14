import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const storedEmail = await EncryptedStorage.getItem('user_email');
        if (storedEmail) setEmail(storedEmail);
      } catch (error) {
        console.log('Failed to load email:', error);
      }
    };

    fetchEmail();
  }, []);



  const handleLogout = async () => {
    await EncryptedStorage.clear();
    // Navigate to login or splash screen
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>Logged in as:</Text>
        <Text style={styles.email}>{email || 'Loading...'}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>⚙️ Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f3',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  email: {
    fontSize: 18,
    color: '#2980b9',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import EncryptedStorage from 'react-native-encrypted-storage';

// const ProfileScreen = ({ navigation }: any) => {
//   const [email, setEmail] = useState('');

//   useEffect(() => {
//     const fetchEmail = async () => {
//       try {
//         const storedEmail = await EncryptedStorage.getItem('user_email');
//         if (storedEmail) setEmail(storedEmail);
//       } catch (error) {
//         console.log('Failed to load email:', error);
//       }
//     };

//     fetchEmail();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await EncryptedStorage.clear();

//       // ✅ Navigate to splash/login screen
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'SplashScreen' }], // Change to your login/splash screen name
//       });
//     } catch (error) {
//       console.log('Logout failed:', error);
//       Alert.alert('Error', 'Failed to logout. Try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.title}>Welcome!</Text>
//         <Text style={styles.subtitle}>Logged in as:</Text>
//         <Text style={styles.email}>{email || 'Loading...'}</Text>
//       </View>

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>⚙️ Settings</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.button, { backgroundColor: '#e74c3c' }]} onPress={handleLogout}>
//         <Text style={styles.buttonText}>🚪 Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ecf0f3',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 24,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 6,
//     marginBottom: 40,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#7f8c8d',
//     marginBottom: 4,
//   },
//   email: {
//     fontSize: 18,
//     color: '#2980b9',
//     fontWeight: '600',
//   },
//   button: {
//     backgroundColor: '#3498db',
//     paddingVertical: 14,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default ProfileScreen;