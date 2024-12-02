import { validateTask, ValidationError } from './validation';

describe('validateTask', () => {
  it('should return trimmed text for valid input', () => {
    const input = '  valid task  ';
    expect(validateTask(input)).toBe('valid task');
  });

  it('should throw ValidationError for empty input', () => {
    expect(() => validateTask('')).toThrow(ValidationError);
    expect(() => validateTask('   ')).toThrow('Task cannot be empty');
  });

  it('should throw ValidationError for short input', () => {
    expect(() => validateTask('ab')).toThrow(ValidationError);
    expect(() => validateTask('ab')).toThrow('Task must be at least 3 characters long');
  });

  it('should throw ValidationError for long input', () => {
    const longInput = 'a'.repeat(101);
    expect(() => validateTask(longInput)).toThrow(ValidationError);
    expect(() => validateTask(longInput)).toThrow('Task cannot be longer than 100 characters');
  });
}); 