export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};

    refs.button = document.querySelector(selector);

    return refs;
  }

  enable() {
    this.refs.button.disable = false;
    this.refs.button.classList.remove('btn-loading');
  }

  disable() {
    this.refs.button.disable = true;
    this.refs.button.classList.add('btn-loading');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
