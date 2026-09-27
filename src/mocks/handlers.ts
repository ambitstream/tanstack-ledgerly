import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get('/api/transactions', () => {
    return HttpResponse.json([{
      id: 1,
      userId: 1,
      title: 'Test title 1',
    }, {
      id: 2,
      userId: 2,
      title: 'Test title 2',
    }, {
      id: 3,
      userId: 3,
      title: 'Test title 3',
    }])
  }),
];