export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateTask = (text: string) => {
  const trimmed = text.trim();
  
  if (!trimmed) {
    throw new ValidationError('Task cannot be empty');
  }
  
  if (trimmed.length < 3) {
    throw new ValidationError('Task must be at least 3 characters long');
  }
  
  if (trimmed.length > 100) {
    throw new ValidationError('Task cannot be longer than 100 characters');
  }
  
  return trimmed;
}; 