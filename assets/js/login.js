$(document).ready(() => {

  const onLoginSuccessful = (user) => {

    if (location.href !== `${location.origin}/`) {
      location.href = `${location.origin}/`;
    } else {
      $('#login-link').addClass('uk-hidden');
      $('#register-link').addClass('uk-hidden');
      
      $('header .uk-navbar-dropbar').css('height', '0px');

      $('#welcome-text-wrapper').removeClass('uk-hidden');
      $('#logout-link').removeClass('uk-hidden');
      
      setTimeout(() => {
        $('#welcome-text-wrapper').addClass('uk-hidden');
      }, 5000);
    }

  };

  const onLoginError = () => {
    $('#login-error-msg').removeClass('uk-hidden');
    setTimeout(() => {
      $('#login-error-msg').addClass('uk-hidden');
    }, 5000);
  };

  $('#login-button').on('click', () => {

    const cpf = $('#user-id').val();
    const password = $('#password').val();

    db.collection("users")
      .where('id', '==', cpf)
      .where('password', '==', password)
      .get()
      .then((result) => {
        const doesUserExist = result.docs && result.docs.length > 0;
        if (doesUserExist && result.docs[0].exists) {
          const { email, password } = result.docs[0].data();
          firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
              sessionStorage.setItem('auth-token', data.user.ra);
              onLoginSuccessful();
             })
            .catch(function(error) {
              onLoginError();
            });
          
        } else {
          onLoginError();
        }

      });

  });

})