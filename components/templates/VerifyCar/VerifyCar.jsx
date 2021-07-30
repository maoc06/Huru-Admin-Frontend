import axios from 'axios';
import { Button, Photo } from '../../elements';
import { UserHero } from '../../modules';
import styles from './VerifyCar.module.css';

const ENABLE_STATUS_ID = 1;
const DISABLE_STATUS_ID = 2;

export default function VerifyCar({ user, car }) {
  const handleVerify = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      axios.put(`/api/dbVehicle`, {
        accessToken,
        carId,
        status: ENABLE_STATUS_ID,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReport = () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      axios.put(`/api/dbVehicle`, {
        accessToken,
        carId,
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
        Quiero registrar un vehículo en la plataforma Huru y solicito revisar
        las información para que esté sea visible por la comunidad.
        <br />
        <br />
        <strong>VIN:</strong>
        <span>{` ${car.vin}`}</span>
        <br />
        <br />
        <strong>Carro:</strong>
        <span
          className={styles.name}
        >{` ${car.maker} ${car.model} ${car.year}`}</span>
        <br />
        <br />
        <strong>Kilometraje:</strong>
        <span>{` ${car.odometer}`}</span>
        <br />
        <br />
        <strong>Matrícula:</strong>
        <span>{` ${car.plate} - registrado en ${car.plateCity}`}</span>
        <br />
      </p>

      <section className={styles.photos}>
        {car.images.map((photo) => (
          <Photo key={photo} photoUrl={photo} />
        ))}
      </section>

      <section className={styles.actions}>
        <Button onClick={handleVerify}>Activar vehículo</Button>

        <Button isSecondary={true} onClick={handleReport}>
          Reportar vehículo
        </Button>
      </section>
    </div>
  );
}
