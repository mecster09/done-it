export class DatabaseError extends Error {
  constructor(message: string, public cause?: Error) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class DatabaseNotAvailableError extends DatabaseError {
  constructor() {
    super('IndexedDB is not available in this environment');
    this.name = 'DatabaseNotAvailableError';
  }
} 