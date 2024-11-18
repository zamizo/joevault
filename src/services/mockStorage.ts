export interface StorageSettings {
  maxOperationRetryTime: number;
  maxUploadRetryTime: number;
}

export class MockStorage {
  private settings: StorageSettings = {
    maxOperationRetryTime: 120000,
    maxUploadRetryTime: 120000
  };

  constructor(settings?: Partial<StorageSettings>) {
    this.settings = { ...this.settings, ...settings };
  }

  get maxOperationRetryTime(): number {
    return this.settings.maxOperationRetryTime;
  }

  get maxUploadRetryTime(): number {
    return this.settings.maxUploadRetryTime;
  }

  ref(path: string) {
    return {
      put: async (file: Blob | Uint8Array | ArrayBuffer) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate upload progress
        const totalBytes = file instanceof Blob ? file.size : file.byteLength;
        const chunks = 4;
        const chunkSize = Math.ceil(totalBytes / chunks);
        
        for (let i = 0; i < chunks; i++) {
          await new Promise(resolve => setTimeout(resolve, 250));
        }
        
        return {
          ref: {
            getDownloadURL: async () => {
              // Return a mock URL based on the file path
              return `https://mock-storage.example.com/${path}/${Date.now()}`;
            }
          }
        };
      },
      delete: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return Promise.resolve();
      }
    };
  }
}