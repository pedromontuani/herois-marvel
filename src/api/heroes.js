import Api from './config';

export const findHeroesByQuery = ({ name, offset }) =>
  Api().get('/characters', {
    params: { nameStartsWith: name || undefined, offset }
  });

export const getById = id => Api().get(`/characters/${id}`);
