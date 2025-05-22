import ExtendedHTMLElement from '../../../extended-html-element';

class ListRemoveButton extends ExtendedHTMLElement {
  #button;
  stylesPath = '/components/list/button/remove/styles.css';
  templatePath = '/components/list/button/remove/template.html';

  disconnectedCallback() {
    this.#tearDownButton();
  }

  #clickListener = () => {
    Array.from(this.parentNode.querySelectorAll('list-item')).at(-1).remove();
  };

  #setupButton() {
    this.#button = this.shadowRoot.querySelector('button');
    this.#button.addEventListener('click', this.#clickListener);
  }

  #tearDownButton() {
    this.#button.removeEventListener('click', this.#clickListener);
  }

  setup() {
    this.#setupButton();
  }
}

customElements.define('list-remove-button', ListRemoveButton);