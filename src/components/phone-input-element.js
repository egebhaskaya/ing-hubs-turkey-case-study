import { LitElement, html, css } from "lit";
import { formatPhoneNumber } from "../utils/formatPhoneNumber.js";

export class PhoneInputElement extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    placeholder: { type: String },
    error: { type: String },
  };

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.value = "";
    this.placeholder = "+90 (5xx) xxx xx xx";
    this.error = "";
  }

  handleKeyDown(event) {
    if (/^[a-zA-Z]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  handleInput(event) {
    let value = event.target.value;

    if (value === "+9") {
      this.value = "";
      this.dispatchEvent(
        new CustomEvent("input-change", {
          detail: { name: this.name, value: "" },
          bubbles: true,
        })
      );
      return;
    }

    const formattedValue = formatPhoneNumber(value);
    this.value = formattedValue;

    const deformattedValue = value.replace(/\D/g, "");

    this.dispatchEvent(
      new CustomEvent("input-change", {
        detail: {
          name: this.name,
          value: deformattedValue,
        },
        bubbles: true,
      })
    );
  }

  render() {
    const displayValue = formatPhoneNumber(this.value);

    return html`
      <div class="phone-container">
        <label>${this.label}</label>
        <input
          type="tel"
          .value=${displayValue}
          placeholder=${this.placeholder}
          @keydown=${this.handleKeyDown}
          @input=${this.handleInput}
          maxlength="19"
        />
        ${this.error ? html`<span class="error">${this.error}</span>` : ""}
      </div>
    `;
  }

  static styles = css`
    .phone-container {
      display: flex;
      flex-direction: column;
      gap: 5px;
      max-width: 300px;
      width: 100%;
    }

    label {
      font-size: 14px;
      font-weight: 300;
      color: gray;
    }

    input {
      border: 1px solid gray;
      border-radius: 5px;
      padding: 4px;
      font-size: 14px;
      font-weight: 400;
      outline: none;
      height: 24px;
    }

    input:focus {
      outline: 1px solid #ff6202;
      border-color: #ff6202;
    }

    input::placeholder {
      color: #ccc;
      font-style: italic;
    }

    .error {
      color: #e74c3c;
      font-size: 12px;
      font-weight: 400;
      margin-top: 3px;
    }
  `;
}

customElements.define("phone-input-element", PhoneInputElement);
