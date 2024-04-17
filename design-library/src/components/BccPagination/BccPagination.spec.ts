import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccPagination from "./BccPagination.vue";

describe("BccPagination", () => {
  it("renders the right amount of page numbers", async () => {
    const wrapper = mount(BccPagination, {
      props: {
        items: 20,
        rowsPerPage: 5,
      },
    });

    expect(wrapper.emitted("update:totalPages")![0]).toEqual([4]);
  });
  it("renders an ellipsis on both sides", async () => {
    const wrapper = mount(BccPagination, {
      props: {
        items: 50,
        rowsPerPage: 5,
        displayLeftEllipsis: true,
        displayRightEllipsis: true,
      },
    });

    await wrapper.find(".bcc-pagination-arrow-right").trigger("click");
    await wrapper.find(".bcc-pagination-arrow-right").trigger("click");
    await wrapper.find(".bcc-pagination-arrow-right").trigger("click");
    await wrapper.find(".bcc-pagination-arrow-right").trigger("click");
    await wrapper.find(".bcc-pagination-arrow-right").trigger("click");

    expect(wrapper.findAll(".bcc-pagination-elipsis").at(0)).toBeTruthy();
    expect(wrapper.findAll(".bcc-pagination-elipsis").at(1)).toBeTruthy();
  });
  it("updating the rowsPerPage updates the rendered page numbers", async () => {
    const wrapper = mount(BccPagination, {
      props: {
        items: 30,
        rowsPerPage: 1,
        rowsPerPageOptions: [1, 3, 5, 7, 9],
        maxButtonsDisplayed: 1,
      },
    });

    expect(wrapper.findAll(".bcc-pagination-button").at(6)?.html()).contains("30");

    await wrapper.find(".bcc-select").setValue("3");

    expect(wrapper.findAll(".bcc-pagination-button").at(6)?.html()).contains("10");

    await wrapper.find(".bcc-select").setValue("5");

    expect(wrapper.findAll(".bcc-pagination-button").at(5)?.html()).contains("6");

    await wrapper.find(".bcc-select").setValue("7");

    expect(wrapper.findAll(".bcc-pagination-button").at(4)?.html()).contains("5");

    await wrapper.find(".bcc-select").setValue("9");

    expect(wrapper.findAll(".bcc-pagination-button").at(4)?.html()).contains("4");
  });
});
