import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const path = 'some/path';
const data = {
  something: 'some data',
};

describe('throttledGetDataFromApi', () => {
  let axiosGet: jest.Mock;
  let mockAxiosClient: { get: jest.Mock };
  beforeEach(() => {
    jest.clearAllMocks();

    axiosGet = jest.fn().mockResolvedValue({ data });
    mockAxiosClient = { get: axiosGet };

    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);
  });

  afterEach(() => {
    throttledGetDataFromApi.cancel();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(path);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(path);
    expect(mockAxiosClient.get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(path);

    expect(result).toEqual(data);
  });
});
