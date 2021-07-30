import Image from 'next/image';
import { useNav } from '../../../lib/nav';
import { Title } from '../../elements';
import styles from './CardCar.module.css';

export default function CardCar({ data = {}, onClickCard = () => {} }) {
  const nav = useNav();
  const {
    carId,
    year,
    userOwner: { uuid, firstName, lastName },
    model: { name: carModel },
    maker: { name: carMaker },
    images,
  } = data;

  const handleUser = () => {
    nav.setType('car');
    onClickCard({ car: data });
  };

  return (
    <article className={styles.card} onClick={handleUser}>
      <section className={styles.image}>
        <Image
          src={images[0].imagePath}
          alt={`imagen del ${carMaker} ${carModel} ${year}`}
          layout="fill"
          objectFit="cover"
        />
      </section>

      <section className={styles.info}>
        <div className={styles.title}>
          <Title text={`${carMaker} ${carModel} ${year}`} />
          <span className={styles.carId}>{` - ID: ${carId}`}</span>
        </div>

        <p
          className={styles.user}
        >{`${firstName} ${lastName} - ID: ${uuid}`}</p>
      </section>
    </article>
  );
}
