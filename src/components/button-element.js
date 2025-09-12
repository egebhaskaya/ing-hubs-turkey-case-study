import { LitElement, html, css } from "lit";

import { icons } from "./icon-element.js";

export class ButtonElement extends LitElement {
  static properties = {
    label: {},
    icon: {},
    fontWeight: {},
    bgColor: {},
    iconSize: {},
    textColor: {},
    variant: {},
  };

  constructor() {
    super();
    this.label = "";
    this.icon = "";
    this.fontWeight = 300;
    this.bgColor = "white";
    this.iconSize = "20px";
    this.textColor = "#ff6202";
    this.variant = "filled";
  }

  render() {
    const iconHandler = icons[this.icon];

    return html`<button
      class="${this.variant}"
      style="--bg-color: ${this.bgColor}; --text-color: ${this.textColor}"
    >
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
      color: var(--text-color, black);
      font-family: "Roboto", sans-serif;
      font-weight: 300;
      padding: 5px 10px 5px 10px;
    }

    button:hover {
      opacity: 0.8;
    }

    button .icon {
      height: var(--icon-size, 20px);
      width: var(--icon-size, 20px);
      color: var(--text-color, #ff6202);
    }

    button.outlined {
      background-color: transparent;
      border: 1px solid var(--bg-color, #ff6202);
      color: var(--bg-color, #ff6202);
      padding: 4px 9px 4px 9px;
    }

    button.outlined:hover {
      background-color: var(--bg-color, #ff6202);
      color: white;
      opacity: 1;
    }

    button.outlined .icon {
      color: var(--bg-color, #ff6202);
    }

    button.outlined:hover .icon {
      color: white;
    }
  `;
}

customElements.define("button-element", ButtonElement);
