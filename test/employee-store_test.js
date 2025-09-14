import { expect } from "@open-wc/testing";
import {
  store,
  addEmployee,
  deleteEmployee,
  editEmployee,
  setViewMode,
  setPagination,
  setSearch,
  clearSearch,
} from "../src/store/employee-store.js";

suite("employee-store", () => {
  let initialState;

  setup(() => {
    initialState = store.getState();

    localStorage.removeItem("employees");
  });

  teardown(() => {
    localStorage.removeItem("employees");
  });

  test("store has initial state", () => {
    const state = store.getState();
    expect(state).to.exist;
    expect(state.employees).to.exist;
    expect(state.employees.viewMode).to.exist;
    expect(state.employees.viewMode).to.equal("table");
  });

  test("addEmployee action works", () => {
    const newEmployee = {
      id: "test_123",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@test.com",
      phone: "5551234567",
      department: "Tech",
      position: "Senior",
      dateOfEmployment: "2023-01-15",
      dateOfBirth: "1990-05-20",
    };

    store.dispatch(addEmployee(newEmployee));

    const state = store.getState();
    const addedEmployee = state.employees.list.find(
      (emp) => emp.id === "test_123"
    );

    expect(addedEmployee).to.exist;
    expect(addedEmployee.firstName).to.equal("John");
    expect(addedEmployee.lastName).to.equal("Doe");
  });

  test("editEmployee action works", () => {
    const employee = {
      id: "test_edit_123",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@test.com",
      phone: "5551234567",
      department: "Tech",
      position: "Senior",
      dateOfEmployment: "2023-01-15",
      dateOfBirth: "1990-05-20",
    };

    store.dispatch(addEmployee(employee));

    const updatedEmployee = {
      ...employee,
      firstName: "Jane Updated",
      lastName: "Smith Updated",
    };

    store.dispatch(editEmployee(updatedEmployee));

    const state = store.getState();
    const editedEmployee = state.employees.list.find(
      (emp) => emp.id === "test_edit_123"
    );

    expect(editedEmployee).to.exist;
    expect(editedEmployee.firstName).to.equal("Jane Updated");
    expect(editedEmployee.lastName).to.equal("Smith Updated");
  });

  test("deleteEmployee action works", () => {
    const employee = {
      id: "test_delete_123",
      firstName: "Delete",
      lastName: "Me",
      email: "delete@test.com",
      phone: "5551234567",
      department: "Tech",
      position: "Senior",
      dateOfEmployment: "2023-01-15",
      dateOfBirth: "1990-05-20",
    };

    store.dispatch(addEmployee(employee));

    let state = store.getState();
    expect(state.employees.list.find((emp) => emp.id === "test_delete_123")).to
      .exist;

    store.dispatch(deleteEmployee("test_delete_123"));

    state = store.getState();
    expect(state.employees.list.find((emp) => emp.id === "test_delete_123")).to
      .not.exist;
  });

  test("setViewMode action works", () => {
    store.dispatch(setViewMode("grid"));

    const state = store.getState();
    expect(state.employees.viewMode).to.equal("grid");

    store.dispatch(setViewMode("table"));

    const newState = store.getState();
    expect(newState.employees.viewMode).to.equal("table");
  });

  test("setPagination action works", () => {
    const page = 2;
    store.dispatch(setPagination(page));

    const state = store.getState();
    expect(state.employees.pagination.page).to.be.a("number");
  });

  test("setSearch and clearSearch actions work", () => {
    store.dispatch(setSearch("test"));

    let state = store.getState();
    expect(state.employees.searchTerm).to.equal("test");

    store.dispatch(clearSearch());

    state = store.getState();
    expect(state.employees.searchTerm).to.equal("");
  });

  test("localStorage persistence works", () => {
    const employee = {
      id: "persist_test_123",
      firstName: "Persist",
      lastName: "Test",
      email: "persist@test.com",
      phone: "5551234567",
      department: "Tech",
      position: "Senior",
      dateOfEmployment: "2023-01-15",
      dateOfBirth: "1990-05-20",
    };

    store.dispatch(addEmployee(employee));

    const savedData = localStorage.getItem("employees");
    expect(savedData).to.exist;

    const parsedData = JSON.parse(savedData);
    expect(parsedData).to.be.an("array");
    expect(parsedData.find((emp) => emp.id === "persist_test_123")).to.exist;
  });
});
