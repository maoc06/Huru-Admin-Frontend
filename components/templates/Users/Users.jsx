import axios from 'axios';
import { useState } from 'react';

import { useStatusItem } from '../../../lib/updateStatusItem';
import { SearchBar, CardUser } from '../../modules';
import styles from './Users.module.css';

export default function Users({ onClickUser = () => {} }) {
  // const [users, setUsers] = useState([]);
  const statusItem = useStatusItem();

  const handleQuery = async (event) => {
    const query = event.target.value;
    if (query.length > 0) {
      const res = await axios.get(`/api/dbUser/query/${query}`);
      if (res.data) statusItem.setUsersResults(res.data);
      // if (res.data) setUsers(res.data);
    } else {
      statusItem.setUsersResults([]);
    }
  };

  return (
    <main className={styles.container}>
      <SearchBar placeholder="Buscar usuario..." onChange={handleQuery} />

      {statusItem.users.map((user) => (
        <CardUser
          key={user.uuid}
          data={{ ...user }}
          onClickCard={onClickUser}
        />
      ))}
    </main>
  );
}
