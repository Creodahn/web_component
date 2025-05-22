export default class ExtendedHtmlElement extends HTMLElement {
  shadowRoot;
  styles;
  template;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await this.setupComponent();
    this.setup?.();
  }

  importResource = async (type) => {
    // TODO: this is still not perfect, as it assumes the path is always the same
    const { origin, pathname } = window.location;
    const response = await fetch(`${origin}/${pathname}/${this[`${type}Path`]}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} file: ${response.statusText}`);
    }
    const text = await response.text();
    return text;
  }

  importStyles = async () => {
    const css = await this.importResource('styles');
    const style = document.createElement('style');
    style.textContent = css;
    return style;
  }

  importTemplate = async () => {
    const html = await this.importResource('template');
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;
  }

  setupComponent = async () => {
    this.styles = await this.importStyles();
    this.template = await this.importTemplate();

    this.shadowRoot.append(this.styles.cloneNode(true));
    this.shadowRoot.append(this.template.content.cloneNode(true));
  }
}