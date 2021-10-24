import auth from '@react-native-firebase/auth';
import { uploadUserImage } from './storage';

export const createUser = async ({ name, email, password, photo }) => {
  const { user } = await auth().createUserWithEmailAndPassword(email, password);
  let profile = {
    displayName: name,
    photoURL: null
  };
  if (photo) {
    const downloadURL = await uploadUserImage({
      uid: user.uid,
      filePath: photo.uri,
      metadata: {
        contentType: photo.type
      }
    });
    profile.photoURL = downloadURL;
  }
  await auth().currentUser.updateProfile(profile);
  return auth().currentUser;
};

export const signIn = async ({ email, password }) => {
  return auth().signInWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  return auth().signOut();
};

export const isAuthenticated = async () => {
  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged(
      user => {
        if (user) {
          resolve(user);
        } else {
          resolve(false);
        }
      },
      error => reject(error)
    );
  });
};
