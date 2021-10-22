import auth from '@react-native-firebase/auth';
import { uploadUserImage } from './storage';

export const createUser = async ({ name, email, password, photo }) => {
  const { user } = await auth().createUserWithEmailAndPassword(email, password);
  const profile = {
    displayName: name
  };
  if (photo) {
    const fileObject = await uploadUserImage({
      uid: user.uid,
      filePath: photo.uri,
      metadata: {
        contentType: photo.type
      }
    });
    profile.photoURL = fileObject.downloadURL;
  }
  await auth().currentUser.updateProfile(profile);
};
