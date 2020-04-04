function getElementId(input) {
  return document.getElementById(input);
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function getKeyWords(input) {
  return input.placeholder.slice(3);
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if(input.value.trim() === '') {
      showError(input, `${getKeyWords(input)}必填项`);
    } else {
      showSuccess(input);
    }
  })
}

function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${getKeyWords(input)}至少${min}字符`);
  } else if(input.value.length > max) {
    showError(input, `${getKeyWords(input)}至多${max}字符`);
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  const re = /^([A-Za-z0-9_\.])+\@([A-Za-z0-9_\.])+\.([A-Za-z]{2,4})$/;
  if(re.test(input)) {
    showSuccess(input);
  } else {
    showError(input, "邮箱格式错误");
  }
}

function checkPasswordsMatch (input1, input2) {
  if(input1.value !== input2) {
    showError(input2, "密码不匹配");
  }
}

const form = getElementId('form');
const username = getElementId('username');
const email = getElementId('email');
const password = getElementId('password');
const password2 = getElementId('password2');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 12);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
})
