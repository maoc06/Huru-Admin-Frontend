import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useStatusItem } from '../../../lib/updateStatusItem';
import { formatDate, formatStatus, odometerRange } from '../../../utils';
import { Button, Title } from '../../elements';
import { ItemState } from '../../modules';
import styles from './Car.module.css';

const ENABLE_STATUS_ID = 1;
const DISABLE_STATUS_ID = 2;

export default function Car({ car }) {
  const statusItem = useStatusItem();
  const [isActive, setIsActive] = useState(false);

  const {
    carId,
    vin,
    year,
    licensePlate,
    maker: { name: carMaker },
    model: { name: carModel },
    userOwner: { uuid, firstName, lastName },
    images,
    createdAt,
    status,
    odometerRangeId,
  } = car;

  const handleActionVehicle = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      axios.put(`/api/dbVehicle`, {
        accessToken,
        carId,
        status: isActive ? DISABLE_STATUS_ID : ENABLE_STATUS_ID,
      });

      setIsActive(isActive ? false : true);
      statusItem.updateStatusCar({
        carId,
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
    <main className={styles.container}>
      <section className={styles.image}>
        <Image
          src={images[0].imagePath}
          alt={'car picture'}
          layout="fill"
          objectFit="cover"
        />
      </section>

      <section className={styles.inner}>
        <section className={styles.head}>
          <Title text={`${carMaker} ${carModel} ${year}`} />
          <ItemState isActive={isActive} />
        </section>

        <p>
          <strong>ID:</strong>
          <span className={styles.name}>{` ${carId}`}</span>
          <br />
          <br />
          <strong>VIN:</strong>
          <span className={styles.name}>{` ${vin}`}</span>
          <br />
          <br />
          <strong>Kilometraje:</strong>
          <span>{` ${odometerRange[odometerRangeId]}`}</span>
          <br />
          <br />
          <strong>Matrícula:</strong>
          <span>{` ${licensePlate} - registrada en Bogotá D.C.`}</span>
          <br />
          <br />
          <strong>Registrado por:</strong>
          <span>{` ${firstName} ${lastName} (${uuid})`}</span>
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
          <strong>Vehículo activado por:</strong>
          <span>{`Miguel Orrego (ID EV-44) el 5 de marzo de 2021 a las 03:15 PM`}</span>
          <br />
        </p>

        <section className={styles.actions}>
          <Button isSecondary={isActive} onClick={handleActionVehicle}>
            {isActive ? 'Deshabilitar vehículo' : 'Habilitar vehículo'}
          </Button>
        </section>
      </section>
    </main>
  );
}
