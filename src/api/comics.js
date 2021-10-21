import Api from './config';

export const findByCharacterId = characterId =>
  Api().get('/comics', {
    params: { characters: characterId }
  });
