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
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [notes, setNotes] = useState([
    { id: '1', title: 'Buy groceries' },
    { id: '2', title: 'Meeting at 3 PM' },
    { id: '3', title: 'Workout session' }
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.note} onPress={() => navigation.navigate('EditNote', { noteId: item.id })}>
            <Text style={styles.noteText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddNote')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  note: { padding: 15, backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 10 },
  noteText: { fontSize: 16 },
  fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db', padding: 15, borderRadius: 30 },
  fabText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
});

export default HomeScreen;
