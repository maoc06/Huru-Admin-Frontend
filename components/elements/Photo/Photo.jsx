import Image from 'next/image';

import styles from './Photo.module.css';

export default function Photo({ photoUrl }) {
  return (
    <div className={styles.image}>
      <Image
        src={photoUrl}
        alt="foto de carro"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
