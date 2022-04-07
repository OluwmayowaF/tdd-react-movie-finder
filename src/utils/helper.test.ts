import { cleanup } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';

import { fetchResults } from './helper';
import { data } from './testpayload/searchResultPayload'
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchResults', () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('fetches successfully data from an API', async () => {
    // Desired response 
    const mockedResponse: AxiosResponse = {
        data,
        status: 200,
        statusText: 'Ok',
        headers: {},
        config: {},
    }

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(mockedAxios.get).not.toHaveBeenCalled();
    const request = await fetchResults('matrix');
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(request).toEqual(data);

  });
  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(fetchResults('url')).rejects.toThrow(errorMessage);

  });
});