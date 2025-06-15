import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

interface TMDBSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<TMDBSearchResponse> => {
  const response = await axios.get<TMDBSearchResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page,
        language: 'en-US',
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`, // ← залишив як у тебе
      },
    }
  );

  return response.data;
};
