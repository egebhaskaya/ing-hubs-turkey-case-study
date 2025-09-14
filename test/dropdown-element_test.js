import { html } from "lit";
import { fixture, expect } from "@open-wc/testing";
import "../src/components/dropdown-element.js";

suite("dropdown-element", () => {
  test("renders with default properties", async () => {
    const el = await fixture(html`<dropdown-element></dropdown-element>`);
    expect(el).to.exist;
    expect(el.label).to.equal("");
    expect(el.value).to.equal("");
    expect(el.options).to.deep.equal([]);
  });

  test("renders with label and options", async () => {
    const options = [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
    ];

    const el = await fixture(html`
      <dropdown-element label="Test Dropdown" .options=${options}>
      </dropdown-element>
    `);

    expect(el.label).to.equal("Test Dropdown");
    expect(el.options).to.deep.equal(options);

    const label = el.shadowRoot.querySelector("label");
    const select = el.shadowRoot.querySelector("select");
    const optionElements = el.shadowRoot.querySelectorAll("option");

    expect(label.textContent.trim()).to.equal("Test Dropdown");
    expect(select).to.exist;
    expect(optionElements.length).to.equal(3);
  });

  test("handles selection change", async () => {
    const options = [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
    ];

    const el = await fixture(html`
      <dropdown-element name="testDropdown" .options=${options}>
      </dropdown-element>
    `);

    let changeEventFired = false;
    let eventDetail = null;

    el.addEventListener("input-change", (e) => {
      changeEventFired = true;
      eventDetail = e.detail;
    });

    const select = el.shadowRoot.querySelector("select");
    select.value = "opt1";
    select.dispatchEvent(new Event("change"));

    expect(changeEventFired).to.be.true;
    expect(eventDetail.name).to.equal("testDropdown");
    expect(eventDetail.value).to.equal("opt1");
    expect(el.value).to.equal("opt1");
  });

  test("displays error message", async () => {
    const el = await fixture(html`
      <dropdown-element label="Test Dropdown" error="Please select an option">
      </dropdown-element>
    `);

    expect(el.error).to.equal("Please select an option");

    const errorSpan = el.shadowRoot.querySelector(".error");
    expect(errorSpan).to.exist;
    expect(errorSpan.textContent.trim()).to.equal("Please select an option");
  });

  test("renders placeholder option", async () => {
    const el = await fixture(html`
      <dropdown-element placeholder="Choose option"></dropdown-element>
    `);

    const placeholderOption = el.shadowRoot.querySelector('option[value=""]');
    expect(placeholderOption).to.exist;
    expect(placeholderOption.textContent.trim()).to.equal("Choose option");
    expect(placeholderOption.disabled).to.be.true;
  });

  test("sets selected value correctly", async () => {
    const options = [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
    ];

    const el = await fixture(html`
      <dropdown-element value="opt2" .options=${options}> </dropdown-element>
    `);

    expect(el.value).to.equal("opt2");

    const select = el.shadowRoot.querySelector("select");
    expect(select.value).to.equal("opt2");
  });

  test("applies error styling when error is present", async () => {
    const el = await fixture(html`
      <dropdown-element error="Required field"></dropdown-element>
    `);

    expect(el.error).to.equal("Required field");
    const errorSpan = el.shadowRoot.querySelector(".error");
    expect(errorSpan).to.exist;
  });

  test("is accessible", async () => {
    const options = [{ label: "Accessible Option", value: "accessible" }];

    const el = await fixture(html`
      <dropdown-element
        label="Accessible Dropdown"
        name="accessible"
        .options=${options}
      >
      </dropdown-element>
    `);

    const label = el.shadowRoot.querySelector("label");

    expect(el.name).to.equal("accessible");
    expect(label).to.exist;
    expect(label.textContent.trim()).to.equal("Accessible Dropdown");
  });
});
