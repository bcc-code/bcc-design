import { defineCustomElement } from "vue";
import BccButton from "../components/BccButton/BccButton.vue";
import { withBaseStyles } from "./element";

customElements.define("bcc-button", defineCustomElement(withBaseStyles(BccButton)));
