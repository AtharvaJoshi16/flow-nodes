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
import "reactflow/dist/style.css";
import { updateNode, updateNodes } from "../(slice)/nodeSlice";
import { addEdge as addEdgeAction, updateEdges } from "../(slice)/edgeSlice";
import { addEdge } from "reactflow";

export default function Canvas() {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const edges = useSelector((state: RootState) => state.edges.edges);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
  const dispatch = useDispatch();

  const onNodesChange = useCallback(
    (changes) => {
      dispatch(updateNodes(applyNodeChanges(changes, [...nodes])));
    },
    [nodes]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      dispatch(updateEdges(applyEdgeChanges(changes, [...edges])));
    },
    [edges]
  );

  const onConnect = useCallback(
    (connection) => {
      dispatch(updateEdges(addEdge(connection, [...edges])));
    },
    [edges]
  );

  return (
    <div className="h-[90vh] w-[90vw]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
