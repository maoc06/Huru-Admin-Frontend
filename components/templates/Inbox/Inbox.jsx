import axios from 'axios';
import { useEffect, useState } from 'react';

import { CardInbox } from '../../modules';
import { formatReqDate } from '../../../utils/formatReqDate';
import styles from './Inbox.module.css';

export default function Inbox({ onClickMessage = () => {} }) {
  const [request, setRequest] = useState([]);

  const handleRequestsUser = async () => {
    const res = await axios.get('/api/reqVerify');
    if (res.data) setRequest(res.data);
  };

  useEffect(() => {
    handleRequestsUser();
  }, []);

  return (
    <div className={styles.container}>
      {request.map((message) => {
        const { id, data, reqDate, type } = message;
        return (
          <CardInbox
            key={id}
            data={data}
            date={formatReqDate(reqDate._seconds)}
            type={type}
            onClickCard={onClickMessage}
          />
        );
      })}
    </div>
  );
}
