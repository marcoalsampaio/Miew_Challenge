import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UserInterface } from '../models';
import userImage from '../../assets/user_image.jpg'
export default function applyMockAdapter(axiosInstance: AxiosInstance) {
  const mock = new MockAdapter(axiosInstance, {delayResponse: 500});

  // Mock the POST request to /login
  mock.onPost('/login').reply((config: any) => {
    const requestData = JSON.parse(config.data)
    const user: UserInterface = {
        name: "Silvestre Maia",
        email: "silmaia@gmail.com",
        image: userImage
    }
    if(requestData.email === "silmaia@gmail.com" && requestData.password ==="Seguro123") return [200, {
        isLoggedIn: true,
        user: user
    }];
    return [200, {
        isLoggedIn: false
    }];
  });


  //Mock the Account Balance
  mock.onGet('/balance').reply(200, {
    accountBalance: 1250,
  });

  // Mock any other requests
  mock.onAny().reply(200, {
    status: 'Any other call will get this 😀',
    moreData: [1, 3, 4, 5],
  });
}


