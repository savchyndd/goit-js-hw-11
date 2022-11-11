const formRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const sticky = formRef.offsetTop;

export default function formSticky() {
  if (window.scrollY > sticky) {
    formRef.classList.add('on-scroll');
    galleryRef.style.paddingTop = `72px`;
  } else {
    formRef.classList.remove('on-scroll');
    galleryRef.style.paddingTop = `24px`;
  }
}
