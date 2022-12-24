import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');

const formData = {
  email: '',
  message: '',
};

getUserData();

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
  formData[inputRef.name] = '';
  formData[textareaRef.name] = '';
}

function getUserData() {
  try {
    const userData = localStorage.getItem('feedback-form-state');

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      inputRef.value = parsedUserData.email || '';
      formData[inputRef.name] = inputRef.value;
      textareaRef.value = parsedUserData.message || '';
      formData[textareaRef.name] = textareaRef.value;
    }
  } catch (err) {
    console.log(err.message);
  }
}
