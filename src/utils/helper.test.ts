import { waitFor } from '@testing-library/dom';
import axios from 'axios';

import { fetchResults } from './helper';
import { data } from "./testpayload/searchResultPayload"
jest.mock('axios');

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

const url = `${process.env.REACT_APP_API_BASE_URL}?apikey=${process.env.REACT_APP_API_KEY}&s=matrix`;

describe('fetchResults', () => {
  it('fetches successfully data from an API', () => {

    mockedAxios.mockResolvedValue(data);
    expect(mockedAxios).toHaveBeenCalled()
    //await expect(fetchResults(url)).resolves.toBe(data);
   
  });
  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(fetchResults('url')).rejects.toThrow(errorMessage);

  });
});