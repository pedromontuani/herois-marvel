import storage from '@react-native-firebase/storage';

export const uploadUserImage = async ({ uid, filePath, metadata }) => {
  const ref = storage().ref(`users/${uid}/photo.jpg`);
  return ref.putFile(filePath, metadata);
};
