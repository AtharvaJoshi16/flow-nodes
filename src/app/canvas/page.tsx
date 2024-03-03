"use client";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { RootState } from "../(store)";
import { useCallback, useEffect, useMemo } from "react";
import { CustomNode } from "../components/custom-node";
import React, { useState, useRef } from "react";
import "reactflow/dist/style.css";
import { updateNode, updateNodes } from "../(slice)/nodeSlice";
import { addEdge as addEdgeAction, updateEdges } from "../(slice)/edgeSlice";
import { addEdge } from "reactflow";
import "./styles.css";
import DownloadButton from "../components/download-image";

export default function Canvas() {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const edges = useSelector((state: RootState) => state.edges.edges);
  const pattern = useSelector((state: RootState) => state.options.patterns);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateNodes([]));
  }, [pattern]);

  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
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
    <div className="h-[100vh] w-[95vw] m-auto">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background />
        <DownloadButton />
        <Controls position="top-right" fitViewOptions={{ duration: 800 }} />
        <MiniMap
          nodeStrokeWidth={3}
          maskColor="#e2e2e2"
          position="bottom-left"
          offsetScale={10}
          style={{ bottom: "140px" }}
        />
      </ReactFlow>
    </div>
  );
}
