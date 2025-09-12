import { LitElement, html, css } from "lit";
import { store, deleteEmployee } from "../store/employee-store.js";

import "./checkbox-element.js";
import "./button-element.js";
import "./pagination-element.js";
import "./popup-element.js";

export class TableElement extends LitElement {
  static properties = {
    list: { type: Array },
    showPopup: { type: Boolean },
    employeeId: { type: String },
  };

  constructor() {
    super();
    this.list = [];
    this.showPopup = false;
    this.employeeId = null;
  }

  handleEdit(id) {
    window.location.href = `/dev/employee.html?id=${id}`;
  }

  handleShowPopup(id) {
    this.employeeId = id;
    this.showPopup = true;
  }

  handleClosePopup() {
    this.showPopup = false;
  }

  handleDelete() {
    console.log("test", this.employeeId);
    this.showPopup = false;
    store.dispatch(deleteEmployee(this.employeeId));
  }

  render() {
    return html` <div>
      <table>
        <thead>
          <tr>
            <th>
              <checkbox-element></checkbox-element>
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Date of Employment</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.list?.map(
            (employee) => html`
              <tr>
                <td>
                  <checkbox-element></checkbox-element>
                </td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.email}</td>
                <td>${employee.dateOfEmployment}</td>
                <td>${employee.dateOfBirth}</td>
                <td>${employee.phone}</td>
                <td>${employee.department}</td>
                <td>${employee.position}</td>
                <td>
                  <div class="edit-delete-row">
                    <button-element
                      icon="edit"
                      @click=${() => this.handleEdit(employee.id)}
                    ></button-element>
                    <button-element
                      icon="delete"
                      @click=${() => this.handleShowPopup(employee.id)}
                    ></button-element>
                  </div>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
      <pagination-element></pagination-element>
      <popup-element
        .show=${this.showPopup}
        @close=${this.handleClosePopup}
        @confirm=${this.handleDelete}
        @cancel=${this.handleClosePopup}
      ></popup-element>
    </div>`;
  }

  static styles = css`
    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      border-radius: 10px;
    }

    thead {
      height: 80px;
      border-bottom: 1px solid #f7f7f7;
      color: #ff6202;
      font-family: "Roboto", sans-serif;
      font-size: 14px;
      font-weight: 300;
    }

    tbody {
      text-align: center;
      font-size: 16px;
      color: black;
    }

    tbody tr {
      height: 80px;
      border-bottom: 1px solid #f7f7f7;
      font-weight: 200;
    }

    .edit-delete-row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }
  `;
}

customElements.define("table-element", TableElement);
