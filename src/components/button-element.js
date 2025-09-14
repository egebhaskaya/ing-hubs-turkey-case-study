import { LitElement, html, css } from "lit";

import { icons } from "./icon-element.js";

export class ButtonElement extends LitElement {
  static properties = {
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    bgColor: {
      type: String,
    },
    iconSize: {
      type: String,
    },
    textColor: {
      type: String,
    },
    variant: {
      type: String,
    },
    block: {
      type: Boolean,
    },
    size: {
      default: "small",
      type: String,
    },
  };

  constructor() {
    super();
    this.label = "";
    this.icon = "";
    this.bgColor = "white";
    this.iconSize = "20px";
    this.textColor = "#ff6202";
    this.variant = "regular";
    this.block = false;
    this.size = "medium";
  }

  render() {
    const iconHandler = icons[this.icon];

    return html`<button
      class="button ${this.variant} ${this.block && "block"} ${this.size}"
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
    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-family: "Roboto", sans-serif;
      font-weight: 300;
      cursor: pointer;
    }

    .regular {
      border: none;
      background-color: var(--bg-color, white);
      color: var(--text-color, black);
    }

    .regular:hover {
      opacity: 0.8;
    }

    .outlined {
      background-color: transparent;
      border: 1px solid var(--bg-color, #ff6202);
      color: var(--bg-color, #ff6202);
      padding: 4px 9px 4px 9px;
    }

    .outlined:hover {
      background-color: var(--bg-color, #ff6202);
      color: white;
      opacity: 1;
    }

    .outlined .icon {
      color: var(--bg-color, #ff6202);
    }

    .outlined:hover .icon {
      color: white;
    }

    .small {
      border-radius: 5px;
      font-size: 14px;
      padding: 5px 10px 5px 10px;
    }

    .medium {
      border-radius: 8px;
      font-size: 16px;
      padding: 8px 16px 8px 16px;
    }

    .large {
      border-radius: 10px;
      font-size: 18px;
      padding: 12px 24px 12px 24px;
    }

    .block {
      display: block;
      width: 100%;
    }

    .icon {
      height: var(--icon-size, 20px);
      width: var(--icon-size, 20px);
      color: var(--text-color, #ff6202);
    }
  `;
}

customElements.define("button-element", ButtonElement);
