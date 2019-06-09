'use strict';

$(document).ready(() => {
  const searchFilter = (opportunity) =>
    $(opportunity)
      .find('.opportunityTitle')
      .text()
      .toLowerCase()
      .includes(
        $('#opportunitySearch')
          .val()
          .toLowerCase()
      );

  const schoolingFilter = (opportunity) =>
    $.makeArray($('.schooling-filter')).some(function(filter) {
      if (
        $(filter).data('schooling') == $(opportunity).data('schooling') &&
        $(filter).is(':checked')
      ) {
        return true;
      } else {
        return false;
      }
    });

  const salaryFilter = (opportunity) =>
    $.makeArray($('.salary-filter')).some(function(filter) {
      const filterSalary = parseFloat($(filter).data('value'));
      const opportunitySalary = parseFloat(
        $(opportunity)
          .data('salary')
          .replace(/\./g, '')
          .replace(',', '.')
      );

      switch ($(filter).data('sign')) {
        case '<':
          if (opportunitySalary < filterSalary && $(filter).is(':checked')) return true;
          break;

        case '<=':
          if (opportunitySalary <= filterSalary && $(filter).is(':checked')) return true;
          break;

        case '>':
          if (opportunitySalary > filterSalary && $(filter).is(':checked')) return true;
          break;

        case '>=':
          if (opportunitySalary >= filterSalary && $(filter).is(':checked')) return true;
          break;

        default:
          return false;
      }
    });

  $('.input-filter').on('input', function() {
    $('.opportunityContainer').each(function() {
      const search = searchFilter($(this));
      const schooling = schoolingFilter($(this));
      const salary = salaryFilter($(this));

      const filters = [search, schooling, salary];
      const visible = filters.every((filter) => filter === true);

      $(this).toggle(visible);
    });
  });

  firebase
    .firestore()
    .collection('opportunities')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function(opportunity) {
        const {
          address,
          company,
          description,
          office,
          requirements,
          salary,
          schooling
        } = opportunity.data();

        const opportunityContainer = $('<article />', {
          class: 'opportunityContainer uk-comment uk-padding-large',
          'data-salary': salary,
          'data-schooling': schooling
        }).appendTo('#opportunityList');

        const opportunityHeader = $('<header />', {
          class: 'opportunityHeader uk-comment-header uk-grid-medium uk-flex-middle',
          'uk-grid': ''
        }).appendTo(opportunityContainer);

        const opportunityBody = $('<section />', {
          class: 'opportunityBody uk-comment-body'
        }).appendTo(opportunityContainer);

        const opportunityImageContainer = $('<div />', {
          class: 'opportunityImageContainer uk-width-auto'
        }).appendTo(opportunityHeader);

        const opportunityImage = $('<img />', {
          class: 'opportunityImage uk-comment-avatar',
          src: '/assets/img/logo.svg',
          width: 80,
          height: 80
        }).appendTo(opportunityImageContainer);

        const opportunityInformationContainer = $('<div />', {
          class: 'opportunityInformationContainer uk-width-expand'
        }).appendTo(opportunityHeader);

        const opportunityTitleContainer = $('<h4 />', {
          class: 'opportunityTitleContainer uk-comment-title uk-margin-remove'
        }).appendTo(opportunityInformationContainer);

        const opportunityTitle = $('<a />', {
          class: 'opportunityTitle uk-link-reset',
          text: office
        }).appendTo(opportunityTitleContainer);

        const opportunityInformationList = $('<ul />', {
          class:
            'opportunityInformationList uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top'
        }).appendTo(opportunityInformationContainer);

        const opportunityCompanyContainer = $('<li/>', {
          class: 'opportunityCompanyContainer'
        }).appendTo(opportunityInformationList);

        const opportunityCompany = $('<a/>', {
          class: 'opportunityCompany',
          text: company
        }).appendTo(opportunityCompanyContainer);

        const opportunitySchoolingContainer = $('<li/>', {
          class: 'opportunitySchoolingContainer'
        }).appendTo(opportunityInformationList);

        const opportunitySchooling = $('<a/>', {
          class: 'opportunitySchooling',
          text: schooling
        }).appendTo(opportunitySchoolingContainer);

        const opportunitySalaryContainer = $('<li/>', {
          class: 'opportunitySalaryContainer'
        }).appendTo(opportunityInformationList);

        const opportunitySalary = $('<a/>', {
          class: 'opportunitySalary',
          text: `R$${salary}`
        }).appendTo(opportunitySalaryContainer);

        const opportunityDescription = $('<p />', {
          class: 'opportunityDescription',
          html: `<b>Endereço:</b> ${address || 'Não informado'}
          <br/><b>Descrição do cargo:</b> ${description || 'Nenhuma'}
          <br/><b>Pré-requisitos:</b> ${requirements || 'Nenhum'}`
        }).appendTo(opportunityBody);
      });
    });
});
