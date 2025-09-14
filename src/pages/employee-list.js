import { LitElement, html, css } from "lit";
import {
  store,
  addEmployee,
  setViewMode,
  setPagination,
  deleteEmployee,
  setSearch,
  clearSearch,
} from "../store/employee-store.js";
import "../layout/header-element.js";
import "../components/table-element.js";
import "../components/button-element.js";
import "../components/user-card-element.js";
import "../components/popup-element.js";
import "../components/search-input-element.js";
import "../components/icon-element.js";

const testHandler = () => {
  const array = [
    "bir",
    "iki",
    "uc",
    "dort",
    "bes",
    "alti",
    "yedi",
    "sekiz",
    "dokuz",
    "on",
    "onbir",
    "oniki",
    "onuc",
    "ondort",
    "onbes",
    "onalti",
    "onyedi",
    "onsekiz",
    "ondokuz",
    "yirmi",
    "yirmibir",
    "yirmibiki",
    "yirmiuc",
    "yirmidort",
    "yirmibes",
    "yirmialti",
    "yirmiyedi",
    "yirmisekiz",
    "yirmidokuz",
    "otuz",
    "otuzbir",
    "otuziki",
    "otuzuc",
    "otuzdort",
    "otuzbes",
    "otuzalti",
    "otuzyedi",
    "otuzsekiz",
    "otuzdokuz",
    "kirk",
    "kirkbir",
    "kirkiki",
    "kirkuc",
    "kirkdort",
    "kirkbes",
    "kirkalti",
    "kirkyedi",
    "kirksekiz",
    "kirkdokuz",
    "elli",
    "elli bir",
    "elli iki",
    "elli uc",
    "elli dort",
    "elli bes",
    "elli alti",
    "elli yedi",
    "elli sekiz",
    "elli dokuz",
    "altmis",
    "altmis bir",
    "altmis iki",
    "altmis uc",
    "altmis dort",
    "altmis bes",
    "altmis alti",
    "altmis yedi",
    "altmis sekiz",
    "altmis dokuz",
    "yetmis",
    "yetmis bir",
    "yetmis iki",
    "yetmis uc",
    "yetmis dort",
    "yetmis bes",
    "yetmis alti",
    "yetmis yedi",
    "yetmis sekiz",
    "yetmis dokuz",
    "seksen",
    "seksen bir",
    "seksen iki",
    "seksen uc",
    "seksen dort",
    "seksen bes",
    "seksen alti",
    "seksen yedi",
    "seksen sekiz",
    "seksen dokuz",
    "doksan",
    "doksan bir",
    "doksan iki",
    "doksan uc",
    "doksan dort",
    "doksan bes",
    "doksan alti",
    "doksan yedi",
    "doksan sekiz",
    "doksan dokuz",
    "yuz",
    "yuz bir",
    "yuz iki",
    "yuz uc",
    "yuz dort",
    "yuz bes",
    "yuz alti",
    "yuz yedi",
    "yuz sekiz",
    "yuz dokuz",
    "yuz on",
    "yuz onbir",
    "yuz oniki",
    "yuz onuc",
    "yuz ondort",
    "yuz onbes",
    "yuz onalti",
    "yuz onyedi",
    "yuz onsekiz",
    "yuz ondokuz",
  ];
  array.map((item) => {
    store.dispatch(
      addEmployee({
        id: "emp_" + Date.now() + Math.random(),
        firstName: item,
        lastName: "Working",
        email: "test@working.com",
        dateOfEmployment: "2024-01-01",
        dateOfBirth: "1990-01-01",
        phone: "901231231231",
        department: "Test",
        position: "Test",
      })
    );
  });
};

/* testHandler(); */

export class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String },
    employeeIdToBeDeleted: { type: String },
    showPopup: { type: Boolean },
    pagination: { type: Object },
    searchTerm: { type: String },
    showSearch: { type: Boolean },
  };

  constructor() {
    super();
    this.employees = [];
    this.viewMode = "table";
    this.employeeIdToBeDeleted = null;
    this.showPopup = false;
    this.searchTerm = "";
    this.pagination = {
      page: 1,
      pageSize: 10,
      totalPages: 1,
      totalItems: 0,
      showPagination: true,
      viewList: [],
    };

    this.unsubscribe = store.subscribe(() => {
      const state = store.getState();
      this.viewMode = state.employees.viewMode;
      this.pagination = state.employees.pagination;
      this.employees = state.employees.pagination.viewList;
      this.searchTerm = state.employees.searchTerm;
      this.showSearch = state.employees.list.length > 0;
      this.requestUpdate();
    });

    const state = store.getState();
    this.viewMode = state.employees.viewMode;
    this.pagination = state.employees.pagination;
    this.searchTerm = state.employees.searchTerm;
  }

  connectedCallback() {
    super.connectedCallback();
    const state = store.getState();
    if (state.employees.list && state.employees.list.length > 0) {
      store.dispatch(setPagination());
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  handleViewModeChange(viewMode) {
    store.dispatch(setViewMode(viewMode));
    store.dispatch(setPagination());
  }

  handleEdit(detail) {
    window.location.href = `/dev/employee.html?id=${detail?.detail?.id}`;
  }

  handleShowPopup(detail) {
    this.employeeIdToBeDeleted = detail?.detail?.id;
    this.showPopup = true;
  }

  handleClosePopup() {
    this.showPopup = false;
    this.employeeIdToBeDeleted = null;
  }

  handleDelete() {
    this.showPopup = false;
    store.dispatch(deleteEmployee(this.employeeIdToBeDeleted));
  }

  handleSearchChange(event) {
    const searchTerm = event.detail.searchTerm;

    if (searchTerm && searchTerm.trim() !== "") {
      store.dispatch(setSearch(searchTerm));
    } else {
      store.dispatch(clearSearch());
    }

    store.dispatch(setPagination(1));
  }

  render() {
    const tableColumns = [
      { label: "First Name", key: "firstName" },
      { label: "Last Name", key: "lastName" },
      { label: "Email", key: "email" },
      { label: "Date of Employment", key: "dateOfEmployment" },
      { label: "Date of Birth", key: "dateOfBirth" },
      { label: "Phone", key: "phone" },
      { label: "Email", key: "email" },
      { label: "Department", key: "department" },
      { label: "Position", key: "position" },
      { label: "Actions", key: "actions" },
    ];

    return html`
      <header-element></header-element>
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

        ${this.showSearch
          ? html`
              <div class="search-container">
                <search-input-element
                  .value="${this.searchTerm}"
                  label="Search employees..."
                  @search="${this.handleSearchChange}"
                >
                </search-input-element>
              </div>
            `
          : html``}
        ${this.viewMode === "table" && this.employees?.length > 0
          ? html`
              <table-element
                .list=${this.employees}
                .columns=${tableColumns}
                @edit=${this.handleEdit}
                @delete=${this.handleShowPopup}
              >
              </table-element>
            `
          : html`
              <div class="grid">
                ${this.employees?.map(
                  (employee) =>
                    html`
                      <user-card-element
                        id=${employee.id}
                        .employee=${employee}
                        @edit=${this.handleEdit}
                        @delete=${this.handleShowPopup}
                      >
                      </user-card-element>
                    `
                )}
              </div>
            `}
        ${!this.employees || this.employees?.length === 0
          ? html`
              <div class="no-employees">
                No employees found please add a new employee
              </div>
            `
          : html`
              <pagination-element .pagination=${this.pagination}>
              </pagination-element>
            `}
      </div>

      <popup-element
        title="Are you sure?"
        description="Selected Employee record of Ahmet Sourtimes will be deleted"
        .show=${this.showPopup}
        @close=${this.handleClosePopup}
        @confirm=${this.handleDelete}
      >
      </popup-element>
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

    .search-container {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 20px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      row-gap: 100px;
      column-gap: 100px;
      justify-content: center;
    }

    @media (max-width: 1200px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `;
}

customElements.define("employee-list", EmployeeList);
