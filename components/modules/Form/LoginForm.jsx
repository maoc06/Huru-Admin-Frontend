import { useAuth } from '../../../lib/auth';

import { ActivityIndicator, SubmitButton, TextField } from '../../elements';
import { Form, StatusIndicator } from '../';
import { credentialsSchema } from '../../../constants/validationSchemas';
import handleToken from '../../../utils/handleToken';

export default function LoginForm() {
  const auth = useAuth();

  const initialValues = { email: '', password: '' };

  const handleSubmit = async ({ email, password }) => {
    await auth.signinWithEmail(email, password, '/dashboard');
    if (!auth.error) handleToken(auth.user);
  };

  const closeError = () => {
    auth.setError(false);
  };

  return (
    <>
      <ActivityIndicator visible={auth.loading} />

      <StatusIndicator
        visible={auth.error}
        title="¡Algo salio mal!"
        message={auth.errorMessage}
        onClickButton={closeError}
      />

      <Form
        initialValues={initialValues}
        validationSchema={credentialsSchema}
        onSubmit={handleSubmit}
      >
        <TextField
          name="email"
          type="email"
          label="Email"
          placeholder="ejemplo@correo.com"
        />

        <TextField
          name="password"
          type="password"
          label="Contraseña"
          placeholder="Digita tu contraseña"
        />

        <SubmitButton invert={true} isSecondaryWhite={true}>
          Iniciar sesión
        </SubmitButton>
      </Form>
    </>
  );
}
