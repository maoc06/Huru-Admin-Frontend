import styles from './Button.module.css';

export default function Button({
  type,
  children,
  onClick,
  isSecondary = false,
  isSecondaryWhite = false,
  invert = false,
  isRejectAction = false,
  ...otherProps
}) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        {...otherProps}
        className={`${styles.baseButton} ${
          isSecondary ? styles.sencondaryButton : styles.primaryButton
        } ${isSecondaryWhite && styles.sencondaryWhiteButton} ${
          invert && !isSecondary && styles.invertButton
        } ${isRejectAction && styles.rejectButton}`}
      >
        {children}
      </button>
    </>
  );
}
