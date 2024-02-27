"use client";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowInstance,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { RootState } from "../(store)";
import { useCallback, useMemo } from "react";
import { CustomNode } from "../components/custom-node";
import React, { useState, useRef } from "react";
import { v4 } from "uuid";
import "reactflow/dist/style.css";
import { updateNode, updateNodes } from "../(slice)/nodeSlice";

export default function Canvas() {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const dispatch = useDispatch();

  const onNodesChange = useCallback(
    (changes) => {
      dispatch(updateNodes(applyNodeChanges(changes, [...nodes])));
    },
    [nodes]
  );

  //   const onEdgesChange = useCallback((changes) => {
  //     applyEdgeChanges(changes, edges);
  //   }, []);

  return (
    <div className="h-[90vh] w-[90vw]">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
