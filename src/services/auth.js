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
  return firebase.auth().currentUser;
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
          reject();
        }
      },
      error => reject(error)
    );
  });
};
