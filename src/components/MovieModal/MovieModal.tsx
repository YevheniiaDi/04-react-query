import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { MouseEvent } from 'react';
import type { Movie } from '../../types/movie';
import styles from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : null;

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>×</button>

        {backdropUrl && (
          <img src={backdropUrl} alt="Backdrop" className={styles.backdrop} />
        )}

        <div className={styles.content}>
          <img src={posterUrl} alt={movie.title} className={styles.poster} />
          <div>
            <h2>{movie.title}</h2>
            <p><strong>Release date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.vote_average}/10</p>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default MovieModal;