import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Edge, MarkerType } from "reactflow";
import { EdgeStyle } from "./optionsSlice";

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
    updateEdgeStyle: (state, action: PayloadAction<EdgeStyle>) => {
      state.edges.forEach((edge) => {
        switch (action.payload) {
          case EdgeStyle.END_ARROW: {
            edge.markerEnd = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.Arrow,
            };
            edge.markerStart = undefined;
            break;
          }
          case EdgeStyle.CLOSED_END_ARROW: {
            edge.markerEnd = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.ArrowClosed,
            };
            edge.markerStart = undefined;
            break;
          }
          case EdgeStyle.BOTH_END_ARROW: {
            edge.markerEnd = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.Arrow,
            };
            edge.markerStart = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.Arrow,
            };
            break;
          }
          case EdgeStyle.CLOSED_BOTH_END_ARROW: {
            edge.markerEnd = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.ArrowClosed,
            };
            edge.markerStart = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.ArrowClosed,
            };
            break;
          }
          default: {
            edge.markerStart = undefined;
            edge.markerEnd = undefined;
          }
        }
      });
    },
  },
});

export const {
  addEdge,
  updateEdge,
  updateEdgeTitle,
  updateEdges,
  deleteEdge,
  updateEdgeStyle,
} = edgeSlice.actions;

export default edgeSlice.reducer;
