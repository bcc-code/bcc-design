import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccInput from "./BccInput.vue";

describe("BccInput", () => {
  it("renders a text from the default slot", () => {
    const wrapper = mount(BccInput, {
      slots: { default: "Test message" },
    });

    expect(wrapper.text()).toBe("Test message");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a label", () => {
    const wrapper = mount(BccInput, {
      props: { label: "Test label" },
    });

    expect(wrapper.text()).toBe("Test label");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders without a label or optional text", () => {
    const wrapper = mount(BccInput);

    expect(wrapper.text()).toBe("");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("can render an extra label if the input is optional", () => {
    const wrapper = mount(BccInput, {
      props: { showOptionalLabel: true, optionalLabel: "Custom optional label" },
    });

    expect(wrapper.text()).toBe("Custom optional label");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("does not render a text if the input is both required and optional", () => {
    const wrapper = mount(BccInput, {
      props: { showOptionalLabel: true, optionalLabel: "Custom optional label", required: true },
    });

    expect(wrapper.text()).not.toBe("Custom optional label");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("passes through non-prop attributes", () => {
    const wrapper = mount(BccInput, { attrs: { autocomplete: true } });
    expect(wrapper.html()).toContain('autocomplete="true"');
  });
});
