"use client";
import { useSelector } from "react-redux";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { RootState } from "../(store)";
import { useMemo } from "react";
import { CustomNode } from "../components/custom-node";

export default function Canvas() {
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  return (
    <div className="h-[90vh] w-[90vw]">
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
