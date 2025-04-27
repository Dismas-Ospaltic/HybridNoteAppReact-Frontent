// import React, { useState } from 'react';
// import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import { TextInput, Button } from 'react-native-paper';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../App';

// type EditNoteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditNote'>;
// type EditNoteScreenRouteProp = RouteProp<RootStackParamList, 'EditNote'>;

// interface Props {
//   navigation: EditNoteScreenNavigationProp;
//   route: EditNoteScreenRouteProp;
// }

// const EditNoteScreen: React.FC<Props> = ({ navigation, route }) => {
//   const [title, setTitle] = useState(route.params.noteId); // Pre-fill title
//   const [content, setContent] = useState('');

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
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

//       <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
//         Update Note
//       </Button>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   input: { marginBottom: 10 },
//   textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
//   button: { marginTop: 10, backgroundColor: '#3498db' },
// });

// export default EditNoteScreen;
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import { TextInput, Button, Snackbar } from 'react-native-paper';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../../App';
// import { getNotes, updateNote } from '../../utils/database';

// type EditNoteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditNote'>;
// type EditNoteScreenRouteProp = RouteProp<RootStackParamList, 'EditNote'>;

// interface Props {
//   navigation: EditNoteScreenNavigationProp;
//   route: EditNoteScreenRouteProp;
// }

// const EditNoteScreen: React.FC<Props> = ({ navigation, route }) => {
//   // const noteId = route.params.noteId;
//   const noteId = Number(route.params.noteId); // ✅ Convert to number

//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageUri, setImageUri] = useState('');
//   const [audioUri, setAudioUri] = useState('');
//   const [snackbarVisible, setSnackbarVisible] = useState(false);

//   useEffect(() => {
//     const loadNote = async () => {
//       const notes = await getNotes();
//       const note = notes.find(n => n.id === noteId);
//       if (note) {
//         setTitle(note.title);
//         setContent(note.content);
//         setImageUri(note.imageUri || '');
//         setAudioUri(note.audioUri || '');
//       }
//     };
//     loadNote();
//   }, [noteId]);

//   const handleUpdate = async () => {
//     await updateNote(noteId, title, content, imageUri, audioUri);
//     setSnackbarVisible(true);
//     setTimeout(() => navigation.goBack(), 1000); // Navigate back after showing message
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
//       <TextInput
//         label="Image URI"
//         value={imageUri}
//         onChangeText={setImageUri}
//         mode="outlined"
//         style={styles.input}
//       />
//       <TextInput
//         label="Audio URI"
//         value={audioUri}
//         onChangeText={setAudioUri}
//         mode="outlined"
//         style={styles.input}
//       />
//       <Button mode="contained" onPress={handleUpdate} style={styles.button}>
//         Update Note
//       </Button>

//       <Snackbar
//         visible={snackbarVisible}
//         onDismiss={() => setSnackbarVisible(false)}
//         duration={1000}
//       >
//         Note updated successfully!
//       </Snackbar>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   input: { marginBottom: 10 },
//   textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
//   button: { marginTop: 10, backgroundColor: '#3498db' },
// });

// export default EditNoteScreen;

// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   View,
//   Image,
// } from 'react-native';
// import { TextInput, Button, Snackbar } from 'react-native-paper';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RouteProp } from '@react-navigation/native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { RootStackParamList } from '../../App';
// import { getNotes, updateNote } from '../../utils/database';

// type EditNoteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditNote'>;
// type EditNoteScreenRouteProp = RouteProp<RootStackParamList, 'EditNote'>;

// interface Props {
//   navigation: EditNoteScreenNavigationProp;
//   route: EditNoteScreenRouteProp;
// }

// const EditNoteScreen: React.FC<Props> = ({ navigation, route }) => {
//   const noteId = Number(route.params.noteId);

//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageUri, setImageUri] = useState('');
//   const [audioUri, setAudioUri] = useState('');
//   const [snackbarVisible, setSnackbarVisible] = useState(false);

//   useEffect(() => {
//     const loadNote = async () => {
//       const notes = await getNotes();
//       const note = notes.find(n => n.id === noteId);
//       if (note) {
//         setTitle(note.title);
//         setContent(note.content);
//         setImageUri(note.imageUri || '');
//         setAudioUri(note.audioUri || '');
//       }
//     };
//     loadNote();
//   }, [noteId]);

//   const handleImageSelect = async () => {
//     const result = await launchImageLibrary({ mediaType: 'photo' });
//     if (result.assets && result.assets.length > 0) {
//       const selectedImage = result.assets[0].uri;
//       if (selectedImage) {
//         setImageUri(selectedImage);
//       }
//     }
//   };

//   const handleUpdate = async () => {
//     await updateNote(noteId, title, content, imageUri, audioUri);
//     setSnackbarVisible(true);
//     setTimeout(() => navigation.goBack(), 1000);
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

//       {imageUri ? (
//         <Image
//           source={{ uri: imageUri }}
//           style={styles.imagePreview}
//           resizeMode="cover"
//         />
//       ) : null}

//       <Button
//         mode="outlined"
//         onPress={handleImageSelect}
//         style={styles.imageButton}
//       >
//         {imageUri ? 'Change Image' : 'Select Image'}
//       </Button>

//       {/* <TextInput
//         label="Audio URI"
//         value={audioUri}
//         onChangeText={setAudioUri}
//         mode="outlined"
//         style={styles.input}
//       /> */}

//       <Button mode="contained" onPress={handleUpdate} style={styles.button}>
//         Update Note
//       </Button>

//       <Snackbar
//         visible={snackbarVisible}
//         onDismiss={() => setSnackbarVisible(false)}
//         duration={1000}
//       >
//         Note updated successfully!
//       </Snackbar>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   input: { marginBottom: 10 },
//   textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
//   imageButton: { marginBottom: 10 },
//   imagePreview: {
//     width: '100%',
//     height: 200,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   button: { marginTop: 10, backgroundColor: '#3498db' },
// });

// export default EditNoteScreen;




import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
} from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { RootStackParamList } from '../../App';
import { getNotes, updateNote } from '../../utils/database';

type EditNoteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditNote'>;
type EditNoteScreenRouteProp = RouteProp<RootStackParamList, 'EditNote'>;

interface Props {
  navigation: EditNoteScreenNavigationProp;
  route: EditNoteScreenRouteProp;
}

const EditNoteScreen: React.FC<Props> = ({ navigation, route }) => {
  const noteId = route.params?.noteId; // Ensure it's safely accessed

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [audioUri, setAudioUri] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      if (!noteId) return; // Make sure the noteId is defined
      const notes = await getNotes();
      const note = notes.find(n => n.id === noteId);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setImageUri(note.imageUri || '');
        setAudioUri(note.audioUri || '');
      }
    };

    loadNote();
  }, [noteId]);

  const handleImageSelect = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0].uri;
      if (selectedImage) {
        setImageUri(selectedImage);
      }
    }
  };

  const handleUpdate = async () => {
    if (!noteId) return; // Ensure noteId is available before updating
    await updateNote(noteId, title, content, imageUri, audioUri);
    setSnackbarVisible(true);
    setTimeout(() => navigation.goBack(), 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Content"
        value={content}
        onChangeText={setContent}
        mode="outlined"
        multiline
        numberOfLines={6}
        style={styles.textarea}
      />

      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.imagePreview}
          resizeMode="cover"
        />
      ) : null}

      <Button
        mode="outlined"
        onPress={handleImageSelect}
        style={styles.imageButton}
      >
        {imageUri ? 'Change Image' : 'Select Image'}
      </Button>

      <Button mode="contained" onPress={handleUpdate} style={styles.button}>
        Update Note
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={1000}
      >
        Note updated successfully!
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { marginBottom: 10 },
  textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
  imageButton: { marginBottom: 10 },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: { marginTop: 10, backgroundColor: '#3498db' },
});

export default EditNoteScreen;
