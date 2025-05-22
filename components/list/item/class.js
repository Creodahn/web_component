import ExtendedHTMLElement from '../../extended-html-element';

class ListItem extends ExtendedHTMLElement {
  #checkbox;
  stylesPath = '/components/list/item/styles.css';
  templatePath = '/components/list/item/template.html';

  static get observedAttributes() {
    return ['checked'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'checked') {
      this.#updateChecked(newValue);
    }

    if (name === 'textContent') {
      this.querySelector('slot').textContent = newValue;
    }
  }

  #updateChecked(value) {
    this.#checkbox.checked = value === 'true';
  }

  setup() {
    this.#checkbox = this.shadowRoot.querySelector('input');
  }
}

customElements.define('list-item', ListItem);