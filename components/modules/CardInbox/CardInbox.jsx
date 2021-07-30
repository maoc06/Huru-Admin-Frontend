import { AttachFile } from '@material-ui/icons';
import { useNav } from '../../../lib/nav';
import { Avatar, Title } from '../../elements';

import styles from './CardInbox.module.css';

export default function CardInbox({
  type,
  data = {},
  date = 'Hoy 00:00 AM',
  onClickCard = () => {},
}) {
  const nav = useNav();
  const { user } = data;

  const handleMessage = () => {
    const formatData = { ...data };
    formatData.type = type;

    nav.setType(type);
    onClickCard(formatData);
  };

  return (
    <article className={styles.card} onClick={handleMessage}>
      <Avatar
        src={user.pictureUrl}
        alt={`foto de perfil del usuario ${user.name} ${user.lastName}`}
      />

      <section className={styles.content}>
        <div className={styles.inner}>
          <Title text={`${user.name} ${user.lastName}`} />
          <span>{date}</span>
        </div>

        <p>
          {type === 'verify-account'
            ? 'Solicitud de verificación de la cuenta.'
            : 'Solicitud de verificación de vehículo.'}
        </p>

        {type === 'verify-car' && (
          <div className={styles.attch}>
            <AttachFile style={{ color: '#070d9a', fontSize: 16 }} />
            <span className={styles.count}>
              {data.car.images.length} adjuntos.
            </span>
          </div>
        )}
      </section>
    </article>
  );
}
