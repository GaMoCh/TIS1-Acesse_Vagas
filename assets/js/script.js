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
