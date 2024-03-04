import { MarkerType } from "reactflow";

export const frameworks = {
  default: "mind-map",
  title: "Patterns",
  items: [
    {
      value: "flowchart",
      label: "Flowchart",
    },
    {
      value: "schema",
      label: "Schema",
    },
    {
      value: "mind-map",
      label: "Mind Map",
    },
    {
      value: "file-system",
      label: "File System",
    },
    {
      value: "er-diagram",
      label: "ER Diagram",
    },
    {
      value: "sticky-notes",
      label: "Sticky Notes",
    },
  ],
};

export const alignment = {
  default: "horizontal",
  title: "Alignment",
  items: [
    {
      value: "vertical",
      label: "Vertical",
    },
    {
      value: "horizontal",
      label: "Horizontal",
    },
  ],
};

export const EdgeStyles = {
  default: "default",
  title: "Edge Style",
  items: [
    {
      value: `default`,
      label: "Default",
    },
    {
      value: `${MarkerType.Arrow}-1`,
      label: "End Arrow",
    },
    {
      value: `${MarkerType.ArrowClosed}-1`,
      label: "Close End Arrow",
    },
    {
      value: `${MarkerType.ArrowClosed}-2`,
      label: "Close Both End Arrow",
    },
    {
      value: `${MarkerType.Arrow}-2`,
      label: "Both End Arrow",
    },
  ],
};
