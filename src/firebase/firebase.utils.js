import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCSYm1dzJLPOf8-PdP9lg5Xyah7wbBl8Jg',
  authDomain: 'crwn-db-f2c38.firebaseapp.com',
  databaseURL: 'https://crwn-db-f2c38.firebaseio.com',
  projectId: 'crwn-db-f2c38',
  storageBucket: 'crwn-db-f2c38.appspot.com',
  messagingSenderId: '17363041669',
  appId: '1:17363041669:web:cb390a516f9effe419d8ec',
  measurementId: 'G-C2PFBXJ39W',
};

export const createUserProfileDocument = async (userAuth, additonalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additonalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
