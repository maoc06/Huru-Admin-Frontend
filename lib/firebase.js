import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAe0GViDOVOiE__JyxxyWss95DIV67-h-Q',
  authDomain: 'huru-admin-app.firebaseapp.com',
  projectId: 'huru-admin-app',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
