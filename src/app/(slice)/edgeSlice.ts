import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Edge } from "reactflow";

export interface EdgeSliceProps {
  edges: Edge[];
}

const initialState: EdgeSliceProps = {
  edges: [],
};

export type EdgeTitle = Pick<Edge, "data" | "id">;

export const edgeSlice = createSlice({
  name: "edges",
  initialState,
  reducers: {
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges.push(action.payload);
    },
    updateEdge: (state, action: PayloadAction<Edge>) => {
      const index = state.edges.findIndex(
        (item) => item.id === action.payload.id
      );
      state.edges[index] = action.payload;
    },
    updateEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    updateEdgeTitle: (state, action: PayloadAction<EdgeTitle>) => {
      const index = state.edges.findIndex(
        (item) => item.id === action.payload.id
      );
      state.edges[index].data = action.payload.data;
    },
    deleteEdge: (state, action: PayloadAction<string>) => {
      state.edges = state.edges.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addEdge, updateEdge, updateEdgeTitle, updateEdges, deleteEdge } =
  edgeSlice.actions;

export default edgeSlice.reducer;
