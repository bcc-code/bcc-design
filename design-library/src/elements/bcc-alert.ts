import { defineCustomElement } from "vue";
import BccAlert from "../components/BccAlert/BccAlert.vue";
import { withBaseStyles } from "./element";

customElements.define("bcc-alert", defineCustomElement(withBaseStyles(BccAlert)));
