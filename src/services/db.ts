
type ProgressRecord = {
  moduleId: string;
  progress: number;
  lastUpdated: number;
};

type ResourceRecord = {
  id: string;
  title: string;
  content: string;
  type: string;
  lastAccessed: number;
};

class IndexedDBService {
  private dbName = "SchoolIsCoolDB";
  private dbVersion = 1;
  private db: IDBDatabase | null = null;
  
  async initDB(): Promise<IDBDatabase> {
    if (this.db) {
      return this.db;
    }
    
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains("progress")) {
          const progressStore = db.createObjectStore("progress", { keyPath: "moduleId" });
          progressStore.createIndex("lastUpdated", "lastUpdated", { unique: false });
        }
        
        if (!db.objectStoreNames.contains("resources")) {
          const resourcesStore = db.createObjectStore("resources", { keyPath: "id" });
          resourcesStore.createIndex("type", "type", { unique: false });
          resourcesStore.createIndex("lastAccessed", "lastAccessed", { unique: false });
        }
      };
      
      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        console.log("IndexedDB initialized successfully");
        resolve(this.db);
      };
      
      request.onerror = (event) => {
        console.error("IndexedDB initialization error:", (event.target as IDBOpenDBRequest).error);
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }
  
  async saveProgress(moduleId: string, progress: number): Promise<void> {
    const db = await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("progress", "readwrite");
      const store = transaction.objectStore("progress");
      
      const record: ProgressRecord = {
        moduleId,
        progress,
        lastUpdated: Date.now(),
      };
      
      const request = store.put(record);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  async getProgress(moduleId: string): Promise<number> {
    const db = await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("progress", "readonly");
      const store = transaction.objectStore("progress");
      const request = store.get(moduleId);
      
      request.onsuccess = () => {
        const data = request.result as ProgressRecord | undefined;
        resolve(data?.progress || 0);
      };
      
      request.onerror = () => reject(request.error);
    });
  }
  
  async saveResource(resource: Omit<ResourceRecord, "lastAccessed">): Promise<void> {
    const db = await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("resources", "readwrite");
      const store = transaction.objectStore("resources");
      
      const record: ResourceRecord = {
        ...resource,
        lastAccessed: Date.now(),
      };
      
      const request = store.put(record);
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
  
  async getResource(id: string): Promise<ResourceRecord | null> {
    const db = await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("resources", "readonly");
      const store = transaction.objectStore("resources");
      const request = store.get(id);
      
      request.onsuccess = () => {
        const data = request.result as ResourceRecord | undefined;
        if (data) {
          // Update last accessed timestamp
          this.updateResourceAccess(id).catch(console.error);
          resolve(data);
        } else {
          resolve(null);
        }
      };
      
      request.onerror = () => reject(request.error);
    });
  }
  
  private async updateResourceAccess(id: string): Promise<void> {
    const db = await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("resources", "readwrite");
      const store = transaction.objectStore("resources");
      const request = store.get(id);
      
      request.onsuccess = () => {
        const data = request.result as ResourceRecord | undefined;
        if (data) {
          data.lastAccessed = Date.now();
          store.put(data);
        }
        resolve();
      };
      
      request.onerror = () => reject(request.error);
    });
  }
  
  async getResourcesByType(type: string): Promise<ResourceRecord[]> {
    const db = await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction("resources", "readonly");
      const store = transaction.objectStore("resources");
      const index = store.index("type");
      const request = index.getAll(type);
      
      request.onsuccess = () => {
        resolve(request.result as ResourceRecord[]);
      };
      
      request.onerror = () => reject(request.error);
    });
  }
}

export const dbService = new IndexedDBService();
