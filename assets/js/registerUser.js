'use strict';

$(document).ready(() => {
  const onUserCreatedSuccessfully = () => {
    $('form').trigger('reset');

    const message = $('<span />', {
      class: 'uk-display-block uk-text-center',
      text: 'Usuário cadastrado'
    });

    UIkit.notification.closeAll();

    UIkit.notification(message.get(0).outerHTML, {
      pos: 'top-center'
    });

    setTimeout(() => {
      location.href = `${location.origin}/`;
    }, 2000);
  };

  const onUserCreatedError = (error) => {
    if (error && error.message) {
      $('#user-register-error').text(error.message);
      $('#register-error-wrapper').removeClass('uk-hidden');
      setTimeout(() => {
        $('#register-error-wrapper').addClass('uk-hidden');
      }, 5000);
    }
  };

  const createUserOnDatabase = (userData) => {
    return new Promise((resolve, reject) => {
      const userToSave = Object.assign(userData, {
        type: 'user',
        id: userData.cpf
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
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => createUserOnDatabase(formData))
      .then(() => onUserCreatedSuccessfully())
      .catch((error) => onUserCreatedError(error));
  });
});
