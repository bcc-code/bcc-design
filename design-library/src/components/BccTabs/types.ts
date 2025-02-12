import { BccPin, BccBadge } from "@/index";
import type { VueComponent } from "@/types";

export type BccTabsGroup = Array<{
  title: string;
  icon?: VueComponent;
  pin?: InstanceType<typeof BccPin>["$props"];
  badge?: InstanceType<typeof BccBadge>["$props"] & { text: string };
  as?: VueComponent;
  disabled?: boolean;
  loading?: boolean;
}>;
