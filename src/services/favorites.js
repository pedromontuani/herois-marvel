import firestore from '@react-native-firebase/firestore';

export const getFavoritesListObservable = uid => {
  return firestore()
    .collection('users')
    .doc(uid)
    .collection('favorites')
    .orderBy('name', 'asc');
};

export const addFavorite = async ({ uid, characterId, name, imageUrl }) => {
  console.log({ uid, characterId, name, imageUrl });
  return firestore()
    .collection('users')
    .doc(uid)
    .collection('favorites')
    .doc(characterId.toString())
    .set({
      name,
      imageUrl
    });
};

export const removeFavorite = async ({ uid, characterId }) => {
  return firestore()
    .collection('users')
    .doc(uid)
    .collection('favorites')
    .doc(characterId.toString())
    .delete();
};
