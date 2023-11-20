import type { Filter } from "rule-filter-validator";
export type Width = "full" | "fill" | "1/2" | "1/3" | "1/4";

type Translations = {
  language: string;
  translation: string;
};

interface FieldValidation<T> {
  rule: Filter<{ $CURRENT_VALUE: T }>;
  message?: string;
}

interface FieldCondition {
  rule: Filter;
  required?: boolean;
  readonly?: boolean;
  hidden?: boolean;
  options?: Record<string, any>;
}

type TypeMapping = {
  string: "string";
  number: "number";
  boolean: "boolean";
  date: "date";
  array: "array";
  object: "object";
  null: "null";
  any: "any";
};

interface FormField<FieldType extends keyof TypeMapping> {
  field: string;
  type: TypeMapping[FieldType];
  interface: string | null; // Defaults to text input
  options: Record<string, any> | null; // custom options to be passed to the input
  special: string | null; // varchar with DEFAULT NULL
  display: string | null;
  display_options: any | null;
  required: boolean;
  readonly: boolean;
  hidden: boolean;
  translations: string | Record<string, string> | null; // eg. $t:key | { en: Key };
  note: string; // text maps to string
  conditions: FieldCondition | null;
  validation: FieldValidation<FieldType> | null;
}

interface FormLayout {
  name: string;
  interface: "root" | "string";
  children: Array<FormLayout | FieldLayout>;
  options?: Record<string, any>;
  conditions?: FieldCondition | null;
}

interface FieldLayout {
  field: string;
  width?: // Default width is full
  | Width
    | {
        sm?: Width;
        lg?: Width;
      };
}
