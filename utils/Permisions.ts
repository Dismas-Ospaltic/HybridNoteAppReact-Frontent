// import { PermissionsAndroid, Platform } from 'react-native';

// export const requestPermissions = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const permissions = [
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//         PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,

//       ];

//       const granted = await PermissionsAndroid.requestMultiple(permissions);

//       const allGranted = Object.values(granted).every(status => status === PermissionsAndroid.RESULTS.GRANTED);

//       return allGranted;
//     } catch (err) {
//       console.warn('Permission request error:', err);
//       return false;
//     }
//   }
//   return true; // iOS handles this differently
// };

import { PermissionsAndroid, Platform } from 'react-native';

export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ];

      if (Platform.Version >= 33) {
        permissions.push(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        );
      } else {
        permissions.push(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      }

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      const allGranted = Object.values(granted).every(status => status === PermissionsAndroid.RESULTS.GRANTED);

      return allGranted;
    } catch (err) {
      console.warn('Permission request error:', err);
      return false;
    }
  }
  return true; // iOS handles this differently
};
