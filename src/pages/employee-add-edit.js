import { LitElement, html, css } from "lit";
import { store, addEmployee, editEmployee } from "../store/employee-store.js";

import "../layout/header-element.js";
import "../components/input-element.js";
import "../components/date-picker-element.js";
import "../components/dropdown-element.js";
import "../components/phone-input-element.js";

export class EmployeeAddEdit extends LitElement {
  static properties = {
    firstName: { type: String },
    lastName: { type: String },
    dateOfEmployment: { type: String },
    email: { type: String },
    dateOfBirth: { type: String },
    phone: { type: String },
    department: { type: String },
    position: { type: String },
    errors: { type: Object },
    isEdit: { type: Boolean },
    employeeId: { type: String },
  };

  constructor() {
    super();
    this.firstName = "";
    this.lastName = "";
    this.dateOfEmployment = "";
    this.email = "";
    this.dateOfBirth = "";
    this.phone = "";
    this.department = "";
    this.position = "";
    this.errors = {};
    this.isEdit = false;
    this.employeeId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.checkForEditMode();
  }

  checkForEditMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      this.isEdit = true;
      this.employeeId = id;
      this.loadEmployeeData(id);
    }
  }

  loadEmployeeData(id) {
    const state = store.getState();
    const employee = state.employees.list.find((emp) => emp.id == id);

    if (employee) {
      this.firstName = employee.firstName || "";
      this.lastName = employee.lastName || "";
      this.email = employee.email || "";
      this.phone = employee.phone || "";
      this.dateOfEmployment = employee.dateOfEmployment || "";
      this.dateOfBirth = employee.dateOfBirth || "";
      this.department = employee.department || "";
      this.position = employee.position || "";
      this.requestUpdate();
    }
  }

  handleInputChange(event) {
    if (event.detail) {
      const { name, value } = event.detail;
      this[name] = value;

      if (this.errors[name]) {
        this.errors = { ...this.errors, [name]: "" };
        this.requestUpdate();
      }
    }
  }

  validateForm() {
    const errors = {};

    if (!this.firstName.trim()) errors.firstName = "First name is required";
    if (!this.lastName.trim()) errors.lastName = "Last name is required";
    if (!this.email.trim()) errors.email = "Email is required";
    if (!this.phone.trim()) errors.phone = "Phone number is required";
    if (!this.dateOfEmployment)
      errors.dateOfEmployment = "Employment date is required";
    if (!this.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    if (!this.department) errors.department = "Department is required";
    if (!this.position.trim()) errors.position = "Position is required";

    if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (
      this.phone &&
      (this.phone.length !== 12 || !this.phone.startsWith("90"))
    ) {
      errors.phone = "Please enter a valid Turkish phone number";
    }

    if (this.firstName && /\d/.test(this.firstName)) {
      errors.firstName = "First name cannot contain numbers";
    }
    if (this.lastName && /\d/.test(this.lastName)) {
      errors.lastName = "Last name cannot contain numbers";
    }

    return errors;
  }

  handleSave() {
    const errors = this.validateForm();

    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      this.requestUpdate();
      return;
    }

    const formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      dateOfEmployment: this.dateOfEmployment,
      dateOfBirth: this.dateOfBirth,
      department: this.department,
      position: this.position,
    };

    if (this.isEdit) {
      formData.id = this.employeeId;
      store.dispatch(editEmployee(formData));
    } else {
      formData.id = "emp_" + Date.now();
      store.dispatch(addEmployee(formData));
    }

    window.location.href = "/dev/index.html";
  }

  handleCancel() {
    window.location.href = "/dev/index.html";
  }

  render() {
    const departments = [
      { label: "Analytics", value: "Analytics" },
      { label: "Tech", value: "Tech" },
    ];

    const positions = [
      { label: "Junior", value: "Junior" },
      { label: "Medior", value: "Medior" },
      { label: "Senior", value: "Senior" },
    ];

    return html`
      <header-element></header-element>
      <div class="container">
        <div class="title-container">
          <span class="title"
            >${this.isEdit ? "Edit Employee" : "Add Employee"}</span
          >
        </div>
        <div class="form-container">
          <div class="form-grid">
            <input-element
              class="input-element"
              name="firstName"
              label="First Name"
              .value=${this.firstName}
              .error=${this.errors.firstName || ""}
              @input-change=${this.handleInputChange}
            ></input-element>
            <input-element
              class="input-element"
              name="lastName"
              label="Last Name"
              .value=${this.lastName}
              .error=${this.errors.lastName || ""}
              @input-change=${this.handleInputChange}
            ></input-element>
            <date-picker-element
              class="input-element"
              name="dateOfEmployment"
              label="Date of Employment"
              .value=${this.dateOfEmployment}
              .error=${this.errors.dateOfEmployment || ""}
              @input-change=${this.handleInputChange}
            ></date-picker-element>
            <date-picker-element
              class="input-element"
              name="dateOfBirth"
              label="Date of Birth"
              .value=${this.dateOfBirth}
              .error=${this.errors.dateOfBirth || ""}
              @input-change=${this.handleInputChange}
            ></date-picker-element>
            <input-element
              class="input-element"
              name="email"
              label="Email"
              .value=${this.email}
              .error=${this.errors.email || ""}
              @input-change=${this.handleInputChange}
            ></input-element>
            <phone-input-element
              class="input-element"
              name="phone"
              label="Phone"
              .value=${this.phone}
              .error=${this.errors.phone || ""}
              @input-change=${this.handleInputChange}
            ></phone-input-element>
            <dropdown-element
              class="input-element"
              name="department"
              label="Department"
              .value=${this.department}
              .options=${departments}
              .error=${this.errors.department || ""}
              @input-change=${this.handleInputChange}
            ></dropdown-element>
            <dropdown-element
              class="input-element"
              name="position"
              label="Position"
              .value=${this.position}
              .options=${positions}
              .error=${this.errors.position || ""}
              @input-change=${this.handleInputChange}
            ></dropdown-element>
          </div>
          <div class="button-container">
            <button-element
              class="button"
              label="Save"
              bgColor="#ff6202"
              textColor="white"
              block
              @click=${this.handleSave}
            ></button-element>
            <button-element
              class="button"
              label="Cancel"
              variant="outlined"
              bgColor="#8B20FF"
              block
              @click=${this.handleCancel}
            ></button-element>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      padding: 20px 40px 20px 40px;
      background-color: #f7f7f7;
      min-height: 100vh;
    }

    .form-container {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background-color: white;
      padding: 60px;
      border-radius: 10px;
      min-height: 80vh;
    }

    .title-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 30px;
    }

    .title-container div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }

    .title {
      font-size: 24px;
      font-weight: 400;
      color: #ff6202;
    }

    .button-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      row-gap: 100px;
      column-gap: 100px;
      padding-top: 40px;
      width: 100%;
    }

    .button-container :first-child {
      width: 100%;
      justify-self: flex-end;
    }

    .button-container :last-child {
      width: 100%;
      justify-self: flex-start;
    }
    .button {
      max-width: 300px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      width: 100%;
      justify-items: center;
      align-items: center;
    }

    .input-element {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    @media (max-width: 1024px) {
      .form-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr !important;
      }

      .button-container {
        grid-template-columns: 1fr !important;
        row-gap: 20px;
      }

      .button-container :first-child {
        width: 100%;
        justify-self: center;
      }

      .button-container :last-child {
        width: 100%;
        justify-self: center;
      }

      .button {
        max-width: 300px;
      }
    }
  `;
}

customElements.define("employee-add-edit", EmployeeAddEdit);
