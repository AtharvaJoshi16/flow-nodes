import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
}

export interface OptionsProps {
  alignment: Alignment;
  patterns: Patterns;
}

const initialState: OptionsProps = {
  alignment: Alignment.HORIZONTAL,
  patterns: Patterns.MIND_MAP,
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
  },
});

export const { setAlignment, setPattern } = optionsSlice.actions;

export default optionsSlice.reducer;
