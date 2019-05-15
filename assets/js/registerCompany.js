$(document).ready(() => {
  const onUserCreatedSuccessfully = () => {
    location.href = `${location.origin}/`;
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
        type: 'company',
        id: userData.cnpj
      });
      db.collection("users").doc(userData.email).set(userData)
      .then(() => resolve())
      .catch((error) => reject(error));
    });
  };

  $('#register-user-btn').on('click', (event) => {
    const formData = $('form').serialize().split('&').reduce((prev, curr) => {
      const [key, obj] = curr.split('=');
      prev[key] = decodeURIComponent(obj);
      return prev;
    }, {});

    const { email, password } = formData;
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => createUserOnDatabase(formData))
      .then(() => onUserCreatedSuccessfully())
      .catch((error) => onUserCreatedError(error));
  });

});