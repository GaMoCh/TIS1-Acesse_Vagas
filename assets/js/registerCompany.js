'use strict';

$(document).ready(() => {
  const onUserCreatedSuccessfully = () => {
    location.href = `${location.origin}/`;
  };

  const onUserCreatedError = (error) => {};

  const createUserOnDatabase = (userData) => {
    return new Promise((resolve, reject) => {
      const userToSave = Object.assign(userData, {
        type: 'company',
        id: userData.cnpj
      });
      database
        .collection('users')
        .doc(userData.email)
        .set(userData)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  $('#register-user-btn').on('click', (event) => {
    const formData = $('form')
      .serialize()
      .split('&')
      .reduce((prev, curr) => {
        const [key, obj] = curr.split('=');
        prev[key] = decodeURIComponent(obj);
        return prev;
      }, {});

    const { email, password } = formData;

    console.log(formData);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => createUserOnDatabase(formData))
      .then(() => onUserCreatedSuccessfully())
      .catch((error) => onUserCreatedError(error));
  });
});
