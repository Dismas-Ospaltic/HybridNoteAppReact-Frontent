// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const HomeScreen: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>📒 Notes Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;

//////////////////////////
// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { FAB } from 'react-native-paper';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../App';  // ✅ Use RootStackParamList instead of RootTabParamList
// import { RouteProp } from '@react-navigation/native';

// type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// interface Props {
//   navigation: HomeScreenNavigationProp;
// }

// const HomeScreen: React.FC<Props> = ({ navigation }) => {
//   const [notes, setNotes] = useState([
//     { id: '1', title: 'Buy groceries' },
//     { id: '2', title: 'Meeting at 3 PM' },
//     { id: '3', title: 'Workout session' }
//   ]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Notes</Text>
//       <FlatList
//         data={notes}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity 
//             style={styles.note} 
//             onPress={() => navigation.navigate('EditNote', { noteId: item.id })} // ✅ Correct navigation
//           >
//             <Text style={styles.noteText}>{item.title}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       {/* Floating Action Button (FAB) for Adding Notes */}
//       <FAB
//         style={styles.fab}
//         icon="plus"
//         label="Add Note"
//         onPress={() => navigation.navigate('AddNote')} // ✅ Correct navigation
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   note: { 
//     padding: 15, 
//     backgroundColor: '#f5f5f5', 
//     borderRadius: 8, 
//     marginBottom: 10, 
//     elevation: 3 // Adds slight shadow effect
//   },
//   noteText: { fontSize: 16 },
//   fab: { 
//     position: 'absolute', 
//     right: 20, 
//     bottom: 30, 
//     backgroundColor: '#3498db' 
//   },
// });

// export default HomeScreen;
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { FAB } from 'react-native-paper';
// import { getNotes } from '../../utils/database'; // Import from database.js

// interface Note {
//   id: number;
//   title: string;
//   content: string;
// }

// const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [notes, setNotes] = useState<Note[]>([]);

//   useEffect(() => {
//     fetchNotes();
//     const unsubscribe = navigation.addListener('focus', fetchNotes);
//     return unsubscribe;
//   }, [navigation]);

//   const fetchNotes = async () => {
//     try {
//       const fetchedNotes = (await getNotes()) as Note[];
//       setNotes(fetchedNotes);
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Notes</Text>
//       <FlatList
//         data={notes}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity 
//             style={styles.note} 
//             onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
//           >
//             <Text style={styles.noteText}>{item.title}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       <FAB style={styles.fab} icon="plus" label="Add Note" onPress={() => navigation.navigate('AddNote')} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   note: { padding: 15, backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 10, elevation: 3 },
//   noteText: { fontSize: 16 },
//   fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
// });

// export default HomeScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import { getNotes, deleteNote, Note } from '../../utils/database';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetchNotes();
    const unsubscribe = navigation.addListener('focus', fetchNotes);
    return unsubscribe;
  }, [navigation]);

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
              <Text style={styles.noteText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <FAB style={styles.fab} icon="plus" label="Add Note" onPress={() => navigation.navigate('AddNote')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 20, color: '#777' },
  note: { padding: 15, backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 10, elevation: 3 },
  noteText: { fontSize: 16 },
  fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
});

export default HomeScreen;
