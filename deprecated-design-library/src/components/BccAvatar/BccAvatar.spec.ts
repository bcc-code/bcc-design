import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccAvatar from "./BccAvatar.vue";

describe("BccAvatar", () => {
  it("renders the initials", () => {
    const wrapper = mount(BccAvatar, { props: { initials: "LG" } });
    expect(wrapper.text()).toBe("LG");
  });

  it("renders only the first two letters of the initials", () => {
    const wrapper = mount(BccAvatar, { props: { initials: "Frodo" } });
    expect(wrapper.text()).toBe("Fr");
  });
});
