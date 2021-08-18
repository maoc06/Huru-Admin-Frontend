import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

import { Title, Subtitle } from '../../elements';
import styles from './UserHeader.module.css';

export default function UserHeader({ name = '', lastName = '', role = 'E' }) {
  // const [user, setUser] = useState({ name: '', lastName: '', role: '' });

  // useEffect(() => {
  //   const accessToken = localStorage.getItem('accessToken');
  //   const { data } = jwt_decode(accessToken);
  //   setUser(data);
  // }, []);

  return (
    <div className={styles.container}>
      <Title text={`${name} ${lastName}`} />
      <Subtitle
        text={role === 'A' ? 'Administrador' : 'Equipo de verificación'}
      />
    </div>
  );
}
