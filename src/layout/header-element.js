import { LitElement, html, css } from "lit";

import "../components/button-element.js";

export class HeaderElement extends LitElement {
  render() {
    return html` <header>
      <div>
        <img src="../public/images/ing-logo.png" alt="ING" />
        <span>ING</span>
      </div>

      <div>
        <button-element
          fontWeight="400"
          label="Employees"
          icon="person"
        ></button-element>
        <button-element
          fontWeight="400"
          label="Add New"
          icon="plus"
        ></button-element>

        <span>TR</span>
      </div>
    </header>`;
  }

  static styles = css`
    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      font-family: "Roboto", sans-serif;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    }

    header div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    header img {
      width: 30px;
      height: 30px;
      border-radius: 5px;
    }

    .container div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
  `;
}

customElements.define("header-element", HeaderElement);
