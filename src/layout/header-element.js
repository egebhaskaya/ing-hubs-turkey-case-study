import { LitElement, html, css } from "lit";

import "../components/button-element.js";

export class HeaderElement extends LitElement {
  handleAddNewRoute() {
    window.location.href = "/dev/employee.html";
  }

  handleEmployeesRoute() {
    window.location.href = "/dev/index.html";
  }

  render() {
    return html` <header>
      <div>
        <img src="../public/images/ing-logo.png" alt="ING" />
        <span>ING</span>
      </div>

      <div>
        <button-element
          class="header-button-mobile"
          fontWeight="400"
          icon="person"
          @click="${this.handleEmployeesRoute}"
        ></button-element>

        <button-element
          class="header-button-mobile"
          fontWeight="400"
          icon="plus"
          @click="${this.handleAddNewRoute}"
        ></button-element>

        <button-element
          class="header-button-desktop"
          fontWeight="400"
          label="Employees"
          icon="person"
          @click="${this.handleEmployeesRoute}"
        ></button-element>

        <button-element
          class="header-button-desktop"
          fontWeight="400"
          label="Add New"
          icon="plus"
          @click="${this.handleAddNewRoute}"
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

    .header-button-mobile {
      display: none;
    }

    .header-button-desktop {
      display: block;
    }

    @media (max-width: 768px) {
      .header-button-mobile {
        display: block;
      }
      .header-button-desktop {
        display: none;
      }
    }
  `;
}

customElements.define("header-element", HeaderElement);
