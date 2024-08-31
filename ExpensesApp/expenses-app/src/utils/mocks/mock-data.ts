import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default function applyMockAdapter(axiosInstance: AxiosInstance) {

  const mock = new MockAdapter(axiosInstance, { delayResponse: 500 });

  // Mock the POST request to /login
  mock.onPost('/login').reply((config: any) => {
    const requestData = JSON.parse(config.data)

    if (requestData.email === "silmaia@gmail.com" && requestData.password === "Seguro123") return [200, {
      isLoggedIn: true,
    }];
    return [200, {
      isLoggedIn: false
    }];
  });

  // Mock any other requests
  mock.onAny().reply(200, {
    status: 'Any other call will get this 😀',
    moreData: [1, 3, 4, 5],
  });
}


