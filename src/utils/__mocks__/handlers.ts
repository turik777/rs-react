import { http } from 'msw';
import { filterByName } from '../helpers/filterByName';
import { API_URL } from '../api';

export const mockCharacters = [
  {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
  },
  {
    id: '2',
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    species: 'Human',
    gender: 'Male',
    status: 'Alive',
  },
  {
    id: '3',
    name: 'Summer Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    species: 'Human',
    gender: 'Female',
    status: 'Alive',
  },
];

export const handlers = [
  http.get(API_URL, ({ request }) => {
    const name = new URL(request.url).searchParams.get('name');
    const filtered = name ? filterByName(name) : mockCharacters;
    return Response.json({ results: filtered });
  }),
];
