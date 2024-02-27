import { useState } from "react";
import { useDispatch } from "react-redux";
import { Node, NodeProps } from "reactflow";
import { NodeTitle, updateNode, updateNodeTitle } from "../(slice)/nodeSlice";

export const CustomNode = (props: NodeProps) => {
  const dispatch = useDispatch();

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const actualNode: NodeTitle = {
      data: { label: e.currentTarget.innerText },
      id: props.id,
    };
    console.log(actualNode);
    dispatch(updateNodeTitle(actualNode));
  };
  return (
    <div className="p-[20px] min-w-[200px] rounded-lg border-2 bg-white">
      <div contentEditable onBlur={(e) => handleBlur(e)}>
        {props.data.label}
      </div>
    </div>
  );
};
