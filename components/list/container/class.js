import ExtendedHTMLElement from '../../extended-html-element';

class ListContainer extends ExtendedHTMLElement {
  #childObserver;
  stylesPath = '/components/list/container/styles.css';
  templatePath = '/components/list/container/template.html';

  connectedCallback() {
    super.connectedCallback();
    this.#setupObserver();
  }

  disconnectedCallback() {
    this.#tearDownObserver();
  }

  #childListMutationCallback = (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        this.updateListItems();
      }
    }
  };

  #setupObserver() {
    this.#childObserver = new MutationObserver(this.#childListMutationCallback);

    this.#childObserver.observe(this, { childList: true });
  }

  #tearDownObserver() {
    this.#childObserver.disconnect();
  }

  updateListItems = () => {
    const items = this.querySelectorAll('list-item');
    items.forEach((item, index) => {
      item.setAttribute('index', index);
    });
    console.log(items);
  };
}

customElements.define('list-container', ListContainer);