import axios from 'axios';

import { Button } from '../../elements';
import { UserHero } from '../../modules';
import styles from './VerifyUser.module.css';

const ENABLE_STATUS_ID = 1;
const DISABLE_STATUS_ID = 2;

export default function VerifyUser({ user }) {
  const handleVerify = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      axios.put(`/api/dbUser`, {
        accessToken,
        uuid,
        status: ENABLE_STATUS_ID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReport = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      axios.put(`/api/dbUser`, {
        accessToken,
        uuid,
        status: DISABLE_STATUS_ID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <UserHero
        email={user.email}
        lastName={user.lastName}
        name={user.name}
        pictureUrl={user.pictureUrl}
      />

      <p>
        <b>Hola,</b>
        <br />
        <br />
        Me acabo de registrar en la plataforma Huru y solicito revisar mi
        información para que mi cuenta sea verificada y acceder a las demas
        funcionalidades.
        <br />
        <br />
        <strong>Nombre:</strong>
        <span className={styles.name}>{` ${user.name} ${user.lastName}`}</span>
        <br />
        <br />
        <strong>Cédula:</strong>
        <span>{` ${user.cc}`}</span>
        <br />
        <br />
        <strong>Teléfono:</strong>
        <span>{` ${user.phone}`}</span>
        <br />
        <br />
        <strong>Fecha de nacimiento:</strong>
        <span>{` ${user.birthDay}`}</span>
        <br />
      </p>

      <section className={styles.actions}>
        <Button onClick={handleVerify}>Verificar cuenta</Button>

        <Button isSecondary={true} onClick={handleReport}>
          Reportar cuenta
        </Button>
      </section>
    </div>
  );
}
