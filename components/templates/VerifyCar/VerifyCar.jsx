import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

import { ActivityIndicator, Button, Photo, WarningIcon } from '../../elements';
import { Modal, StatusIndicator, UserHero } from '../../modules';
import CheckAnimationData from '../../../public/animations/check.json';
import ErrorAnimationData from '../../../public/animations/error-cone.json';
import styles from './VerifyCar.module.css';

const ENABLE_STATUS_ID = 1;
const DISABLE_STATUS_ID = 2;

export default function VerifyCar({ user, car }) {
  const [openModal, setOpenModal] = useState(false);
  const [eventStatus, setEventStatus] = useState({
    loading: false,
    showFeedback: false,
    title: '',
    message: '',
    animation: ErrorAnimationData,
  });

  const handleVerify = async () => {
    setEventStatus({ ...eventStatus, loading: true });
    try {
      const accessToken = localStorage.getItem('accessToken');

      await axios.put(`/api/dbVehicle`, {
        accessToken,
        carId: car.id,
        status: ENABLE_STATUS_ID,
      });

      await axios.delete(`/api/reqVerifyCar/${car.id}`);

      setEventStatus({
        ...eventStatus,
        title: '¡Acción exitosa!',
        message: `El vehículo  ${car.maker} ${car.model} ${car.year} se ha verificado satisfactoriamente.`,
        animation: CheckAnimationData,
        showFeedback: true,
        loading: false,
      });
    } catch (error) {
      setEventStatus({
        ...eventStatus,
        animation: null,
        title: '¡Ocurrio un error!',
        message: `El vehículo  ${car.maker} ${car.model} ${car.year} no verifico con exito.`,
        showFeedback: true,
        loading: false,
      });
    }
  };

  const handleReport = async () => {
    setOpenModal(false);
    setEventStatus({ ...eventStatus, loading: true });
    try {
      const accessToken = localStorage.getItem('accessToken');

      await axios.put(`/api/dbVehicle`, {
        accessToken,
        carId: car.id,
        status: DISABLE_STATUS_ID,
      });

      await axios.delete(`/api/reqVerifyCar/${car.id}`);

      setEventStatus({
        ...eventStatus,
        title: '¡Acción exitosa!',
        message: `El vehículo  ${car.maker} ${car.model} ${car.year} se ha reportado.`,
        animation: CheckAnimationData,
        showFeedback: true,
        loading: false,
      });
    } catch (error) {
      setEventStatus({
        ...eventStatus,
        animation: null,
        title: '¡Ocurrio un error!',
        message: `El vehículo  ${car.maker} ${car.model} ${car.year} no se ha reportado con exito. Vuelva a intentarlo.`,
        showFeedback: true,
        loading: false,
      });
    }
  };

  const closeFeedback = () => {
    setEventStatus({ ...eventStatus, showFeedback: false });
    Router.reload();
  };

  return (
    <>
      <ActivityIndicator visible={eventStatus.loading} />

      <StatusIndicator
        animationData={eventStatus.animation}
        visible={eventStatus.showFeedback}
        title={eventStatus.title}
        message={eventStatus.message}
        onClickButton={closeFeedback}
      />

      <Modal
        title="¿Reportar vehículo?"
        content="Al reportar el vehículo, quedara inservible para acciones como: reservas, pagos, entre otros, y por lo tanto no saldra listado entre las busquedas de usuarios."
        icon={<WarningIcon />}
        visible={openModal}
        confirmText="Reportar"
        onConfirm={handleReport}
        onReject={() => setOpenModal(false)}
        onCloseModal={() => setOpenModal(false)}
      />

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

          <Button isSecondary={true} onClick={() => setOpenModal(true)}>
            Reportar vehículo
          </Button>
        </section>
      </div>
    </>
  );
}
