import { useNav } from '../../../lib/nav';
import { Avatar, Title } from '../../elements';

import styles from './CardUser.module.css';

export default function CardUser({ data = {}, onClickCard = () => {} }) {
  const nav = useNav();
  const { profilePhoto, firstName, lastName, uuid } = data;

  const handleUser = () => {
    nav.setType('user');
    onClickCard({ user: data });
  };

  return (
    <article className={styles.card} onClick={handleUser}>
      <Avatar
        src={profilePhoto}
        alt={`foto de perfil del usuario ${firstName} ${lastName}`}
      />

      <section className={styles.content}>
        <Title text={`${firstName} ${lastName}`} />

        <p>ID: {uuid}</p>
      </section>
    </article>
  );
}
