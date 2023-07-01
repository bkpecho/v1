(function () {
  'use strict';

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');
      thisForm.querySelector('button[type="submit"]').disabled = true;

      let formData = new FormData(thisForm);

      sendEmail(formData, thisForm);
    });
  });

  function sendEmail(formData, thisForm) {
    const templateParams = {
      to_name: 'Mr. Bryan King Pecho',
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    emailjs
      .send(
        'service_bx5gx3r',
        'template_gszf06s',
        templateParams,
        'BsJJeIpJmXpvz4UQc'
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
          thisForm.querySelector('.loading').classList.remove('d-block');
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        },
        function (error) {
          console.log('FAILED...', error);
          displayError(thisForm, error);
        }
      )
      .finally(function () {
        thisForm.querySelector('button[type="submit"]').disabled = false;
      });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }
})();
