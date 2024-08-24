import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default function applyMockAdapter(axiosInstance: AxiosInstance) {
  const mock = new MockAdapter(axiosInstance, {delayResponse: 500});

  // Mock the POST request to /login
  mock.onPost('/login').reply(200, {
    status: 'Login success',
  });

  // Mock any other requests
  mock.onAny().reply(200, {
    status: 'Any other call will get this 😀',
    moreData: [1, 3, 4, 5],
  });
}
