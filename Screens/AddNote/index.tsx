

// import React, { useState } from 'react';
// import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, Image, Button, Text } from 'react-native';
// import { TextInput, FAB } from 'react-native-paper';
// import { insertNote } from '../../utils/database';
// import { launchImageLibrary } from 'react-native-image-picker';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import { PermissionsAndroid } from 'react-native';

// const audioRecorderPlayer = new AudioRecorderPlayer();

// const AddNoteScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageUri, setImageUri] = useState<string | undefined>();
//   const [audioUri, setAudioUri] = useState<string | undefined>();
//   const [isRecording, setIsRecording] = useState(false);

//   // Pick image
//   const pickImage = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (response.assets && response.assets.length > 0) {
//         setImageUri(response.assets[0].uri);
//       }
//     });
//   };

//   // Request Android permission
//   const requestAudioPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         {
//           title: 'Audio Permission',
//           message: 'App needs access to your microphone to record audio.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   // Start recording
//   const startRecording = async () => {
//     const granted = await requestAudioPermission();
//     if (!granted) return;

//     const path = Platform.select({
//       ios: 'recorded.m4a',
//       android: `${Date.now()}.mp3`,
//     });

//     await audioRecorderPlayer.startRecorder(path!);
//     setIsRecording(true);
//   };

//   // Stop recording
//   const stopRecording = async () => {
//     const result = await audioRecorderPlayer.stopRecorder();
//     setAudioUri(result);
//     setIsRecording(false);
//   };

//   const handleSave = async () => {
//     if (!title.trim() || !content.trim()) {
//       Alert.alert('Error', 'Title and Content cannot be empty');
//       return;
//     }

//     try {
//       await insertNote(title, content, imageUri, audioUri);
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error saving note:', error);
//       Alert.alert('Error', 'Failed to save note');
//     }
//   };

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
//       <TextInput label="Title" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
//       <TextInput label="Content" value={content} onChangeText={setContent} mode="outlined" multiline numberOfLines={6} style={styles.textarea} />

//       <View style={styles.section}>
//         <Button title="Pick Image" onPress={pickImage} />
//         {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
//       </View>

//        <View style={styles.section}>
//         <Button
//           title={isRecording ? 'Stop Recording' : 'Start Recording'}
//           onPress={isRecording ? stopRecording : startRecording}
//         />
//         {audioUri && <Text style={styles.audioText}>Audio saved</Text>}
//       </View>

//       <FAB style={styles.fab} icon="content-save" onPress={handleSave} />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   input: { marginBottom: 10 },
//   textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
//   fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
//   imagePreview: { width: 100, height: 100, marginTop: 10, borderRadius: 8 },
//   section: { marginVertical: 10 },
//   audioText: { marginTop: 5, color: 'green' },
// });

// export default AddNoteScreen;

// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, Image, Button, Text, TouchableOpacity  } from 'react-native';
// import { TextInput, FAB} from 'react-native-paper';
// import { insertNote } from '../../utils/database';
// import { launchImageLibrary } from 'react-native-image-picker';
// import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import { PermissionsAndroid } from 'react-native';
// import RNFS from 'react-native-fs'; // This library is for file system operations

// const audioRecorderPlayer = new AudioRecorderPlayer();

// const AddNoteScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageUri, setImageUri] = useState<string | undefined>();
//   const [audioUri, setAudioUri] = useState<string | undefined>();
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordSecs, setRecordSecs] = useState(0);
//   const [recordTime, setRecordTime] = useState('00:00:00');
//   const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);
//   const [audioPath, setAudioPath] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     return () => {
//       if (recordingInterval) {
//         clearInterval(recordingInterval);
//       }
//     };
//   }, [recordingInterval]);

//   // Pick image
//   const pickImage = () => {
//     launchImageLibrary({ mediaType: 'photo' }, (response) => {
//       if (response.assets && response.assets.length > 0) {
//         setImageUri(response.assets[0].uri);
//       }
//     });
//   };

//   // Request Audio Permission
//   const requestAudioPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         {
//           title: 'Audio Permission',
//           message: 'App needs access to your microphone to record audio.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   // Request Storage Permission for Android < 10
//   const requestStoragePermission = async () => {
//     if (Platform.OS === 'android' && Platform.Version < 29) {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission',
//           message: 'App needs access to your storage to save files.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true; // No need for storage permission on Android 10+
//   };

//   const audioRecorderPlayer = new AudioRecorderPlayer();

//   const onStartRecord = async () => {
//     if (isRecording) {
//       return;
//     }
  
//     const audioPermission = await requestAudioPermission();
//     const storagePermission = await requestStoragePermission();
  
//     if (audioPermission && storagePermission) {
//       let path: string | undefined;
      
//       // Choose a valid path based on the platform
//       if (Platform.OS === 'ios') {
//         path = `${RNFS.DocumentDirectoryPath}/recorded.m4a`; // iOS: Save to Document Directory
//       } else if (Platform.OS === 'android') {
//         // For Android, save to the app-specific external directory
//         path = `${RNFS.ExternalDirectoryPath}/${Date.now()}.mp3`; // Android: Save to external storage
//       }
  
//       try {
//         await audioRecorderPlayer.startRecorder(path!);
//         audioRecorderPlayer.addRecordBackListener((e) => {
//           setRecordSecs(e.currentPosition); // Corrected property
//           setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition * 1000)));
//           return;
//         });
//         setIsRecording(true);
//         const interval = setInterval(() => {
//           setRecordSecs((prevSecs) => prevSecs + 1);
//           setRecordTime(audioRecorderPlayer.mmssss(recordSecs * 1000));
//         }, 1000);
//         setRecordingInterval(interval);
//       } catch (error) {
//         console.error('Error starting recording:', error);
//         Alert.alert('Error', 'Failed to start recording.');
//         setIsRecording(false);
//         if (recordingInterval) {
//           clearInterval(recordingInterval);
//           setRecordingInterval(null);
//         }
//       }
//     } else {
//       Alert.alert('Permission Denied', 'Please grant microphone and storage permissions.');
//     }
//   };

//   const onStopRecord = async () => {
//     if (isRecording) {
//       try {
//         const result = await audioRecorderPlayer.stopRecorder();
//         audioRecorderPlayer.removeRecordBackListener();
//         setAudioUri(result);
//         setIsRecording(false);
//         setRecordSecs(0);
//         setRecordTime('00:00:00');
//         if (recordingInterval) {
//           clearInterval(recordingInterval);
//           setRecordingInterval(null);
//         }
//       } catch (error) {
//         console.error('Error stopping recording:', error);
//         Alert.alert('Error', 'Failed to stop recording.');
//         setIsRecording(false);
//         if (recordingInterval) {
//           clearInterval(recordingInterval);
//           setRecordingInterval(null);
//         }
//       }
//     }
//   };

//   const handleSave = async () => {
//     if (!title.trim() || !content.trim()) {
//       Alert.alert('Error', 'Title and Content cannot be empty');
//       return;
//     }

//     try {
//       await insertNote(title, content, imageUri, audioUri);
//       navigation.goBack();
//     } catch (error) {
//       console.error('Error saving note:', error);
//       Alert.alert('Error', 'Failed to save note');
//     }
//   };


//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
//       <TextInput label="Title" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
//       <TextInput label="Content" value={content} onChangeText={setContent} mode="outlined" multiline numberOfLines={6} style={styles.textarea} />

//       <View style={styles.section}>
//         <Button title="Pick Image" onPress={pickImage} />
//         {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
//       </View>

//       <View style={styles.section}>
//         <Button
//           title={isRecording ? 'Stop Recording' : 'Start Recording'}
//           onPress={isRecording ? onStopRecord : onStartRecord}
//         />
//         {isRecording && <Text style={styles.recordingTime}>{recordTime}</Text>}
//         {audioUri && <Text style={styles.audioText}>Audio saved</Text>}
//       </View>


//       <FAB style={styles.fab} icon="content-save" onPress={handleSave} />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   input: { marginBottom: 10 },
//   textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
//   fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
//   imagePreview: { width: 100, height: 100, marginTop: 10, borderRadius: 8 },
//   section: { marginVertical: 10 },
//   audioText: { marginTop: 5, color: 'green' },
//   recordingTime: { marginTop: 5, fontWeight: 'bold' },
// });

// export default AddNoteScreen;

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, Image, Button, Text, TouchableOpacity } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import { insertNote } from '../../utils/database';
import { launchImageLibrary } from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs'; // File System

const audioRecorderPlayer = new AudioRecorderPlayer();

const AddNoteScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [audioUri, setAudioUri] = useState<string | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  }, [recordingInterval]);

  // Pick Image
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Request Audio Permission
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

  // Request Storage Permission for Android < 10
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 29) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // No need for storage permission on Android 10+
  };

  const onStartRecord = async () => {
    if (isRecording) {
      return;
    }
  
    const audioPermission = await requestAudioPermission();
    const storagePermission = await requestStoragePermission();
  
    if (audioPermission && storagePermission) {
      let path: string | undefined;
      
      // Choose a valid path based on the platform
      if (Platform.OS === 'ios') {
        path = `${RNFS.DocumentDirectoryPath}/recorded.m4a`; // iOS: Save to Document Directory
      } else if (Platform.OS === 'android') {
        // For Android, save to the app-specific external directory
        path = `${RNFS.ExternalDirectoryPath}/${Date.now()}.mp3`; // Android: Save to external storage
      }
  
      try {
        await audioRecorderPlayer.startRecorder(path!);
        audioRecorderPlayer.addRecordBackListener((e) => {
          setRecordSecs(e.currentPosition); // Corrected property
          setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition * 1000)));
          return;
        });
        setIsRecording(true);
        const interval = setInterval(() => {
          setRecordSecs((prevSecs) => prevSecs + 1);
          setRecordTime(audioRecorderPlayer.mmssss(recordSecs * 1000));
        }, 1000);
        setRecordingInterval(interval);
      } catch (error) {
        console.error('Error starting recording:', error);
        Alert.alert('Error', 'Failed to start recording.');
        setIsRecording(false);
        if (recordingInterval) {
          clearInterval(recordingInterval);
          setRecordingInterval(null);
        }
      }
    } else {
      Alert.alert('Permission Denied', 'Please grant microphone and storage permissions.');
    }
  };

  const onStopRecord = async () => {
    if (isRecording) {
      try {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setAudioUri(result);
        setIsRecording(false);
        setRecordSecs(0);
        setRecordTime('00:00:00');
        if (recordingInterval) {
          clearInterval(recordingInterval);
          setRecordingInterval(null);
        }
      } catch (error) {
        console.error('Error stopping recording:', error);
        Alert.alert('Error', 'Failed to stop recording.');
        setIsRecording(false);
        if (recordingInterval) {
          clearInterval(recordingInterval);
          setRecordingInterval(null);
        }
      }
    }
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
          onPress={isRecording ? onStopRecord : onStartRecord}
        />
        {isRecording && <Text style={styles.recordingTime}>{recordTime}</Text>}
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
  recordingTime: { marginTop: 5, fontWeight: 'bold' },
});

export default AddNoteScreen;
