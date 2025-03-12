// import axios from 'axios';
// import EncryptedStorage from 'react-native-encrypted-storage';

// // Create an Axios instance with default settings
// const apiClient = axios.create({
//   baseURL: "https://www.ospaltic.com/HybridNoteAppBackend", // API base URL
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Function to register a new user
// export const registerUser = async (email, password) => {
//   try {
//     const response = await apiClient.post('/auth/register', {
//       email,
//       password
//     });

//     console.log('Registration successful:', response.data);
//     return response.data; // Return server response
//   } catch (error) {
//     console.error('Registration failed:', error.response?.data || error.message);
//     throw error; // Rethrow to handle it in the calling function
//   }
// };

// // Function to log in a user and store the access & refresh tokens securely
// export const loginUser = async (email, password) => {
//   try {
//     const response = await apiClient.post('/auth/login', {
//       email,
//       password,
//     });

//     const { access_token, refresh_token, user_id } = response.data; // Extract tokens from response

//     // Store tokens securely
//     await EncryptedStorage.setItem(
//       "auth_tokens",
//       JSON.stringify({ access_token, refresh_token, user_id })
//     );

//     console.log('Login successful:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Login failed:', error.response?.data || error.message);
//     // throw error;
//   }
// };

// // Function to retrieve stored authentication tokens
// export const getAuthTokens = async () => {
//   try {
//     const tokens = await EncryptedStorage.getItem("auth_tokens");
//     return tokens ? JSON.parse(tokens) : null;
//   } catch (error) {
//     console.error("Error retrieving tokens:", error.message);
//     return null;
//   }
// };

// // Function to log out and clear stored tokens
// export const logoutUser = async () => {
//   try {
//     await EncryptedStorage.removeItem("auth_tokens");
//     console.log("User logged out successfully.");
//   } catch (error) {
//     console.error("Error logging out:", error.message);
//   }
// };

import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const apiClient = axios.create({
  baseURL: "https://www.ospaltic.com/HybridNoteAppBackend",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/register.php', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Registration failed');
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login.php', { email, password });

    if (!response.data?.access_token) {
      throw new Error("Invalid credentials");
    }

    await EncryptedStorage.setItem(
      "auth_tokens",
      JSON.stringify({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        user_id: response.data.user_id,
      })
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Login failed");
  }
};

export const getAuthTokens = async () => {
  try {
    const tokens = await EncryptedStorage.getItem("auth_tokens");
    return tokens ? JSON.parse(tokens) : null;
  } catch {
    return null;
  }
};

export const logoutUser = async () => {
  try {
    await EncryptedStorage.removeItem("auth_tokens");
  } catch {}
};
