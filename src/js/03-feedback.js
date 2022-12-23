import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');

getUserData();

formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

const formData = {};

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  formData[inputRef.name] = inputRef.value;
  formData[textareaRef.name] = textareaRef.value;
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function getUserData() {
  const userData = localStorage.getItem('feedback-form-state');
  if (userData) {
    const parsedUserData = JSON.parse(userData);
    inputRef.value = parsedUserData.email;
    textareaRef.value = parsedUserData.message;
  }
}
