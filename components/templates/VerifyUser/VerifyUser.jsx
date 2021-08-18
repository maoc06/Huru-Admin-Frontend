import axios from 'axios';
import { useState } from 'react';
import Router from 'next/router';

import { ActivityIndicator, Button, WarningIcon } from '../../elements';
import { StatusIndicator, UserHero, Modal } from '../../modules';
import { formatDate, formatPhone } from '../../../utils';
import CheckAnimationData from '../../../public/animations/check.json';
import ErrorAnimationData from '../../../public/animations/error-cone.json';
import styles from './VerifyUser.module.css';

const ENABLE_STATUS_ID = 1;
const DISABLE_STATUS_ID = 2;

export default function VerifyUser({ user }) {
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

      await axios.patch(`/api/dbUser`, {
        accessToken,
        uuid: user.uid,
        status: ENABLE_STATUS_ID,
      });

      await axios.post(`/api/userVerified`, {
        accessToken,
        uid: user.uid,
      });

      await axios.delete(`/api/reqVerifyUser/${user.uid}`);

      setEventStatus({
        ...eventStatus,
        title: '¡Acción exitosa!',
        message: `La cuenta del usuario ${user.name} ${user.lastName} se ha verificado satisfactoriamente.`,
        animation: CheckAnimationData,
        showFeedback: true,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      setEventStatus({
        ...eventStatus,
        animation: null,
        title: '¡Ocurrio un error!',
        message: `La cuenta del usuario ${user.name} ${user.lastName} no verifico con exito.`,
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

      await axios.put(`/api/dbUser`, {
        accessToken,
        uuid: user.uid,
        status: DISABLE_STATUS_ID,
      });

      await axios.delete(`/api/reqVerifyUser/${user.uid}`);

      setEventStatus({
        ...eventStatus,
        title: '¡Acción exitosa!',
        message: `La cuenta del usuario ${user.name} ${user.lastName} se ha reportado.`,
        animation: CheckAnimationData,
        showFeedback: true,
        loading: false,
      });
    } catch (error) {
      setEventStatus({
        ...eventStatus,
        animation: null,
        title: '¡Ocurrio un error!',
        message: `La cuenta del usuario ${user.name} ${user.lastName} no se ha reportado con exito. Vuelva a intentarlo.`,
        showFeedback: true,
        loading: false,
      });
    }
  };

  const closeFeedback = () => {
    setEventStatus({ ...eventStatus, showFeedback: false });
    if (eventStatus.title !== '¡Ocurrio un error!') Router.reload();
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
        title="¿Reportar cuenta?"
        content="Al reportar la cuenta, quedara inservible para acciones como: reservas, pagos, entre otros."
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
          Me acabo de registrar en la plataforma Huru y solicito revisar mi
          información para que mi cuenta sea verificada y acceder a las demas
          funcionalidades.
          <br />
          <br />
          <strong>Nombre:</strong>
          <span
            className={styles.name}
          >{` ${user.name} ${user.lastName}`}</span>
          <br />
          <br />
          <strong>Cédula:</strong>
          <span>{` ${user.cc}`}</span>
          <br />
          <br />
          <strong>Teléfono:</strong>
          <span>{` ${formatPhone(user.phone)}`}</span>
          <br />
          <br />
          <strong>Fecha de nacimiento:</strong>
          <span>{` ${formatDate({
            date: user.birthDay,
            type: 'ISO',
          })}`}</span>
          <br />
        </p>

        <section className={styles.actions}>
          <Button onClick={handleVerify}>Verificar cuenta</Button>

          <Button isSecondary={true} onClick={() => setOpenModal(true)}>
            Reportar cuenta
          </Button>
        </section>
      </div>
    </>
  );
}
