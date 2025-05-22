import ExtendedHTMLElement from '../../extended-html-element';

class ListAddButton extends ExtendedHTMLElement {
  #button;
  stylesPath = '/components/list/add-button/styles.css';
  templatePath = '/components/list/add-button/template.html';

  disconnectedCallback() {
    this.#tearDownButton();
  }

  #clickListener = () => {
    const newItem = document.createElement('list-item');
    newItem.textContent = `Item ${this.parentNode.querySelectorAll('list-item').length + 1}`;
    this.parentNode.appendChild(newItem);
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

customElements.define('list-add-button', ListAddButton);