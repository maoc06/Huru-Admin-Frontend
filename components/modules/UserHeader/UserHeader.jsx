import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';

import { Title, Subtitle } from '../../elements';
import styles from './UserHeader.module.css';

export default function UserHeader({}) {
  const [user, setUser] = useState({ name: '', lastName: '', role: '' });

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const { data } = jwt_decode(accessToken);
    console.log(data);
    setUser(data);
  }, []);

  return (
    <div className={styles.container}>
      <Title text={`${user.name} ${user.lastName}`} />
      <Subtitle
        text={user.role === 'A' ? 'Administrador' : 'Equipo de verificación'}
      />
    </div>
  );
}
