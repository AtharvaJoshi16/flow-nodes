"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../(store)";
import { Node } from "reactflow";
import { v4 as uuidv4 } from "uuid";

import { addNode } from "../(slice)/nodeSlice";
import { Combobox } from "./combobox";
import { ModeToggle } from "@/components/mode-toggle";
import { alignment, frameworks } from "../(options)";
import { Patterns } from "../(slice)/optionsSlice";

export const EditorMenu = () => {
  const dispatch = useDispatch();
  const pattern = useSelector((state: RootState) => state.options.patterns);
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
        variant="secondary"
        className="flex items-center gap-[10px] justify-between"
      >
        <h3 className="font-normal">Add a node</h3>
        <PlusCircle size={20} />
      </Button>
      <Combobox list={frameworks} />
      <Combobox disabled={pattern !== Patterns.MIND_MAP} list={alignment} />
    </div>
  );
};
