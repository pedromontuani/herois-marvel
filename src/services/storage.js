import storage from '@react-native-firebase/storage';

export const uploadUserImage = async ({ uid, filePath, metadata }) => {
  const ref = storage().ref(`users/${uid}/photo.jpg`);
  await ref.putFile(filePath, metadata);
  return ref.getDownloadURL();
};
