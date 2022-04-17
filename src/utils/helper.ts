import axios, { AxiosResponse } from "axios";
import { SearchResponse } from "../types/SearchResponse";

/**
 * Manages API Get request to the movie api
 * @param searchTerm
 * @param page
 * @returns
 */
export const fetchResults = async (
  searchTerm: string,
  page: number = 1
): Promise<any> => {
  const url = `https://www.omdbapi.com?apikey=e3e00879&s=${searchTerm}&page=${page}`;
  try {
    const resp: AxiosResponse = await axios.get(url);
    const data: SearchResponse = await resp.data;
    return data;
  } catch (error) {
    throw error;
  }
};
