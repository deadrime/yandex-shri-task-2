const burger = document.querySelector('.burger')
const nav = document.querySelector('.page_header__nav')

burger.addEventListener('click', () => {
  burger.classList.toggle('burger--active')
  nav.classList.toggle('page_header__nav--active')
})