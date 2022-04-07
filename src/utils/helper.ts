import axios, { AxiosResponse } from 'axios';
import { SearchResponse } from '../types/SearchResponse';

/**
 * Manages API Get request to the movie api
 * @param searchTerm 
 * @param page 
 * @returns 
 */
export const fetchResults = async (searchTerm: string, page:number = 1): Promise<any> => {
 const url = `${process.env.REACT_APP_API_BASE_URL}?apikey=${process.env.REACT_APP_API_KEY}&s=${searchTerm}&page=${page}`;
    try {
        const resp: AxiosResponse = await axios.get(url);
        const data: SearchResponse = await resp.data;
        return data;
    } catch (error) {
        throw error;
    }

}