const triggerShape = document.querySelector('.trigger-shape');
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
// const btnPopup = document.querySelector('.btnlogin-popup');
const iconClose = document.querySelector('.icon-close');
/* const mobileLoginLink = document.querySelector('.mobile-login-link');
const mobileRegisterLink = document.querySelector('.mobile-register-link'); */

triggerShape.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

/* btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
}); */

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});

/* mobileLoginLink.addEventListener('click', () => {
    wrapper.classList.add('active-popup'); // show the login/register box
    document.getElementById("myNav").style.width = "0%"; // close overlay
  });

  mobileRegisterLink.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    document.getElementById("myNav").style.width = "0%";
});*/