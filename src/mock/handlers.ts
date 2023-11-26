import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@/utils/constants/constants';

export const handlers = [
  http.get(`${BASE_URL}`, () => {
    return HttpResponse.error();
  }),

  http.get(`${BASE_URL}/:id`, ({ params }) => {
    const { details } = params;
    return HttpResponse.json({
      created: '2017-11-04T18:50:21.651Z',
      episode: ['https://rickandmortyapi.com/api/episode/1'],
      gender: 'Male',
      id: details,
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      location: {
        name: 'Citadel of Ricks',
        url: 'https://rickandmortyapi.com/api/location/3',
      },
      name: 'Morty Smith',
      origin: {
        name: 'unknown',
        url: '',
      },
      species: 'Human',
      status: 'Alive',
      type: '',
      url: 'https://rickandmortyapi.com/api/character/2',
    });
  }),
];