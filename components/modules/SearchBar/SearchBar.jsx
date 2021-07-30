import { SearchRounded } from '@material-ui/icons';

import styles from './SearchBar.module.css';

export default function SearchBar({
  placeholder = 'Buscar...',
  onChange = () => {},
}) {
  return (
    <main className={styles.bar}>
      <SearchRounded style={{ color: '#4F4F4F', fontSize: 32 }} />
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />
    </main>
  );
}
