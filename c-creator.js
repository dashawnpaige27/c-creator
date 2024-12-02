import { LitElement, html, css } from "lit";

export class CCreator extends LitElement {
  static properties = {
    title: { type: String },
    theme: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      padding: 16px;
      margin: 8px 0;
      border: 2px solid var(--border-color, #ccc);
      border-radius: 8px;
      font-family: Arial, sans-serif;
      background-color: var(--background-color, #fff);
      color: var(--text-color, #000);
      transition: box-shadow 0.3s ease, transform 0.3s ease;
    }

    :host(:hover) {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }

    :host([theme="dark"]) {
      --background-color: #333;
      --text-color: #fff;
      --border-color: #555;
    }
  `;

  constructor() {
    super();
    this.title = "Default Title";
    this.theme = "light";
  }

  render() {
    return html`
      <div>
        <h3>${this.title}</h3>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("c-creator", CCreator);
