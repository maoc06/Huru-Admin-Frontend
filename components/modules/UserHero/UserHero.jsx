import { Avatar, Title } from '../../elements';

import styles from './UserHero.module.css';

export default function UserHero({ name, lastName, email, pictureUrl }) {
  return (
    <div className={styles.container}>
      <Avatar src={pictureUrl} />

      <div className={styles.content}>
        <Title text={`${name} ${lastName}`} />
        <p>{email}</p>
      </div>
    </div>
  );
}
