'use strict';

$(document).ready(() => {
  const onOpportunityCreatedSuccessfully = () => {
    $('form').trigger('reset');

    const message = $('<span />', {
      class: 'uk-display-block uk-text-center',
      text: 'Vaga cadastrada'
    });

    UIkit.notification.closeAll();

    UIkit.notification(message.get(0).outerHTML, {
      pos: 'top-center'
    });

    setTimeout(() => {
      location.href = `${location.origin}/`;
    }, 2000);
  };

  const onOpportunityCreatedError = (error) => { };

  const createOpportunityOnDatabase = (opportunityData) => {
    return new Promise((resolve, reject) => {
      const { name, address } = userData;

      const opportunityToSave = Object.assign(opportunityData, {
        company: name
      });

      database
        .collection('opportunities')
        .add(opportunityToSave)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  };

  $('#register-opportunity-btn').on('click', (event) => {
    const formData = $('form')
      .serialize()
      .split('&')
      .reduce((prev, curr) => {
        const [key, obj] = curr.split('=');
        prev[key] = decodeURIComponent(obj);
        return prev;
      }, {});

    createOpportunityOnDatabase(formData)
      .then(() => onOpportunityCreatedSuccessfully())
      .catch((error) => onOpportunityCreatedError(error));
  });
});
