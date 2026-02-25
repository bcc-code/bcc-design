import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BccStepper from "./BccStepper.vue";

describe("BccStepper", () => {
  it("renders correctly with initial props", () => {
    const steps = ["Step 1", "Step 2", "Step 3"];
    const wrapper = mount(BccStepper, {
      props: {
        currentStep: 1,
        steps: steps,
        additionalText: true,
      },
    });
    expect(wrapper.findAll(".bcc-stepper-indicator").length).toBe(steps.length);
    expect(wrapper.text()).toContain("Step 2 of 3"); // Checking for the header text
  });

  it("applies active class to the current step indicator", () => {
    const wrapper = mount(BccStepper, {
      props: {
        currentStep: 0,
        steps: ["Step 1", "Step 2"],
        additionalText: false,
      },
    });
    const indicators = wrapper.findAll(".bcc-stepper-indicator");
    expect(indicators[0].classes()).toContain("bcc-stepper-indicator-active");
    expect(indicators[1].classes()).not.toContain("bcc-stepper-indicator-active");
  });

  it("does not display step titles when additionalText is false", () => {
    const wrapper = mount(BccStepper, {
      props: {
        currentStep: 1,
        steps: ["Step 1", "Step 2", "Step 3"],
        additionalText: false,
      },
    });
    expect(wrapper.find(".bcc-stepper-current-label").exists()).toBe(false);
  });

  it("displays step titles when additionalText is true", () => {
    const wrapper = mount(BccStepper, {
      props: {
        currentStep: 1,
        steps: ["Step 1", "Step 2", "Step 3"],
        additionalText: true,
      },
    });
    expect(wrapper.find(".bcc-stepper-current-label").exists()).toBe(true);
    expect(wrapper.find(".bcc-stepper-current-label").text()).toBe("Step 2");
  });
});
