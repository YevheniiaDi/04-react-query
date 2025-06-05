import type { Movie } from '../../types/movie';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className={styles.card}>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
      ) : (
        <div className={styles.noImage}>No Image</div>
      )}
      <h3>{movie.title}</h3>
      <p>{movie.release_date}</p>
    </div>
  );
}

export default MovieCard;