import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccSelect from "./BccSelect.vue";

describe("BccSelect", () => {
  it("emits update event on input", async () => {
    const wrapper = mount(BccSelect, {
      slots: { default: "<option value='brunstad'>Brunstad</option>" },
    });
    await wrapper.find(".bcc-select").setValue("brunstad");

    expect(wrapper.emitted("update:modelValue")?.length).toBe(1);
    expect(wrapper.emitted("update:modelValue")![0]).toEqual(["brunstad"]);
  });

  it("renders a text from the default and message slots", () => {
    const wrapper = mount(BccSelect, {
      slots: {
        default: "<option value='brunstad'>Brunstad</option>",
        message: "Test message",
      },
    });

    expect(wrapper.text()).toContain("Test message");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders a label", () => {
    const wrapper = mount(BccSelect, {
      props: { label: "Test label" },
    });

    expect(wrapper.text()).toBe("Test label");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("renders without a label or optional text", () => {
    const wrapper = mount(BccSelect);

    expect(wrapper.text()).toBe("");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("can render an extra label if the input is optional", () => {
    const wrapper = mount(BccSelect, {
      props: { showOptionalLabel: true, optionalLabel: "Custom optional label" },
    });

    expect(wrapper.text()).toBe("Custom optional label");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("does not render a text if the input is both required and optional", () => {
    const wrapper = mount(BccSelect, {
      props: { showOptionalLabel: true, optionalLabel: "Custom optional label", required: true },
    });

    expect(wrapper.text()).not.toBe("Custom optional label");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("passes through non-prop attributes", () => {
    const wrapper = mount(BccSelect, { attrs: { name: "test" } });
    expect(wrapper.html()).toContain('name="test"');
  });
});
