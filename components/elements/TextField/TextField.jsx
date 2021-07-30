import { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import styles from './TextField.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const defaultErrorMessage = 'Ocurrio un error. Verifica y vuelve a intentarlo.';

export default function Textfield({
  name,
  placeholder,
  label,
  apiError,
  errorMsg = defaultErrorMessage,
  iconComponent,
  type,
  withIcon = false,
  ...otherProps
}) {
  const { values, errors, touched, setFieldTouched, handleChange, setErrors } =
    useFormikContext();

  const [visibility, setVisibility] = useState(false);
  const [typePassword, setTypePassword] = useState(type);

  useEffect(() => {
    if (apiError) {
      const errorObj = {};
      errorObj[name] = errorMsg;
      setErrors(errorObj);
    }
  }, [apiError]);

  const handleVisibility = () => {
    typePassword === 'password'
      ? setTypePassword('text')
      : setTypePassword('password');

    setVisibility(!visibility);
  };

  const renderVisibility = () => {
    if (!visibility) {
      return (
        <VisibilityOff onClick={handleVisibility} className={styles.eye} />
      );
    }
    return <Visibility onClick={handleVisibility} className={styles.eye} />;
  };

  return (
    <div>
      <label className={styles.label}>{label}</label>

      <div className={`${styles.textfield} ${withIcon && styles.paddingIcon}`}>
        {withIcon && <div>{iconComponent}</div>}

        <input
          onBlur={() => setFieldTouched(name)}
          onChange={handleChange}
          value={values[name]}
          name={name}
          type={type === 'password' ? typePassword : type}
          className={`${styles.field} ${
            touched[name] && errors[name] && styles.inputError
          }`}
          placeholder={placeholder}
          {...otherProps}
        />

        {type === 'password' && (
          <div className={styles.visibility}>{renderVisibility()}</div>
        )}
      </div>

      <ErrorMessage
        visible={touched[name] && errors[name]}
        message={errors[name]}
      />
    </div>
  );
}
