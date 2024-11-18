import { User } from 'firebase/auth';

export class MockAuth {
  private currentUser: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!email || !password) {
      throw new Error('Invalid email or password');
    }

    // Test credentials validation
    if (email === 'test@example.com' && password === 'password') {
      this.currentUser = this.createMockUser(email);
      this.notifyListeners();
    } else {
      throw new Error('Invalid email or password');
    }
  }

  async createUserWithEmailAndPassword(email: string, password: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!email || !password) {
      throw new Error('Invalid email or password');
    }

    if (password.length < 6) {
      throw new Error('Password should be at least 6 characters');
    }

    // Simulate email already in use
    if (email === 'test@example.com') {
      throw new Error('Email already in use');
    }

    this.currentUser = this.createMockUser(email);
    this.notifyListeners();
  }

  async signOut(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    this.currentUser = null;
    this.notifyListeners();
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    this.listeners.push(callback);
    callback(this.currentUser);
    
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private createMockUser(email: string): User {
    return {
      uid: `mock-${Date.now()}`,
      email,
      emailVerified: true,
      isAnonymous: false,
      metadata: {
        creationTime: new Date().toISOString(),
        lastSignInTime: new Date().toISOString()
      },
      providerData: [{
        providerId: 'password',
        uid: email,
        displayName: null,
        email: email,
        phoneNumber: null,
        photoURL: null
      }],
      refreshToken: 'mock-refresh-token',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'mock-id-token',
      getIdTokenResult: async () => ({
        token: 'mock-id-token',
        signInProvider: 'password',
        claims: {},
        authTime: new Date().toISOString(),
        issuedAtTime: new Date().toISOString(),
        expirationTime: new Date(Date.now() + 3600000).toISOString(),
      }),
      reload: async () => {},
      toJSON: () => ({}),
      displayName: null,
      phoneNumber: null,
      photoURL: null,
      providerId: 'password',
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.currentUser);
      } catch (error) {
        console.error('Error in auth state change listener:', error);
      }
    });
  }
}