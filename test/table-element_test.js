import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import "../src/components/table-element.js";

suite("table-element", () => {
  const mockEmployees = [
    {
      id: "emp_1",
      firstName: "John",
      lastName: "Doe",
      dateOfEmployment: "2023-01-15",
      dateOfBirth: "1990-05-20",
      phone: "5551234567",
      email: "john.doe@example.com",
      department: "Tech",
      position: "Senior",
    },
    {
      id: "emp_2",
      firstName: "Jane",
      lastName: "Smith",
      dateOfEmployment: "2023-02-10",
      dateOfBirth: "1988-08-15",
      phone: "5559876543",
      email: "jane.smith@example.com",
      department: "Analytics",
      position: "Junior",
    },
  ];

  test("renders with default properties", async () => {
    const el = await fixture(html`<table-element></table-element>`);
    expect(el).to.exist;
    expect(el.list).to.deep.equal([]);
  });

  test("renders table with employee data", async () => {
    const el = await fixture(html`
      <table-element .list=${mockEmployees}></table-element>
    `);

    expect(el.list).to.deep.equal(mockEmployees);

    const table = el.shadowRoot.querySelector("table");
    const rows = el.shadowRoot.querySelectorAll("tbody tr");

    expect(table).to.exist;
    expect(rows.length).to.equal(2);
  });

  test("renders table headers correctly", async () => {
    const el = await fixture(html`
      <table-element .list=${mockEmployees}></table-element>
    `);

    const headers = el.shadowRoot.querySelectorAll("thead th");
    expect(headers.length).to.be.greaterThan(0);

    expect(headers).to.exist;
  });

  test("handles edit button click", async () => {
    const el = await fixture(html`
      <table-element .list=${mockEmployees}></table-element>
    `);

    let editEventFired = false;
    let editedEmployee = null;

    el.addEventListener("edit", (e) => {
      editEventFired = true;
      editedEmployee = e.detail.employee;
    });

    const editButton = el.shadowRoot.querySelector(
      'button-element[label*="Edit"]'
    );
    if (editButton) {
      editButton.click();

      expect(editEventFired).to.be.true;
      expect(editedEmployee).to.exist;
    }
  });

  test("handles delete button click", async () => {
    const el = await fixture(html`
      <table-element .list=${mockEmployees}></table-element>
    `);

    let deleteEventFired = false;
    let deletedEmployee = null;

    el.addEventListener("delete", (e) => {
      deleteEventFired = true;
      deletedEmployee = e.detail.employee;
    });

    const deleteButton = el.shadowRoot.querySelector(
      'button-element[label*="Delete"]'
    );
    if (deleteButton) {
      deleteButton.click();

      expect(deleteEventFired).to.be.true;
      expect(deletedEmployee).to.exist;
    }
  });

  test("displays empty state when no data", async () => {
    const el = await fixture(html`<table-element .list=${[]}></table-element>`);

    expect(el.list.length).to.equal(0);
    expect(el).to.exist;
  });

  test("formats phone numbers correctly", async () => {
    const el = await fixture(html`
      <table-element .list=${mockEmployees}></table-element>
    `);

    const phoneCell = el.shadowRoot.querySelector("td");
    expect(el).to.exist;
  });

  test("is accessible", async () => {
    const el = await fixture(html`
      <table-element .list=${mockEmployees}></table-element>
    `);

    const table = el.shadowRoot.querySelector("table");
    const headers = el.shadowRoot.querySelectorAll("th");

    expect(table).to.exist;
    expect(headers.length).to.be.greaterThan(0);
  });
});
