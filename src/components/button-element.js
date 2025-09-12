import { LitElement, html, css } from "lit";

import { icons } from "./icon-element.js";

export class ButtonElement extends LitElement {
  static properties = {
    label: {},
    icon: {},
    fontWeight: {},
    bgColor: {},
    iconSize: {},
  };

  constructor() {
    super();
    this.label = "";
    this.icon = "";
    this.fontWeight = 300;
    this.bgColor = "white";
    this.iconSize = "20px";
  }

  render() {
    const iconHandler = icons[this.icon];

    return html`<button style="--bg-color: ${this.bgColor}">
      ${this.icon &&
      html`
        <div class="icon" style="--icon-size: ${this.iconSize}">
          ${iconHandler}
        </div>
      `}
      ${this.label}
    </button>`;
  }

  static styles = css`
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      background-color: var(--bg-color, white);
      color: #ff6202;
      font-family: "Roboto", sans-serif;
      font-weight: 300;
      padding: 5px;
    }

    button:hover {
      background-color: #ff63020e;
    }

    button .icon {
      height: var(--icon-size, 20px);
      width: var(--icon-size, 20px);
      color: #ff6202;
    }
  `;
}

customElements.define("button-element", ButtonElement);