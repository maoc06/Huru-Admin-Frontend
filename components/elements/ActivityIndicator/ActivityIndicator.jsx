import Lottie from 'react-lottie';
import animationData from '../../../public/animations/loader.json';

import styles from './ActivityIndicator.module.css';

export default function ActivityIndicator({ visible = false }) {
  const defaultOptions = {
    loop: true,
    autoPlay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  if (!visible) return null;

  return (
    <div className={styles.wrap}>
      <div>
        <Lottie options={defaultOptions} height={150} width={150} />
      </div>
    </div>
  );
}
