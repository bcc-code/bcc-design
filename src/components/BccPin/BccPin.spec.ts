import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccPin from "./BccPin.vue";
import { CheckCircleIcon } from "@bcc-code/icons-vue";

describe("BccPin", () => {
  it("renders a pin", () => {
    expect(BccPin).toBeTruthy();

    const wrapper = mount(BccPin, {
      props: {
        icon: CheckCircleIcon,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
