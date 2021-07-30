import axios from 'axios';
import { useEffect, useState } from 'react';

import { useStatusItem } from '../../../lib/updateStatusItem';
import { Button } from '../../elements';
import { UserHero, ItemState } from '../../modules';
import { formatDate, formatPhone, formatStatus } from '../../../utils';
import styles from './User.module.css';

const ENABLE_STATUS_ID = 1;
const DISABLE_STATUS_ID = 2;

export default function User({ user }) {
  const statusItem = useStatusItem();
  const {
    email,
    lastName,
    firstName,
    profilePhoto,
    uuid,
    identityDocument,
    phone,
    dateOfBirth,
    createdAt,
    status,
  } = user;

  const [isActive, setIsActive] = useState(false);

  const handleActionUser = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      axios.put(`/api/dbUser`, {
        accessToken,
        uuid,
        status: isActive ? DISABLE_STATUS_ID : ENABLE_STATUS_ID,
      });

      setIsActive(isActive ? false : true);
      statusItem.updateStatusUser({
        uuid,
        status: isActive ? DISABLE_STATUS_ID : ENABLE_STATUS_ID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsActive(formatStatus(status));
  }, [status]);

  return (
    <div className={styles.container}>
      <section className={styles.head}>
        <UserHero
          email={email}
          lastName={lastName}
          name={firstName}
          pictureUrl={profilePhoto}
        />

        <ItemState isActive={isActive} />
      </section>

      <p>
        <strong>UID:</strong>
        <span className={styles.name}>{` ${uuid}`}</span>
        <br />
        <br />
        <strong>Nombre:</strong>
        <span className={styles.name}>{` ${firstName} ${lastName}`}</span>
        <br />
        <br />
        <strong>Cédula:</strong>
        <span>{` ${identityDocument}`}</span>
        <br />
        <br />
        <strong>Teléfono:</strong>
        <span>{` ${formatPhone(phone)}`}</span>
        <br />
        <br />
        <strong>Fecha de nacimiento:</strong>
        <span>{` ${formatDate({ date: dateOfBirth })}`}</span>
        <br />
        <br />
        <strong>Fecha de registro:</strong>
        <span>{` ${formatDate({
          date: createdAt,
          type: 'ISO',
          withHour: true,
        })}`}</span>
        <br />
        <br />
        <strong>Cuenta verificada por:</strong>
        <span>{` Miguel Orrego (ID EV-44) el 5 de marzo de 2021 a las 03:15 PM`}</span>
        <br />
      </p>

      <section className={styles.actions}>
        <Button isSecondary={isActive} onClick={handleActionUser}>
          {isActive ? 'Deshabilitar cuenta' : 'Habilitar cuenta'}
        </Button>
      </section>
    </div>
  );
}
