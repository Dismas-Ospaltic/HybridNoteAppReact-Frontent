
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
// import { FAB } from 'react-native-paper';
// import { getNotes, deleteNote, Note } from '../../utils/database';
// import { requestPermissions } from '../../utils/Permisions';
// import Sound from 'react-native-sound';

// const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [currentSound, setCurrentSound] = useState<Sound | null>(null);

//   useEffect(() => {
//     fetchNotes();
//     const unsubscribe = navigation.addListener('focus', fetchNotes);
//     return unsubscribe;
//   }, [navigation]);

//   useEffect(() => {
//     requestPermissions().then(granted => {
//       if (!granted) {
//         Alert.alert('Permissions Required', 'Please grant all permissions to use audio and image features.');
//       }
//     });
//   }, []);

//   const fetchNotes = async () => {
//     try {
//       const fetchedNotes = await getNotes();
//       setNotes(fetchedNotes);
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//     }
//   };

//   const handleDelete = (id: string) => {
//     Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         onPress: async () => {
//           await deleteNote(id);
//           fetchNotes();
//         },
//         style: 'destructive',
//       },
//     ]);
//   };

//   // Function to play audio from the note
//   const playAudio = (audioUri?: string) => {
//     if (!audioUri) return;

//     // Stop the current playing audio if any
//     if (currentSound) {
//       currentSound.stop(() => currentSound.release());
//     }

//     // Ensure the audioUri is a valid file path (check its format and location)
//     const sound = new Sound(audioUri, '', (error) => {
//       if (error) {
//         console.error('Failed to load sound', error);
//         return;
//       }

//       // Play the audio once it is successfully loaded
//       sound.play((success) => {
//         if (success) {
//           console.log('Playback finished');
//         } else {
//           console.error('Playback failed due to audio decoding errors');
//         }
//         setCurrentSound(null);
//         sound.release(); // Release the sound object after playing
//       });

//       setCurrentSound(sound);
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Your Notes</Text>

//       {notes.length === 0 ? (
//         <Text style={styles.emptyText}>No notes yet. Add one!</Text>
//       ) : (
//         <FlatList
//           data={notes}
//           keyExtractor={(item) => item.id} // Use string ID for keyExtractor
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.note}
//               onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
//               onLongPress={() => handleDelete(item.id)}
//             >
//               <Text style={styles.noteTitle}>{item.title}</Text>
//               <Text style={styles.noteContent}>{item.content}</Text>

//               {item.imageUri && (
//                 <Image source={{ uri: item.imageUri }} style={styles.imagePreview} />
//               )}

//               {item.audioUri && (
//                 <TouchableOpacity onPress={() => playAudio(item.audioUri)} style={styles.audioButton}>
//                   <Text style={styles.audioText}>▶️ Play Audio</Text>
//                 </TouchableOpacity>
//               )}
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('AddNote')} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
//   emptyText: { fontSize: 16, textAlign: 'center', marginTop: 20, color: '#777' },
//   note: {
//     padding: 15,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 8,
//     marginBottom: 15,
//     elevation: 3,
//   },
//   noteTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
//   noteContent: { fontSize: 14, color: '#333', marginBottom: 6 },
//   imagePreview: { width: '100%', height: 180, marginTop: 6, borderRadius: 8 },
//   audioButton: {
//     marginTop: 10,
//     padding: 8,
//     backgroundColor: '#eee',
//     borderRadius: 6,
//     alignItems: 'center',
//   },
//   audioText: { color: '#3498db', fontWeight: 'bold' },
//   fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
// });

// export default HomeScreen;

import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { FAB } from 'react-native-paper';
import { getNotes, deleteNote, Note } from '../../utils/database';
import { requestPermissions } from '../../utils/Permisions';
import Sound from 'react-native-sound';

// Enable playback in silent mode (iOS only)
Sound.setCategory('Playback');

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [playingNoteId, setPlayingNoteId] = useState<string | null>(null); // Track which note's audio is active
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false); // Track if audio is playing or paused

  // Use useRef to hold the sound instance without causing re-renders on change
  const currentSoundRef = useRef<Sound | null>(null);

  // --- Fetch Notes and Permissions (Mostly Unchanged) ---
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

    // --- Cleanup Sound on Unmount ---
    return () => {
      if (currentSoundRef.current) {
        console.log('Releasing sound on component unmount');
        currentSoundRef.current.stop(() => {
            currentSoundRef.current?.release();
            currentSoundRef.current = null; // Clear the ref
        });
      }
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  const fetchNotes = async () => {
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleDelete = (id: string) => {
     // Stop audio if the note being deleted is the one playing
     if (playingNoteId === id) {
        stopAudio();
     }

    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteNote(id);
          fetchNotes(); // Refresh the list
        },
        style: 'destructive',
      },
    ]);
  };

  // --- Audio Control Functions ---

  const stopAudio = (callback?: () => void) => {
    if (currentSoundRef.current) {
      console.log('Stopping and releasing sound');
      currentSoundRef.current.stop(() => {
        currentSoundRef.current?.release();
        currentSoundRef.current = null; // Clear the ref
        setPlayingNoteId(null); // Reset state
        setIsAudioPlaying(false);
        if (callback) callback();
      });
    } else {
        // Ensure state is reset even if sound object wasn't there
        setPlayingNoteId(null);
        setIsAudioPlaying(false);
        if (callback) callback();
    }
  };

  const playAudio = (noteId: string, audioUri?: string) => {
    if (!audioUri) return;

    // Stop any currently playing audio before starting a new one
    stopAudio(() => {
        console.log(`Attempting to play: ${audioUri}`);
        const sound = new Sound(audioUri, '', (error) => {
            if (error) {
              console.error('Failed to load the sound', error);
              Alert.alert('Error', 'Could not load audio file.');
              setPlayingNoteId(null); // Reset state on error
              setIsAudioPlaying(false);
              currentSoundRef.current = null; // Clear ref on error
              return;
            }

            // Loaded successfully
            console.log(`Sound loaded: duration ${sound.getDuration()}s`);
            currentSoundRef.current = sound; // Store the sound object in the ref
            setPlayingNoteId(noteId);     // Set the active note ID
            setIsAudioPlaying(true);     // Set state to playing

            sound.play((success) => {
              if (success) {
                console.log('Playback finished successfully');
              } else {
                console.error('Playback failed due to audio decoding errors');
                Alert.alert('Error', 'Playback failed.');
              }
              // Playback finished or failed, reset state
              setIsAudioPlaying(false);
              setPlayingNoteId(null);
              sound.release(); // Release the sound object
              currentSoundRef.current = null; // Clear the ref
            });
        });
    });
  };

  const pauseAudio = () => {
    if (currentSoundRef.current && isAudioPlaying) {
      console.log('Pausing audio');
      currentSoundRef.current.pause(() => {
          setIsAudioPlaying(false); // Update state after pause completes
          console.log('Audio paused');
      });
    }
  };

  const resumeAudio = () => {
    if (currentSoundRef.current && !isAudioPlaying && playingNoteId) {
      console.log('Resuming audio');
      setIsAudioPlaying(true); // Set state to playing immediately
      currentSoundRef.current.play((success) => { // Re-attach the completion handler
        if (success) {
          console.log('Playback finished successfully after resume');
        } else {
          console.error('Playback failed after resume');
          // Don't alert here as it might already be handled by initial load error
        }
        // Playback finished or failed, reset state
        setIsAudioPlaying(false);
        setPlayingNoteId(null);
        currentSoundRef.current?.release(); // Release the sound object
        currentSoundRef.current = null; // Clear the ref
      });
    }
  };

  // --- Render ---
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Notes</Text>

      {notes.length === 0 ? (
        <Text style={styles.emptyText}>No notes yet. Add one!</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isCurrentlyPlaying = playingNoteId === item.id && isAudioPlaying;
            const isCurrentlyPaused = playingNoteId === item.id && !isAudioPlaying;

            return (
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

                {/* --- Conditional Audio Controls --- */}
                {item.audioUri && (
                  <View style={styles.audioControlsContainer}>
                    {!playingNoteId || playingNoteId !== item.id ? (
                      // Show Play button if no audio is active or a different note's audio is active
                      <TouchableOpacity onPress={() => playAudio(item.id, item.audioUri)} style={styles.audioButton}>
                        <Text style={styles.audioText}>▶️ Play</Text>
                      </TouchableOpacity>
                    ) : isCurrentlyPlaying ? (
                      // Show Pause button if this note's audio is playing
                      <TouchableOpacity onPress={pauseAudio} style={styles.audioButton}>
                        <Text style={styles.audioText}>⏸️ Pause</Text>
                      </TouchableOpacity>
                    ) : (
                      // Show Resume button if this note's audio is paused
                      <TouchableOpacity onPress={resumeAudio} style={styles.audioButton}>
                        <Text style={styles.audioText}>▶️ Resume</Text>
                      </TouchableOpacity>
                    )}

                    {/* Show Stop button only when this note's audio is active (playing or paused) */}
                    {(isCurrentlyPlaying || isCurrentlyPaused) && (
                       <TouchableOpacity onPress={() => stopAudio()} style={[styles.audioButton, styles.stopButton]}>
                         <Text style={[styles.audioText, styles.stopText]}>⏹️ Stop</Text>
                       </TouchableOpacity>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          }} // End renderItem
        /> // End FlatList
      )}

      <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('AddNote')} />
    </View>
  );
};

// --- Styles (Added styles for controls) ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  emptyText: { fontSize: 16, textAlign: 'center', marginTop: 20, color: '#777' },
  note: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  noteTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  noteContent: { fontSize: 14, color: '#333', marginBottom: 6 },
  imagePreview: { width: '100%', height: 180, marginTop: 6, borderRadius: 8 },
  // NEW Styles for audio controls
  audioControlsContainer: {
      flexDirection: 'row', // Arrange buttons horizontally
      marginTop: 10,
      alignItems: 'center', // Center items vertically
      justifyContent: 'flex-start', // Align buttons to the start
  },
  audioButton: {
    paddingVertical: 8,
    paddingHorizontal: 12, // More horizontal padding
    backgroundColor: '#e0e0e0', // Slightly darker grey
    borderRadius: 20,       // Rounded corners
    alignItems: 'center',
    marginRight: 10, // Add spacing between buttons
    minWidth: 80, // Ensure buttons have a minimum width
    justifyContent: 'center',
  },
  audioText: {
    color: '#3498db', // Blue text
    fontWeight: 'bold',
    fontSize: 14,
  },
  stopButton: {
    backgroundColor: '#f8d7da', // Light red background for stop
  },
  stopText: {
    color: '#721c24', // Dark red text for stop
  },
  // End NEW Styles
  fab: { position: 'absolute', right: 20, bottom: 30, backgroundColor: '#3498db' },
});

export default HomeScreen;
