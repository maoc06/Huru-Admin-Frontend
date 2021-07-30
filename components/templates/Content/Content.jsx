import { useNav } from '../../../lib/nav';
import { Car, User, VerifyUser, VerifyCar } from '../';

import styles from './Content.module.css';

export default function Content({ messageInfo }) {
  const nav = useNav();

  const renderContentTemplate = () => {
    const type = nav.active.type;
    const { user } = messageInfo;

    if (type === 'verify-account') {
      return <VerifyUser user={user} />;
    } else if (type === 'verify-car') {
      return <VerifyCar user={user} car={messageInfo.car} />;
    } else if (type === 'user') {
      return <User user={user} />;
    } else if (type === 'car') {
      return <Car car={messageInfo.car} />;
    }
  };

  return (
    <div className={styles.container}>
      {messageInfo !== null ? renderContentTemplate() : null}
    </div>
  );
}
