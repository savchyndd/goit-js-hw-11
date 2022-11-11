export default class PageLoadStatus {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};

    refs.pageLoadStatus = document.querySelector(selector);
    refs.ellips = document.querySelector('.loader-ellips');
    refs.infScrollLast = document.querySelector('.infinite-scroll-last');
    refs.infScrollError = document.querySelector('.infinite-scroll-error');

    return refs;
  }

  show() {
    this.refs.pageLoadStatus.classList.remove('is-hidden');
  }

  hide() {
    this.refs.pageLoadStatus.classList.add('is-hidden');
  }

  enable() {
    this.refs.ellips.classList.add('is-hidden');
    this.refs.infScrollLast.classList.add('is-hidden');
    this.refs.infScrollError.classList.add('is-hidden');
  }

  loadingShow() {
    this.refs.ellips.classList.remove('is-hidden');
    this.refs.infScrollLast.classList.add('is-hidden');
    this.refs.infScrollError.classList.add('is-hidden');
  }

  loadingHide() {
    this.refs.ellips.classList.add('is-hidden');
    // this.refs.infScrollLast.classList.remove('is-hidden');
    // this.refs.infScrollError.classList.remove('is-hidden');
  }

  lastElemShow() {
    this.refs.infScrollLast.classList.remove('is-hidden');

    this.refs.ellips.classList.add('is-hidden');
    this.refs.infScrollError.classList.add('is-hidden');
  }

  lastElemHide() {
    this.refs.infScrollLast.classList.add('is-hidden');

    // this.refs.ellips.classList.remove('is-hidden');
    // this.refs.infScrollError.classList.remove('is-hidden');
  }

  errorShow() {
    this.refs.infScrollError.classList.remove('is-hidden');

    this.refs.ellips.classList.add('is-hidden');
    this.refs.infScrollLast.classList.add('is-hidden');
  }

  errorHide() {
    this.refs.infScrollLast.classList.add('is-hidden');

    // this.refs.ellips.classList.remove('is-hidden');
    // this.refs.infScrollError.classList.remove('is-hidden');
  }
}
