import { toTitleCase } from "./strings";

export function convertEnumToPickerObject(
  enumObj: Record<string, string | number>
) {
  return Object.entries(enumObj)
    .filter(([key, value]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: toTitleCase(key.replace("_", " ")),
      value: value,
    }));
}
