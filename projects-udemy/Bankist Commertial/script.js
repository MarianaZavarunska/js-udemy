'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//scrolling 

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect(); // depend on viewport
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect()); // depend on viewport

  console.log(window.pageXOffset,
    window.pageYOffset); // scroll 

  window.scrollTo({
    top: s1coords.top + window.pageYOffset,
    left: s1coords.left + window.pageXOffset,
    behavior: 'smooth',
  });

  // new methood
  // section1.scrollIntoView({ behavior: 'smooth' });
});
