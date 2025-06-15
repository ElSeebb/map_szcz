const errorBtn = document.querySelector('.error-btn');
const formBox = document.querySelector('.form-box')

errorBtn.addEventListener('click', () => {
    formBox.classList.toggle('active');
})

