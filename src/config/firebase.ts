import { User } from 'firebase/auth';
import { MockAuth } from '../services/mockAuth';
import { MockStorage } from '../services/mockStorage';

// Initialize mock services
const mockAuth = new MockAuth();
const mockStorage = new MockStorage({
  maxOperationRetryTime: 120000,
  maxUploadRetryTime: 120000
});

// Export auth service
export const auth = mockAuth;

// Export storage service
export const storage = mockStorage;