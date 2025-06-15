import React from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  action: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ action }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = (formData.get('query') as string).trim();

    if (!query) {
      toast.error('Please enter a search term.');
      return;
    }

    action(query);
    form.reset(); 
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        name="query"
        placeholder="Search movies..."
        className={css.input}
      />
      <button type="submit" className={css.button}>Search</button>
    </form>
  );
};

export default SearchBar;
