$(document).ready(function() {
  // $('.data-input').mask('00/00/0000');
  $('.salary-input').mask('#.##0,00', { reverse: true });
  $('.cpf-input').mask('000.000.000-00');
  $('.cnpj-input').mask('00.000.000/0000-00');
  $('.user-input').on('input', function(event) {
    if ($(this).val().length >= 15) {
      $(this).mask('00.000.000/0000-00');
    } else {
      $(this).mask('000.000.000-000');
    }
  });
  $('.phone-input').on('input', function(event) {
    if ($(this).val().length >= 14) {
      $(this).mask('(00) 00000-0000');
    } else {
      $(this).mask('(00) 0000-00000');
    }
  });
  $('.email-input').mask('A', {
    translation: {
      A: { pattern: /[\w@\-.+]/, recursive: true }
    }
  });
  $('.rg-input').on('input', function(event) {
    $(this).val(() => this.value.toUpperCase());

    $(this).mask('WW-00.000.000', {
      translation: {
        W: {
          pattern: /[A-Z]/
        }
      }
    });
  });
});
