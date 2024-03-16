import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkerType } from "reactflow";

export enum Alignment {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

export enum Patterns {
  MIND_MAP = "mind-map",
  FLOWCHART = "flowchart",
  FS = "file-system",
  SCHEMA = "schema",
  ERD = "er-diagram",
  STICKY_NOTES = "sticky-notes",
  TURBO = "turbo",
}

export enum EdgeStyle {
  DEFAULT = "default",
  END_ARROW = `${MarkerType.Arrow}-1`,
  CLOSED_END_ARROW = `${MarkerType.ArrowClosed}-1`,
  BOTH_END_ARROW = `${MarkerType.Arrow}-2`,
  CLOSED_BOTH_END_ARROW = `${MarkerType.ArrowClosed}-2`,
}

export interface OptionsProps {
  alignment: Alignment;
  patterns: Patterns;
  edgeStyle: EdgeStyle;
  showHandle: boolean;
}

const initialState: OptionsProps = {
  alignment: Alignment.HORIZONTAL,
  patterns: Patterns.MIND_MAP,
  edgeStyle: EdgeStyle.DEFAULT,
  showHandle: false,
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setAlignment: (state, action: PayloadAction<Alignment>) => {
      state.alignment = action.payload;
    },
    setPattern: (state, action: PayloadAction<Patterns>) => {
      state.patterns = action.payload;
    },
    setEdgeStyle: (state, action: PayloadAction<EdgeStyle>) => {
      state.edgeStyle = action.payload;
    },
    setShowHandle: (state, action: PayloadAction<boolean>) => {
      state.showHandle = action.payload;
    },
  },
});

export const { setAlignment, setPattern, setEdgeStyle, setShowHandle } =
  optionsSlice.actions;

export default optionsSlice.reducer;
