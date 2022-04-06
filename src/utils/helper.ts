import axios from 'axios';
export const fetchResults = async (url: string): Promise<any> => {
  const response: any = await axios.get(url);
  const data = await response.data;
  return data;
}