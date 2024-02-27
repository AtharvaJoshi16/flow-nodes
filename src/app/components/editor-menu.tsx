"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../(store)";
import { Node } from "reactflow";
import { v4 as uuidv4 } from "uuid";

import { addNode } from "../(slice)/nodeSlice";

export const EditorMenu = () => {
  const dispatch = useDispatch();

  const initiateNewNode = () => {
    const x = Math.random() * 300;
    const y = Math.random() * 300;
    const newNode: Node = {
      id: uuidv4(),
      position: { x: x, y: y },
      data: { label: "Rename this node" },
      type: "customNode",
      draggable: true,
      dragging: true,
    };
    dispatch(addNode(newNode));
  };

  return (
    <div className="flex flex-col gap-[10px] absolute top-[30%] z-10 border-2 p-[10px] rounded-lg left-[20px]">
      <Button
        onClick={initiateNewNode}
        title="Add a node"
        variant="outline"
        size="icon"
      >
        <PlusCircle size={20} />
      </Button>
    </div>
  );
};
