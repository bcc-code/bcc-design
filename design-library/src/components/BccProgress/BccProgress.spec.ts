import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccProgress from "./BccProgress.vue";

describe("BccProgress", () => {

  it("renders without any properties", () => {
    const wrapper = mount(BccProgress);

    expect(wrapper.text()).toContain("0%");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should exceed 100%", () => {
    const wrapper = mount(BccProgress, {
      props: { value: 110, max: 100 },
    });

    expect(wrapper.text()).toContain("110%");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should not exceed 110%", () => {
    const wrapper = mount(BccProgress, {
      props: { value: 110, max: 100, exceed: false },
    });

    expect(wrapper.text()).toContain("100%");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render percentage", () => {
    const wrapper = mount(BccProgress, {
      props: { value: 100, max: 100, showPercentage: true },
    });

    expect(wrapper.text()).toContain("100%");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should not render percentage", () => {
    const wrapper = mount(BccProgress, {
      props: { value: 100, max: 100, showPercentage: false },
    });

    expect(wrapper.text()).not.toContain("100%");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render values", () => {
    const wrapper = mount(BccProgress, {
      props: { value: 100, max: 100, showValues: true },
    });

    expect(wrapper.text()).toContain("100 / 100");
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should not render values", () => {
    const wrapper = mount(BccProgress, {
      props: { value: 100, max: 100, showValues: false },
    });

    expect(wrapper.text()).not.toContain("100 / 100");
    expect(wrapper.html()).toMatchSnapshot();
  });

});
