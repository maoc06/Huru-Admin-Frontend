import { createContext, useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import axios from 'axios';

import firebase from './firebase';
import loginErrorHandler from '../utils/loginErrorHandler';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(false);
      setLoading(false);
      return false;
    }
  };

  const signinWithEmail = (email, password, redirect) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        await handleUser(response.user);
        if (redirect) Router.push(redirect);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMessage(loginErrorHandler(err.code));
        setError(true);
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        handleUser(false);
        Router.push('/');
        localStorage.removeItem('accessToken');
      });
  };

  const getUser = () => {
    return user;
  };

  const isLogged = () => {
    const token = localStorage.getItem('accessToken');
    if (user || token !== null) return true;
    return false;
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    error,
    errorMessage,
    setError,
    getUser,
    isLogged,
    signinWithEmail,
    signout,
  };
}

const formatUser = async (user) => {
  const { uid, email, providerData } = user;
  const { name, last_name: lastName, role } = await getUserDb(user.uid);

  return {
    uid,
    name,
    lastName,
    email,
    provider: providerData[0]?.providerId,
    role,
  };
};

const getUserDb = async (uid) => {
  try {
    const res = await axios.get(`/api/user/${uid}`);
    return res.data;
  } catch (e) {
    return false;
  }
};
