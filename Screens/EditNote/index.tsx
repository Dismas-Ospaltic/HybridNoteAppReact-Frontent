import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type EditNoteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditNote'>;
type EditNoteScreenRouteProp = RouteProp<RootStackParamList, 'EditNote'>;

interface Props {
  navigation: EditNoteScreenNavigationProp;
  route: EditNoteScreenRouteProp;
}

const EditNoteScreen: React.FC<Props> = ({ navigation, route }) => {
  const [title, setTitle] = useState(route.params.noteId); // Pre-fill title
  const [content, setContent] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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

      <Button mode="contained" onPress={() => navigation.goBack()} style={styles.button}>
        Update Note
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { marginBottom: 10 },
  textarea: { marginBottom: 10, height: 120, textAlignVertical: 'top' },
  button: { marginTop: 10, backgroundColor: '#3498db' },
});

export default EditNoteScreen;
