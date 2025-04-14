
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { FAB } from 'react-native-paper';
// import { getNotes, deleteNote, Note } from '../../utils/database';
// import { requestPermissions } from '../../utils/Permisions';

// const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//    // State to store the list of notes
//   const [notes, setNotes] = useState<Note[]>([]);

//    // useEffect to fetch notes when the screen loads or when it comes into focus
//   useEffect(() => {
//     fetchNotes();
//         // Re-fetch notes when the screen is focused (e.g., after adding or editing a note)
//     const unsubscribe = navigation.addListener('focus', fetchNotes);
//     return unsubscribe; // Cleanup function to remove the listener
//   }, [navigation]);

//   useEffect(() => {
//     requestPermissions().then(granted => {
//       if (!granted) {
//         Alert.alert('Permissions Required', 'Please grant all permissions to use audio and image features.');
//       }
//     });
//   }, []);
  

//     // Function to retrieve notes from the database
//   const fetchNotes = async () => {
//     try {
//       const fetchedNotes = await getNotes();
//       setNotes(fetchedNotes);
//     } catch (error) {
//       // console.error('Error fetching notes:', error);
//     }
//   };

//   const handleDelete = (id: number) => {
//      // Function to handle note deletion with a confirmation alert
//     Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         onPress: async () => {
//           await deleteNote(id);
//           fetchNotes();
//         },
//         style: 'destructive', // Styling for destructive action (red text on iOS)
//       },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Notes</Text>

//       {notes.length === 0 ? (
//         <Text style={styles.emptyText}>No notes yet. Add one!</Text>
//       ) : (
//         <FlatList
//           data={notes}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.note}
//               onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
//               onLongPress={() => handleDelete(item.id)}
//             >
//               <Text style={styles.noteText}>{item.title}</Text>
//             </TouchableOpacity>
//           )}
//         />
//       )}
// {/* label="Add Note" */}
//       <FAB style={styles.fab} icon="plus"  onPress={() => navigation.navigate('AddNote')} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   emptyText: { fontSize: 16, textAlign: 'center', marginTop: 20, color: '#777' },
//   note: { padding: 15, backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 10, elevation: 3 },
//   noteText: { fontSize: 16 },
//   fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
// });

// export default HomeScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { FAB } from 'react-native-paper';
import { getNotes, deleteNote, Note } from '../../utils/database';
import { requestPermissions } from '../../utils/Permisions';
import Sound from 'react-native-sound';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
    const unsubscribe = navigation.addListener('focus', fetchNotes);
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    requestPermissions().then(granted => {
      if (!granted) {
        Alert.alert('Permissions Required', 'Please grant all permissions to use audio and image features.');
      }
    });
  }, []);

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteNote(id);
          fetchNotes();
        },
        style: 'destructive',
      },
    ]);
  };

  const playAudio = (audioUri?: string) => {
    if (!audioUri) return;

    const sound = new Sound(audioUri, '', (error) => {
      if (error) {
        console.error('Failed to load sound', error);
        return;
      }
      sound.play((success) => {
        if (!success) console.error('Playback failed due to audio decoding errors');
        sound.release(); // Release when done
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Notes</Text>

      {notes.length === 0 ? (
        <Text style={styles.emptyText}>No notes yet. Add one!</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.note}
              onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
              onLongPress={() => handleDelete(item.id)}
            >
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteContent}>{item.content}</Text>

              {item.imageUri && (
                <Image source={{ uri: item.imageUri }} style={styles.imagePreview} />
              )}

              {item.audioUri && (
                <TouchableOpacity onPress={() => playAudio(item.audioUri)} style={styles.audioButton}>
                  <Text style={styles.audioText}>▶️ Play Audio</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          )}
        />
      )}

      <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('AddNote')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 20, color: '#777' },
  note: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
  },
  noteTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  noteContent: { fontSize: 14, color: '#333', marginBottom: 6 },
  imagePreview: { width: '100%', height: 180, marginTop: 6, borderRadius: 8 },
  audioButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
    alignItems: 'center',
  },
  audioText: { color: '#3498db', fontWeight: 'bold' },
  fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
});

export default HomeScreen;
