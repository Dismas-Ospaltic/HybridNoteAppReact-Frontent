// import SQLite from 'react-native-sqlite-storage';

// // Enable debugging (optional)
// SQLite.DEBUG(true);
// SQLite.enablePromise(true);

// // Open the database
// const db = SQLite.openDatabase(
//   { name: 'notes.db', location: 'default' },
//   () => console.log('Database opened successfully'),
//   (error) => console.error('Error opening database:', error)
// );

// // Create the notes table if it doesn't exist
// export const createTable = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS notes (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         title TEXT NOT NULL,
//         content TEXT NOT NULL
//       );`,
//       [],
//       () => console.log('Table created successfully'),
//       (_, error) => console.error('Error creating table:', error)
//     );
//   });
// };

// // Insert a new note
// export const insertNote = (title, content) => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'INSERT INTO notes (title, content) VALUES (?, ?);',
//         [title, content],
//         (_, result) => resolve(result),
//         (_, error) => reject(error)
//       );
//     });
//   });
// };

// // Fetch all notes
// export const getNotes = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'SELECT * FROM notes;',
//         [],
//         (_, result) => {
//           let notes = [];
//           for (let i = 0; i < result.rows.length; i++) {
//             notes.push(result.rows.item(i));
//           }
//           resolve(notes);
//         },
//         (_, error) => reject(error)
//       );
//     });
//   });
// };
// import SQLite from 'react-native-sqlite-storage';

// // Enable debugging (optional)
// SQLite.DEBUG(true);
// SQLite.enablePromise(true);

// // Open the database (async)
// const dbPromise = SQLite.openDatabase(
//   { name: 'notes.db', location: 'default' }
// ).then(db => {
//   console.log('Database opened successfully');
//   return db;
// }).catch(error => {
//   console.error('Error opening database:', error);
// });

// // Create the notes table if it doesn't exist
// export const createTable = async () => {
//   try {
//     const db = await dbPromise;
//     db.transaction(tx => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS notes (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           title TEXT NOT NULL,
//           content TEXT NOT NULL
//         );`,
//         [],
//         () => console.log('Table created successfully'),
//         (_, error) => console.error('Error creating table:', error)
//       );
//     });
//   } catch (error) {
//     console.error('Error in createTable:', error);
//   }
// };

// // Insert a new note
// export const insertNote = async (title, content) => {
//   try {
//     const db = await dbPromise;
//     return new Promise((resolve, reject) => {
//       db.transaction(tx => {
//         tx.executeSql(
//           'INSERT INTO notes (title, content) VALUES (?, ?);',
//           [title, content],
//           (_, result) => resolve(result),
//           (_, error) => reject(error)
//         );
//       });
//     });
//   } catch (error) {
//     console.error('Error inserting note:', error);
//   }
// };

// // Fetch all notes
// export const getNotes = async () => {
//   try {
//     const db = await dbPromise;
//     return new Promise((resolve, reject) => {
//       db.transaction(tx => {
//         tx.executeSql(
//           'SELECT * FROM notes;',
//           [],
//           (_, result) => {
//             let notes = [];
//             for (let i = 0; i < result.rows.length; i++) {
//               notes.push(result.rows.item(i));
//             }
//             resolve(notes);
//           },
//           (_, error) => reject(error)
//         );
//       });
//     });
//   } catch (error) {
//     console.error('Error fetching notes:', error);
//   }
// };

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Note {
  id: number;
  title: string;
  content: string;
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
export const insertNote = async (title: string, content: string) => {
  try {
    const notes = await getNotes();
    const newNote: Note = { id: Date.now(), title, content };
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
