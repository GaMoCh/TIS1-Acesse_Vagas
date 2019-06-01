'use strict';

const firebaseConfig = {
  apiKey: 'AIzaSyAp7AuPgdp77ejAPegigM4Q-T2pcA_OOY0',
  authDomain: 'acesse-vagas.firebaseapp.com',
  databaseURL: 'https://acesse-vagas.firebaseio.com',
  projectId: 'acesse-vagas',
  storageBucket: 'acesse-vagas.appspot.com',
  messagingSenderId: '979216913162',
  appId: '1:979216913162:web:9f372744732dcbfb'
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
