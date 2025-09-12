import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("grid-element")
export class GridElement extends LitElement {
  render() {
    return html`<div>Grid</div>`;
  }
}
