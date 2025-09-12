import { LitElement, html, css } from "lit";
import { store, addEmployee, setViewMode } from "../store/employee-store.js";
import "../layout/header-element.js";
import "../components/table-element.js";
import "../components/button-element.js";
import "../components/grid-element.js";

/* store.dispatch(
  addEmployee({
    firstName: "Store Test",
    lastName: "Working",
    email: "test@working.com",
    dateOfEmployment: "2024-01-01",
    dateOfBirth: "1990-01-01",
    phone: "+1111111111",
    department: "Test",
    position: "Test",
  })
); */

export class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String },
  };

  constructor() {
    super();
    this.employees = [];
    this.viewMode = "table";

    // Subscribe to store changes
    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      this.employees = state.employees.list;
      this.viewMode = state.employees.viewMode;
    });

    // Initialize with current state
    const state = store.getState();
    this.employees = state.employees.list;
    this.viewMode = state.employees.viewMode;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleViewModeChange(viewMode) {
    store.dispatch(setViewMode(viewMode));
  }

  render() {
    return html` <header-element></header-element>
      <div class="container">
        <div class="title-container">
          <span class="title">Employee List</span>
          <div>
            <button-element
              icon="list"
              bgColor="#f7f7f7"
              iconSize="30px"
              @click=${() => this.handleViewModeChange("table")}
            ></button-element>
            <button-element
              icon="grid"
              bgColor="#f7f7f7"
              iconSize="30px"
              @click=${() => this.handleViewModeChange("grid")}
            ></button-element>
          </div>
        </div>

        ${this.viewMode === "table" && this.employees?.length > 0
          ? html` <table-element .list=${this.employees}></table-element> `
          : html` <grid-element .list=${this.employees}></grid-element> `}
        ${!this.employees || this.employees?.length === 0
          ? html`
              <div class="no-employees">
                No employees found please add a new employee
              </div>
            `
          : ""}
      </div>`;
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      padding: 20px 40px 20px 40px;
      background-color: #f7f7f7;
      min-height: 100vh;
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
  `;
}

customElements.define("employee-list", EmployeeList);
