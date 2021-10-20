import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import { cleanup } from '@testing-library/react-native';

global.window = {};
global.window = global;

const mockEncryptedStorage = {
  getItem: jest.fn(),
  setItem: jest.fn()
};

const mockToast = {
  show: jest.fn()
};

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('react-native-encrypted-storage', () => mockEncryptedStorage);
jest.mock('react-native-simple-toast', () => mockToast);

afterEach(cleanup);
