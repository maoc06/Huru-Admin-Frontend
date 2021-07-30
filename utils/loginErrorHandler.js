const loginErrorHandler = (code) => {
  if (code === 'auth/wrong-password') {
    return 'La contraseña es incorrecta. Verifica y vuelve a intentarlo.';
  } else if (code === 'auth/user-not-found') {
    return 'El usuario no se encuentra. Verifica y vuelve a intentarlo.';
  }
};

export default loginErrorHandler;
