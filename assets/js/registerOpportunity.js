'use strict';

$(document).ready(() => {
  const onOpportunityCreatedSuccessfully = () => {
    $('form')[0].reset();
    location.reload();
  };

  const onOpportunityCreatedError = (error) => {};

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
      .then(onOpportunityCreatedSuccessfully)
      .catch(onOpportunityCreatedError);
  });
});
