"use client";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { RootState } from "../(store)";
import { useCallback, useEffect, useMemo } from "react";
import { CustomNode } from "../components/custom-node";
import React, { useState, useRef } from "react";
import { addEdge } from "reactflow";
import "reactflow/dist/style.css";
import { addNode, updateNode, updateNodes } from "../(slice)/nodeSlice";
import {
  addEdge as addEdgeAction,
  updateEdgeStyle,
  updateEdges,
} from "../(slice)/edgeSlice";
import "./styles.css";
import DownloadButton from "../components/download-image";
import { v4 } from "uuid";

export default function Canvas() {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const edges = useSelector((state: RootState) => state.edges.edges);
  const pattern = useSelector((state: RootState) => state.options.patterns);
  const edgeStyle = useSelector((state: RootState) => state.options.edgeStyle);
  const dispatch = useDispatch();
  const { screenToFlowPosition } = useReactFlow();

  const connectingNodeId = useRef(null);

  useEffect(() => {
    dispatch(updateNodes([]));
  }, [pattern]);

  useEffect(() => {
    dispatch(updateEdgeStyle(edgeStyle));
  }, [edgeStyle]);

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
      connectingNodeId.current = null;
      dispatch(updateEdges(addEdge(connection, [...edges])));
      dispatch(updateEdgeStyle(edgeStyle));
    },
    [edges]
  );

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = v4();
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          type: "customNode",
          data: { label: `Node 1` },
          origin: [0.5, 0.0],
        };

        dispatch(addNode(newNode));
        dispatch(
          addEdgeAction({ id, source: connectingNodeId.current, target: id })
        );
      }
    },
    [screenToFlowPosition]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] m-auto">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
      >
        <Background />
        <DownloadButton />
        <Controls
          position="bottom-right"
          style={{ bottom: "40px", right: "20px" }}
          fitViewOptions={{ duration: 800 }}
        />
        <MiniMap
          nodeStrokeWidth={3}
          maskColor="#e2e2e2"
          position="bottom-left"
          offsetScale={10}
          style={{ bottom: "40px", left: "20px" }}
        />
      </ReactFlow>
    </div>
  );
}
