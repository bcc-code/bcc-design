export type BccTableColumn = {
  key: string;
  text?: string;
  sortable?: boolean;
  sortMethod?: (a: BccTableItem, b: BccTableItem) => number;
};
export type BccTableItem = Record<string, any>;
export type BccTableSortDirection = "ascending" | "descending";
