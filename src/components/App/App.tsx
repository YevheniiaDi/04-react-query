import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import MovieList from '../MovieList/MovieList';
import Loader from '../Loader/Loader';

import { fetchMovies } from '../../services/movieService';
import type { TMDBSearchResponse } from '../../types/movie';

import styles from './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<TMDBSearchResponse, Error>(
    ['movies', query, page],
    () => fetchMovies(query, page),
    {
      enabled: !!query,
      keepPreviousData: true,
    }
  );

  const handleSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      toast.error('Please enter a search term.');
      return;
    }
    setQuery(trimmed);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <p className={styles.error}>Failed to load movies.</p>}

      {data && data.results.length === 0 && !isLoading && (
        <p className={styles.info}>No movies found for your request.</p>
      )}

      {data && data.results.length > 0 && (
        <>
          <MovieList movies={data.results} />

          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      <Toaster />
    </div>
  );
}

export default App;