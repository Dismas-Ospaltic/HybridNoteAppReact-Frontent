
// import React, { useState } from 'react';
// import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// import { TextInput, FAB } from 'react-native-paper';
// import { insertNote } from '../../utils/database';

// const AddNoteScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSave = async () => {
//     if (!title.trim() || !content.trim()) {
//       Alert.alert('Error', 'Title and Content cannot be empty');
//       return;
//     }

//     try {
//       await insertNote(title, content);
//       navigation.goBack(); // Navigate back after saving
//     } catch (error) {
//       console.error('Error saving note:', error);
//       Alert.alert('Error', 'Failed to save note');
//     }
//   };

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
//       <TextInput label="Title" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
//       <TextInput label="Content" value={content} onChangeText={setContent} mode="outlined" multiline numberOfLines={6} style={styles.textarea} />
//       {/* <FAB style={styles.fab} icon="content-save" label="Save" onPress={handleSave} /> */}
//       <FAB
//   style={styles.fab}
//   icon="content-save"
//   onPress={handleSave}
// />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   input: { marginBottom: 10 },
//   textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
//   fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
// });

// export default AddNoteScreen;

// import React, { useState } from 'react';
// import {
//   View, StyleSheet, KeyboardAvoidingView, Platform, Alert, Image
// } from 'react-native';
// import { TextInput, FAB, IconButton } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
// import { Audio } from 'expo-av';
// import { insertNote } from '../../utils/database';

// const AddNoteScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
//   const [audioUri, setAudioUri] = useState<string | null>(null);

//   const handleSave = async () => {
//     if (!title.trim() || !content.trim()) {
//       Alert.alert('Error', 'Title and Content cannot be empty');
//       return;
//     }

//     try {
//       await insertNote(title, content, imageUri ?? undefined, audioUri ?? undefined);
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error saving note:', error);
//       Alert.alert('Error', 'Failed to save note');
//     }
//   };

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   const takePhoto = async () => {
//     const result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       setImageUri(result.assets[0].uri);
//     }
//   };

//   const startRecording = async () => {
//     try {
//       const permission = await Audio.requestPermissionsAsync();
//       if (permission.granted === false) {
//         Alert.alert('Permission Denied', 'Microphone access is required to record audio.');
//         return;
//       }

//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );

//       setRecording(recording);
//     } catch (error) {
//       console.error('Failed to start recording', error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       await recording?.stopAndUnloadAsync();
//       const uri = recording?.getURI();
//       setAudioUri(uri ?? null);
//       setRecording(null);
//     } catch (error) {
//       console.error('Failed to stop recording', error);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <TextInput
//         label="Title"
//         value={title}
//         onChangeText={setTitle}
//         mode="outlined"
//         style={styles.input}
//       />
//       <TextInput
//         label="Content"
//         value={content}
//         onChangeText={setContent}
//         mode="outlined"
//         multiline
//         numberOfLines={6}
//         style={styles.textarea}
//       />

//       <View style={styles.mediaControls}>
//         <IconButton icon="image" size={28} onPress={pickImage} />
//         <IconButton icon="camera" size={28} onPress={takePhoto} />
//         <IconButton
//           icon={recording ? 'stop-circle' : 'microphone'}
//           size={28}
//           onPress={recording ? stopRecording : startRecording}
//         />
//       </View>

//       {imageUri && (
//         <Image source={{ uri: imageUri }} style={styles.previewImage} />
//       )}

//       {audioUri && (
//         <View style={styles.audioStatus}>
//           <IconButton icon="volume-high" />
//           <View><Text style={{ fontSize: 14 }}>Audio recorded</Text></View>
//         </View>
//       )}

//       <FAB
//         style={styles.fab}
//         icon="content-save"
//         onPress={handleSave}
//       />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   input: { marginBottom: 10 },
//   textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
//   fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
//   mediaControls: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
//   previewImage: { width: '100%', height: 180, marginTop: 15, borderRadius: 8 },
//   audioStatus: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
// });

// export default AddNoteScreen;

// import React, { useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   Image,
//   Text,
// } from 'react-native';
// import { TextInput, FAB, IconButton } from 'react-native-paper';
// import {
//   launchCamera,
//   launchImageLibrary,
//   ImageLibraryOptions,
//   CameraOptions,
// } from 'react-native-image-picker';
// import { Audio } from 'expo-av';
// import { insertNote } from '../../utils/database'; // make sure this file exists

// const AddNoteScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageUri, setImageUri] = useState<string | null>(null);
//   const [recording, setRecording] = useState<Audio.Recording | null>(null);
//   const [audioUri, setAudioUri] = useState<string | null>(null);

//   const handleSave = async () => {
//     if (!title.trim() || !content.trim()) {
//       Alert.alert('Error', 'Title and Content cannot be empty');
//       return;
//     }

//     try {
//       await insertNote(title, content, imageUri ?? undefined, audioUri ?? undefined);
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error saving note:', error);
//       Alert.alert('Error', 'Failed to save note');
//     }
//   };

//   const pickImage = () => {
//     const options: ImageLibraryOptions = {
//       mediaType: 'photo',
//       quality: 0.7,
//     };

//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.error('ImagePicker Error: ', response.errorMessage);
//       } else {
//         const uri = response.assets?.[0]?.uri;
//         if (uri) setImageUri(uri);
//       }
//     });
//   };

//   const takePhoto = () => {
//     const options: CameraOptions = {
//       mediaType: 'photo',
//       quality: 0.7,
//       saveToPhotos: true,
//     };

//     launchCamera(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled camera');
//       } else if (response.errorCode) {
//         console.error('Camera Error: ', response.errorMessage);
//       } else {
//         const uri = response.assets?.[0]?.uri;
//         if (uri) setImageUri(uri);
//       }
//     });
//   };

//   const startRecording = async () => {
//     try {
//       const permission = await Audio.requestPermissionsAsync();
//       if (!permission.granted) {
//         Alert.alert('Permission Denied', 'Microphone access is required to record audio.');
//         return;
//       }

//       await Audio.setAudioModeAsync({
//         allowsRecordingIOS: true,
//         playsInSilentModeIOS: true,
//       });

//       const { recording } = await Audio.Recording.createAsync(
//         Audio.RecordingOptionsPresets.HIGH_QUALITY
//       );

//       setRecording(recording);
//     } catch (error) {
//       console.error('Failed to start recording', error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       await recording?.stopAndUnloadAsync();
//       const uri = recording?.getURI();
//       setAudioUri(uri ?? null);
//       setRecording(null);
//     } catch (error) {
//       console.error('Failed to stop recording', error);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <TextInput
//         label="Title"
//         value={title}
//         onChangeText={setTitle}
//         mode="outlined"
//         style={styles.input}
//       />
//       <TextInput
//         label="Content"
//         value={content}
//         onChangeText={setContent}
//         mode="outlined"
//         multiline
//         numberOfLines={6}
//         style={styles.textarea}
//       />

//       <View style={styles.mediaControls}>
//         <IconButton icon="image" size={28} onPress={pickImage} />
//         <IconButton icon="camera" size={28} onPress={takePhoto} />
//         <IconButton
//           icon={recording ? 'stop-circle' : 'microphone'}
//           size={28}
//           onPress={recording ? stopRecording : startRecording}
//         />
//       </View>

//       {imageUri && (
//         <Image source={{ uri: imageUri }} style={styles.previewImage} />
//       )}

//       {audioUri && (
//         <View style={styles.audioStatus}>
//           <IconButton icon="volume-high" />
//           <Text style={{ fontSize: 14 }}>Audio recorded</Text>
//         </View>
//       )}

//       <FAB style={styles.fab} icon="content-save" onPress={handleSave} />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   input: { marginBottom: 10 },
//   textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
//   fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
//   mediaControls: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
//   previewImage: { width: '100%', height: 180, marginTop: 15, borderRadius: 8 },
//   audioStatus: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
// });

// export default AddNoteScreen;

import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, Image, Button, Text } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import { insertNote } from '../../utils/database';
import { launchImageLibrary } from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { PermissionsAndroid } from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AddNoteScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [audioUri, setAudioUri] = useState<string | undefined>();
  const [isRecording, setIsRecording] = useState(false);

  // Pick image
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Request Android permission
  const requestAudioPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Permission',
          message: 'App needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Start recording
  const startRecording = async () => {
    const granted = await requestAudioPermission();
    if (!granted) return;

    const path = Platform.select({
      ios: 'recorded.m4a',
      android: `${Date.now()}.mp3`,
    });

    await audioRecorderPlayer.startRecorder(path!);
    setIsRecording(true);
  };

  // Stop recording
  const stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    setAudioUri(result);
    setIsRecording(false);
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Title and Content cannot be empty');
      return;
    }

    try {
      await insertNote(title, content, imageUri, audioUri);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save note');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TextInput label="Title" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
      <TextInput label="Content" value={content} onChangeText={setContent} mode="outlined" multiline numberOfLines={6} style={styles.textarea} />

      <View style={styles.section}>
        <Button title="Pick Image" onPress={pickImage} />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
      </View>

      <View style={styles.section}>
        <Button
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
          onPress={isRecording ? stopRecording : startRecording}
        />
        {audioUri && <Text style={styles.audioText}>Audio saved</Text>}
      </View>

      <FAB style={styles.fab} icon="content-save" onPress={handleSave} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { marginBottom: 10 },
  textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
  fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
  imagePreview: { width: 100, height: 100, marginTop: 10, borderRadius: 8 },
  section: { marginVertical: 10 },
  audioText: { marginTop: 5, color: 'green' },
});

export default AddNoteScreen;
