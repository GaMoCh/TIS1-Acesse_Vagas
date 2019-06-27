'use strict';

$(document).ready(() => {
  const onLoginSuccessful = (user) => {
    sessionStorage.setItem('logged', true);
    sessionStorage.setItem('user', JSON.stringify(user));

    userState();
  };

  const onLoginError = () => {
    const message = $('<span />', {
      class: 'uk-display-block uk-text-center',
      text: 'CPF/CNPJ ou senha inválidos'
    });

    UIkit.notification.closeAll();

    UIkit.notification(message.get(0).outerHTML, {
      pos: 'top-center'
    });
  };

  $('#login-button').on('click', () => {
    const id = $('#user-id').val();
    const password = $('#password').val();

    database
      .collection('users')
      .where('id', '==', id)
      .where('password', '==', password)
      .get()
      .then((result) => {
        const doesUserExists = result.docs && result.docs.length;
        if (doesUserExists && result.docs[0].exists) {
          const user = result.docs[0].data();
          const { email, password } = user;
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
              sessionStorage.setItem('auth-token', data.user.ra);
              onLoginSuccessful(user);
            })
            .catch((error) => {
              onLoginError();
            });
        } else {
          onLoginError();
        }
      });
  });
});
