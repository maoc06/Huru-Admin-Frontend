import Lottie from 'react-lottie';

import { Button } from '../../elements';
import defaultAnimationData from '../../../public/animations/error-cone.json';
import styles from './StatusIndicator.module.css';

export default function StatusIndicator({
  animationData = defaultAnimationData,
  isLoop = false,
  visible = false,
  title = '',
  message = '',
  buttonMsg = 'Aceptar',
  onClickButton = () => {},
}) {
  const defaultOptions = {
    loop: isLoop,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!visible) return null;

  return (
    <div className={styles.background}>
      <div className={styles.overlay}>
        <Lottie
          options={defaultOptions}
          height={125}
          width={125}
          style={{
            alignSelf: 'center',
          }}
        />
        <h6 className={styles.title}>{title}</h6>

        <p className={styles.content}>{message}</p>

        <div className={styles.button}>
          <Button invert={true} onClick={onClickButton}>
            {buttonMsg}
          </Button>
        </div>
      </div>
    </div>
  );
}
