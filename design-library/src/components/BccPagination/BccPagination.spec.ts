import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import BccPagination from "./BccPagination.vue";

describe("BccPagination", () => {
  it("renders the right amount of page numbers", async () => {
    const wrapper = mount(BccPagination, {
      props: {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        rowsPerPage: 2,
      },
    });

    expect(wrapper.emitted("update:paginatedItems")?.length).toEqual(1);
    expect(wrapper.emitted("update:totalPages")![0]).toEqual([6]);
  });
  it("renders an ellipsis on both sides", async () => {
    const wrapper = mount(BccPagination, {
      props: {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        rowsPerPage: 1,
        displayLeftEllipsis: true,
        displayRightEllipsis: true,
      },
    });

    await wrapper.find(".bcc-pagination-arrow-right").trigger("click");
    await wrapper.find(".bcc-pagination-arrow-right").trigger("click");
    await wrapper.find(".bcc-pagination-arrow-right").trigger("click");

    expect(wrapper.findAll(".bcc-pagination-elipsis").at(0)).toBeTruthy();
    expect(wrapper.findAll(".bcc-pagination-elipsis").at(1)).toBeTruthy();
  });
  it("updating the rowsPerPage updates the rendered page numbers", async () => {
    const wrapper = mount(BccPagination, {
      props: {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        rowsPerPage: 1,
        rowsPerPageOptions: [1, 3, 5, 7, 9],
      },
    });

    expect(wrapper.findAll(".bcc-pagination-button").at(4)?.html()).contains("16");

    await wrapper.find(".bcc-select").setValue("3");

    expect(wrapper.findAll(".bcc-pagination-button").at(4)?.html()).contains("6");

    await wrapper.find(".bcc-select").setValue("5");

    expect(wrapper.findAll(".bcc-pagination-button").at(4)?.html()).contains("4");

    await wrapper.find(".bcc-select").setValue("7");

    expect(wrapper.findAll(".bcc-pagination-button").at(3)?.html()).contains("3");

    await wrapper.find(".bcc-select").setValue("9");

    expect(wrapper.findAll(".bcc-pagination-button").at(2)?.html()).contains("2");
  });

  it("paginatedItems is displaying the right contents when switching page", async () => {
    const wrapper = mount(BccPagination, {
      props: {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        rowsPerPage: 3,
      },
    });

    expect(wrapper.emitted("update:paginatedItems")![0]).toEqual([[1, 2, 3]]);

    await wrapper.find(".bcc-pagination-arrow-right").trigger("click");

    expect(wrapper.emitted("update:paginatedItems")![1]).toEqual([[4, 5, 6]]);
  });
});
