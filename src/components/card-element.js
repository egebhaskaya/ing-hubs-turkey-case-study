import { LitElement, html, css } from "lit";
import { deleteEmployee, store } from "../store/employee-store.js";

import "./button-element.js";

export class CardElement extends LitElement {
  static properties = {
    employee: { type: Object },
  };

  handleEdit() {
    window.location.href = `/dev/employee.html?id=${this.employee.id}`;
  }

  render() {
    return html`<div class="card">
      <div class="card-inner">
        <div class="info">
          <div class="info-container">
            <span class="info-title"> First Name: </span>
            <span class="info-content"> ${this.employee.firstName} </span>
          </div>
          <div class="info-container">
            <span class="info-title"> Date of Employment: </span>
            <span class="info-content">
              ${this.employee.dateOfEmployment}
            </span>
          </div>
          <div class="info-container">
            <span class="info-title"> Phone: </span>
            <span class="info-content"> ${this.employee.phone} </span>
          </div>
          <div class="info-container">
            <span class="info-title"> Department: </span>
            <span class="info-content"> ${this.employee.department} </span>
          </div>
        </div>
        <div class="info">
          <div class="info-container">
            <span class="info-title"> Last Name: </span>
            <span class="info-content"> ${this.employee.lastName} </span>
          </div>
          <div class="info-container">
            <span class="info-title"> Date of Birth: </span>
            <span class="info-content"> ${this.employee.dateOfBirth} </span>
          </div>
          <div class="info-container">
            <span class="info-title"> Email: </span>
            <span class="info-content"> ${this.employee.email} </span>
          </div>
          <div class="info-container">
            <span class="info-title"> Position: </span>
            <span class="info-content"> ${this.employee.position} </span>
          </div>
        </div>
      </div>

      <div class="button-container">
        <button-element
          icon="edit"
          label="Edit"
          bgColor="#8B20FF"
          textColor="white"
          iconSize="20px"
          @click=${this.handleEdit}
        ></button-element>
        <button-element
          icon="delete"
          label="Delete"
          bgColor="#ff6202"
          textColor="white"
          @click=${() => store.dispatch(deleteEmployee(this.employee.id))}
        ></button-element>
      </div>
    </div> `;
  }

  static styles = css`
    .card {
      border: 1px solid #e0e0e0;
      padding: 20px;
      background: white;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      min-width: 500px;
    }

    .card-inner {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
    }

    .button-container {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
    }

    .info-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }

    .info-title {
      font-weight: 300;
      font-size: 16px;
      color: gray;
    }

    .info-content {
      font-weight: 400;
      font-size: 18px;
      color: black;
    }
  `;
}

customElements.define("card-element", CardElement);
