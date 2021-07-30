import { Badge } from '../../elements';
import styles from './ItemState.module.css';

export default function ItemState({ isActive }) {
  return (
    <main className={styles.state}>
      <p>
        Estado: <strong>{isActive ? 'Activo' : 'Inactivo'}</strong>
      </p>
      <Badge isActive={isActive} />
    </main>
  );
}
