import axios from 'axios';
import type { TMDBSearchResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string, page = 1): Promise<TMDBSearchResponse> => {
  const response = await axios.get<TMDBSearchResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
  return response.data;
};
