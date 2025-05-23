import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message'; // Import Toast

// Import screens
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import LandingScreen from './Screens/LandingScreen';
import OnboardingScreen from './Screens/OnboardingScreen';
import LoginScreen from './Screens/Auth';
import SignupScreen from './Screens/Signup';
import AuthScreen from './Screens/AuthScreen';
import EditNoteScreen from './Screens/EditNote';
import AddNoteScreen from './Screens/AddNote';

// Define the type for our Stack Navigator
export type RootStackParamList = {
  Landing: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  MainApp: undefined;
  Home: undefined;
  AuthScreen: undefined;
  AddNote: undefined;
  EditNote: { noteId: string };
};

// Define the type for our Tab Navigator
export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// Bottom Tab Navigator Component
const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1D2231',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main App Component
const App: React.FC = () => {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
    },
  };

  return (
    <PaperProvider>
      <NavigationContainer theme={MyTheme}>
        <SafeAreaView style={styles.safeArea}>
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="MainApp"
              component={BottomTabNavigator}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen name="AddNote" component={AddNoteScreen} />
            <Stack.Screen name="EditNote" component={EditNoteScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
      <Toast /> {/* Add Toast component here */}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
