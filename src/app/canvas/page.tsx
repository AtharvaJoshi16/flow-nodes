"use client";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  Edge,
  ReactFlowProvider,
  applyEdgeChanges,
  applyNodeChanges,
  useEdges,
  useReactFlow,
  useUpdateNodeInternals,
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
import { EdgeStyle } from "../(slice)/optionsSlice";

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
      const conn = { ...connection };
      switch (edgeStyle) {
        case EdgeStyle.END_ARROW: {
          conn.markerEnd = {
            width: 10,
            height: 10,
            color: "rgb(255, 196, 2)",
            strokeWidth: 3,
            type: MarkerType.Arrow,
          };
          conn.markerStart = undefined;
          break;
        }
        case EdgeStyle.CLOSED_END_ARROW: {
          conn.markerEnd = {
            width: 10,
            height: 10,
            color: "rgb(255, 196, 2)",
            strokeWidth: 3,
            type: MarkerType.ArrowClosed,
          };
          conn.markerStart = undefined;
          break;
        }
        case EdgeStyle.BOTH_END_ARROW: {
          conn.markerEnd = {
            width: 10,
            height: 10,
            color: "rgb(255, 196, 2)",
            strokeWidth: 3,
            type: MarkerType.Arrow,
          };
          conn.markerStart = {
            width: 10,
            height: 10,
            color: "rgb(255, 196, 2)",
            strokeWidth: 3,
            type: MarkerType.Arrow,
          };
          break;
        }
        case EdgeStyle.CLOSED_BOTH_END_ARROW: {
          conn.markerEnd = {
            width: 10,
            height: 10,
            color: "rgb(255, 196, 2)",
            strokeWidth: 3,
            type: MarkerType.ArrowClosed,
          };
          conn.markerStart = {
            width: 10,
            height: 10,
            color: "rgb(255, 196, 2)",
            strokeWidth: 3,
            type: MarkerType.ArrowClosed,
          };
          break;
        }
        default: {
          conn.markerStart = undefined;
          conn.markerEnd = undefined;
        }
      }
      // console.log(conn);
      connectingNodeId.current = null;
      dispatch(updateEdges(addEdge(conn, [...edges])));
    },
    [edges, edgeStyle]
  );

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
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
        const conn: Edge = { id, source: connectingNodeId.current, target: id };
        switch (edgeStyle) {
          case EdgeStyle.END_ARROW: {
            conn.markerEnd = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.Arrow,
            };
            conn.markerStart = undefined;
            break;
          }
          case EdgeStyle.CLOSED_END_ARROW: {
            conn.markerEnd = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.ArrowClosed,
            };
            conn.markerStart = undefined;
            break;
          }
          case EdgeStyle.BOTH_END_ARROW: {
            conn.markerEnd = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.Arrow,
            };
            conn.markerStart = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.Arrow,
            };
            break;
          }
          case EdgeStyle.CLOSED_BOTH_END_ARROW: {
            conn.markerEnd = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.ArrowClosed,
            };
            conn.markerStart = {
              width: 10,
              height: 10,
              color: "rgb(255, 196, 2)",
              strokeWidth: 3,
              type: MarkerType.ArrowClosed,
            };
            break;
          }
          default: {
            conn.markerStart = undefined;
            conn.markerEnd = undefined;
          }
        }
        dispatch(updateEdges(addEdge(conn, [...edges])));
      }
    },
    [screenToFlowPosition, edgeStyle, edges]
  );

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  return (
    <div className="h-[90vh] w-[100vw] m-auto">
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
