
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface Note {
  id: number;
  title: string;
  content: string;
  imageUri?: string;
  audioUri?: string;
}


/**
 * Fetch all notes from AsyncStorage
 */
export const getNotes = async (): Promise<Note[]> => {
  try {
    const notesJson = await AsyncStorage.getItem('notes');
    return notesJson ? JSON.parse(notesJson) : [];
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

/**
 * Insert a new note into AsyncStorage
 */



export const insertNote = async (title: string, content: string, imageUri?: string, audioUri?: string) => {
  try {
    const notes = await getNotes();
    const newNote: Note = { id: Date.now(), title, content, imageUri, audioUri };
    const updatedNotes = [...notes, newNote];
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  } catch (error) {
    console.error('Error inserting note:', error);
  }
};


/**
 * Delete a note by ID
 */
export const deleteNote = async (id: number) => {
  try {
    const notes = await getNotes();
    const filteredNotes = notes.filter((note: Note) => note.id !== id);
    await AsyncStorage.setItem('notes', JSON.stringify(filteredNotes));
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};



export const updateNote = async (
  id: number,
  newTitle: string,
  newContent: string,
  imageUri?: string,
  audioUri?: string
) => {
  try {
    const notes = await getNotes();
    const updatedNotes = notes.map(note =>
      note.id === id
        ? { ...note, title: newTitle, content: newContent, imageUri, audioUri }
        : note
    );
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  } catch (error) {
    console.error('Error updating note:', error);
  }
};

