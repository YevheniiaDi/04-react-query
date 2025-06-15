import React from 'react';
import styles from './MovieModal.module.css';
import { Movie } from '../../types/movie';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieModal;
