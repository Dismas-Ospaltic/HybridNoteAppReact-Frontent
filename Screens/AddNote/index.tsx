// import React, { useState } from 'react';
// import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import { TextInput, FAB } from 'react-native-paper';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../App';

// type AddNoteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddNote'>;

// interface Props {
//   navigation: AddNoteScreenNavigationProp;
// }

// const AddNoteScreen: React.FC<Props> = ({ navigation }) => {
//   const [title, setTitle] = useState('');
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

//       <FAB
//         style={styles.fab}
//         icon="content-save"
//         label="Save"
//         onPress={() => navigation.goBack()}
//       />
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
// import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// import { TextInput, FAB } from 'react-native-paper';
// import { insertNote } from '../../utils/database'; // Import database functions

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
//       navigation.goBack(); // Navigate back to HomeScreen
//     } catch (error) {
//       console.error('Error saving note:', error);
//       Alert.alert('Error', 'Failed to save note');
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

//       <FAB style={styles.fab} icon="content-save" label="Save" onPress={handleSave} />
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
import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import { insertNote } from '../../utils/database';

const AddNoteScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Error', 'Title and Content cannot be empty');
      return;
    }

    try {
      await insertNote(title, content);
      navigation.goBack(); // Navigate back after saving
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save note');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TextInput label="Title" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
      <TextInput label="Content" value={content} onChangeText={setContent} mode="outlined" multiline numberOfLines={6} style={styles.textarea} />
      <FAB style={styles.fab} icon="content-save" label="Save" onPress={handleSave} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { marginBottom: 10 },
  textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
  fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
});

export default AddNoteScreen;
