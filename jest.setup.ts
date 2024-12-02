import '@testing-library/jest-dom';

// Mock IndexedDB
const mockIndexedDB = {
  open: jest.fn().mockReturnValue({
    result: null,
    addEventListener: jest.fn(),
    onerror: null,
    onsuccess: null,
    onupgradeneeded: null,
  }),
  deleteDatabase: jest.fn(),
};

global.indexedDB = mockIndexedDB as any;

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
})); 