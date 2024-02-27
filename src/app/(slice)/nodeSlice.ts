import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Node } from "reactflow";

export interface NodeSliceProps {
  nodes: Node[];
}

export type NodeTitle = Pick<Node, "data" | "id">;

const initialState: NodeSliceProps = {
  nodes: [],
};

export const nodeSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action: PayloadAction<Node>) => {
      const index = state.nodes.findIndex(
        (item) => item.id === action.payload.id
      );
      state.nodes[index] = action.payload;
    },
    updateNodeTitle: (state, action: PayloadAction<NodeTitle>) => {
      const index = state.nodes.findIndex(
        (item) => item.id === action.payload.id
      );
      state.nodes[index].data = action.payload.data;
    },
  },
});

export const { addNode, updateNode, updateNodeTitle } = nodeSlice.actions;

export default nodeSlice.reducer;
