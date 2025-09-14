import { LitElement, html, css } from "lit";
import { t } from "../utils/translate.js";

export class DropdownElement extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    value: { type: String },
    options: { type: Array },
    placeholder: { type: String },
    error: { type: String },
  };

  constructor() {
    super();
    this.label = "";
    this.name = "";
    this.value = "";
    this.options = [];
    this.placeholder = t("pleaseSelect");
    this.error = "";
  }

  handleChange(event) {
    const value = event.target.value;
    this.value = value;

    this.dispatchEvent(
      new CustomEvent("input-change", {
        detail: {
          name: this.name,
          value: value,
        },
        bubbles: true,
      })
    );
  }

  render() {
    return html`
      <div class="dropdown-container">
        <label>${this.label}</label>
        <select .value=${this.value} @change=${this.handleChange}>
          <option value="" disabled ?selected=${!this.value}>
            ${this.placeholder}
          </option>
          ${this.options?.map(
            (option) => html`
              <option
                value=${option.value || option}
                ?selected=${this.value === (option.value || option)}
              >
                ${option.label || option}
              </option>
            `
          )}
        </select>
        ${this.error ? html`<span class="error">${this.error}</span>` : ""}
      </div>
    `;
  }

  static styles = css`
    .dropdown-container {
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

    select {
      border: 1px solid gray;
      border-radius: 5px;
      padding: 7px;
      font-size: 14px;
      font-weight: 400;
      outline: none;
      background-color: white;
      cursor: pointer;
    }

    select:focus {
      outline: 1px solid #ff6202;
      border-color: #ff6202;
    }

    select:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }

    option {
      padding: 5px;
    }

    .error {
      color: #e74c3c;
      font-size: 12px;
      font-weight: 400;
      margin-top: 3px;
    }
  `;
}

customElements.define("dropdown-element", DropdownElement);
