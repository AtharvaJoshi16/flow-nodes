"use client";
import { ReactNode } from "react";
import { ReactFlowProvider } from "reactflow";

export default function Wrapper({ children }: { children: ReactNode }) {
  return <ReactFlowProvider>{children}</ReactFlowProvider>;
}
