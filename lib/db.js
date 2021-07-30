// import firestore from './firebase-admin';
import firebase from './firebase';

export async function getUser(uid) {
  try {
    const doc = await firebase.firestore().collection('users').doc(uid).get();
  } catch (error) {
    console.error(error);
  }
}
