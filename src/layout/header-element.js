import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import { t, getCurrentLanguage, setLanguage } from "../utils/translate.js";

import "../components/button-element.js";

export class HeaderElement extends LitElement {
  handleAddNewRoute() {
    Router.go("/add");
  }

  handleEmployeesRoute() {
    Router.go("/");
  }

  handleLanguageToggle() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === "en" ? "tr" : "en";
    setLanguage(newLang);
  }

  render() {
    return html` <header>
      <div class="logo" @click="${this.handleEmployeesRoute}">
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
          label="${t("employees")}"
          icon="person"
          @click="${this.handleEmployeesRoute}"
        ></button-element>

        <button-element
          class="header-button-desktop"
          fontWeight="400"
          label="${t("addNew")}"
          icon="plus"
          @click="${this.handleAddNewRoute}"
        ></button-element>

        <button-element
          @click="${this.handleLanguageToggle}"
          .label="${getCurrentLanguage() === "en" ? "🇹🇷" : "🇬🇧"}"
        >
        </button-element>
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

    .logo {
      cursor: pointer;
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

    .lang-button {
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 4px;
      background-color: #f0f0f0;
      font-weight: 500;
    }

    .lang-button:hover {
      background-color: #ff6202;
      color: white;
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
