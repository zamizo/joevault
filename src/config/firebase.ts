import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Configure storage with longer timeouts and retry settings
storage.maxOperationRetryTime = 120000; // 2 minutes
storage.maxUploadRetryTime = 120000; // 2 minutes

// If in development, use the storage emulator
if (import.meta.env.DEV) {
  try {
    connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    console.warn('Storage emulator connection failed:', error);
  }
}