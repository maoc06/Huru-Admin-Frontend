import axios from 'axios';
import { useEffect, useState } from 'react';

import { useStatusItem } from '../../../lib/updateStatusItem';
import { Button } from '../../elements';
import { UserHero, ItemState } from '../../modules';
import {
  capitalize,
  formatDate,
  formatPhone,
  formatSeconds,
  formatStatus,
} from '../../../utils';
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
  const [verifyUser, setVerifyUser] = useState(null);

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

  const handleDataUserVerified = async () => {
    const res = await axios.get(`/api/userVerified/${uuid}`);
    if (res.data) setVerifyUser(res.data);
  };

  useEffect(() => {
    handleDataUserVerified();
  }, []);

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
        {verifyUser ? (
          <span>{` ${capitalize(
            `${verifyUser.verifiedBy.firstName} ${verifyUser.verifiedBy.lastName}`
          )} (${verifyUser.verifiedBy.uid}) el ${formatDate({
            date: formatSeconds(verifyUser.verifiedAt._seconds),
            type: 'ISO',
            withHour: true,
          })}`}</span>
        ) : (
          <span>La cuenta aún no ha sido verificada.</span>
        )}
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
