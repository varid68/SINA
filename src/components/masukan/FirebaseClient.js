// import * as firebase from 'firebase';

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: 'AIzaSyCq_UE61FHK6LZysjv4G1XJ9qO3oRfoC4g',
//   authDomain: 'amik-fdde1.firebaseapp.com',
//   databaseURL: 'https://amik-fdde1.firebaseio.com',
//   projectId: 'amik-fdde1',
//   storageBucket: 'amik-fdde1.appspot.com',
//   messagingSenderId: '198277777552',
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// export default firebaseApp;

import RNFirebase from 'react-native-firebase';

const firebase = RNFirebase.app();

export default firebase;
