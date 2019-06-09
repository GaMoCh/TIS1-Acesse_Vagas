'use strict';

let userData;

function userState() {
  const getLoggedType = (type) => {
    switch (type) {
      case 'user':
        return 'usuario';
      case 'company':
        return 'empresa';
      default:
        return '';
    }
  };

  if (sessionStorage.getItem('logged')) {
    userData = JSON.parse(sessionStorage.getItem('user'));

    const { name, type } = userData;

    const username = name
      .split(' ')
      .shift()
      .toUpperCase();

    const greeting = $('<a />', {
      class: 'uk-navbar-item uk-visible@m',
      text: `OLÁ, ${username}`,
      href: `/pages/painel/${getLoggedType(type)}`
    });

    $('#signIn-link').html(greeting);

    const signOut = $('<a />', {
      class: 'uk-navbar-item uk-visible@m',
      text: 'SAIR',
      href: 'javascript:void(0)',
      click: () => {
        sessionStorage.clear();
        location.reload();
      }
    });

    if (sessionStorage.getItem('user') !== null) {
      if (JSON.parse(sessionStorage.getItem('user')).type == 'company') {
        const opportunityRegisterText = $('<span />', {
          class: 'uk-text-large',
          text: 'Cadastrar vaga'
        });

        const opportunityRegisterAnchor = $('<a />', {
          class:
            'uk-display-block uk-padding uk-padding-remove-bottom uk-link-heading uk-heading-line uk-text-center',
          href: '/pages/cadastro/vaga'
        }).append(opportunityRegisterText);

        $('#search-section').before(opportunityRegisterAnchor);
      }
    }

    $('[name="address"]').val(userData.address);

    $('#signUp-link').html(signOut);
    responsiveMenu();
  }
}

function responsiveMenu() {
  $('#offCanvasMenu').html('');
  $('body > header ul').each(function(index) {
    $(this)
      .find('li > .uk-navbar-item')
      .each(function() {
        const li = $('<li />');
        const a = $('<a />', {
          href: 'javascript: void(0)',
          text: $(this).text(),
          click: () => {
            this.click();
            UIkit.offcanvas('#offCanvas').hide();
          }
        }).appendTo(li);
        $('#offCanvasMenu').append(li);

        if ($(this).hasClass('uk-parent')) {
          $(this)
            .siblings('.uk-navbar-dropdown')
            .on('show', () => {
              $('.uk-navbar-dropbar').removeAttr('style');
            });
        }
      });
    if ($(this).length - index) {
      const hr = $('<hr />', {
        class: 'uk-divider-icon'
      });
      $('#offCanvasMenu').append(hr);
    }
  });
}

$(document).ready(() => {
  userState();
  responsiveMenu();

  $(window).on('resize', function() {
    if ($(this).width() >= 960) {
      UIkit.offcanvas($('#offCanvas')).hide();
    }
  });
});
