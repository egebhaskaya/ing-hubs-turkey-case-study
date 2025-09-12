import { LitElement, html, css } from "lit";

export class CheckboxElement extends LitElement {
  render() {
    return html`<input type="checkbox" />`;
  }

  static styles = css`
    input {
      appearance: none;
      border: 2px solid lightgray;
      border-radius: 5px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    input:checked {
      background-color: #ff6202;
      border-color: #ff6202;
    }

    /* Check icon using CSS */
    input:checked::after {
      content: "✓";
      color: white;
      font-size: 14px;
      font-weight: bold;
    }
  `;
}

customElements.define("checkbox-element", CheckboxElement);
