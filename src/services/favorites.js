import firestore from '@react-native-firebase/firestore';

export const getFavoritesList = async uid => {
  const collection = await firestore()
    .collection('users')
    .doc(uid)
    .collection('favorites')
    .get();

  const favorites = [];
  collection.forEach(comic => {
    const { name, imageUrl } = comic.data();
    favorites.push({ id: comic.id, name, imageUrl });
  });

  return favorites;
};

export const getFavoritesListObservable = uid => {
  return firestore().collection('users').doc(uid).collection('favorites');
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
