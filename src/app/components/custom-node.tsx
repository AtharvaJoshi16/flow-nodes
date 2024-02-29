import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Handle, Node, NodeProps, Position } from "reactflow";
import {
  NodeTitle,
  deleteNode,
  updateNode,
  updateNodeTitle,
} from "../(slice)/nodeSlice";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import cn from "classnames";
import { Input } from "@/components/ui/input";
import { twMerge } from "tailwind-merge";
import { Menu } from "./menu";

export const CustomNode = (props: NodeProps) => {
  const dispatch = useDispatch();
  const [nodeName, setNodeName] = useState("Node 1");
  const [contentEditable, setContentEditable] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        setContentEditable(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleBlur = () => {
    if (nodeName) {
      const actualNode: NodeTitle = {
        data: { label: nodeName },
        id: props.id,
      };
      dispatch(updateNodeTitle(actualNode));
      setContentEditable(false);
    }
  };

  return (
    <Menu>
      <div
        ref={nodeRef}
        onBlur={() => {
          setContentEditable(false);
          nodeRef.current?.classList.add("border-none");
          nodeRef.current?.classList.remove("border-sky-600", "rounded-lg");
        }}
        onDoubleClick={() => setContentEditable(true)}
        className="border-none"
        onClick={(e) => {
          nodeRef.current?.classList.remove("border-none");
          nodeRef.current?.classList.add("border-sky-600", "rounded-lg");
        }}
      >
        <Handle type="target" position={Position.Left} isConnectable />
        {contentEditable ? (
          <Input
            className="min-w-[20px]"
            value={nodeName}
            placeholder="Name your node..."
            id="node-name"
            name="node-name"
            onBlur={handleBlur}
            onChange={(e) => setNodeName(e.target.value)}
          />
        ) : (
          <h3 className="p-[10px]">{nodeName}</h3>
        )}
        <Handle type="source" position={Position.Right} isConnectable />
      </div>
    </Menu>
  );

  return (
    <div
      ref={nodeRef}
      className={cn(
        "p-[20px] min-w-[200px] rounded-lg border-2 relative [contenteditable=`true`]:focus-visible:outline-2 ",
        { "border-sky-600": contentEditable }
      )}
    >
      <Handle type="source" position={Position.Top} isConnectable />
      <Handle type="source" position={Position.Bottom} isConnectable />
      <div className="absolute top-[-15px] right-[10px] flex items-center gap-[15px]">
        <Button
          className="rounded-full w-[30px] h-[30px] p-2"
          variant="secondary"
          size="sm"
          onClick={() => {
            setContentEditable(!contentEditable);
          }}
        >
          <Pencil size={20} />
        </Button>
        <Button
          className="rounded-full w-[30px] h-[30px] p-2"
          variant="destructive"
          size="sm"
          onClick={() => dispatch(deleteNode(props.id))}
        >
          <Trash size={20} />
        </Button>
      </div>
      {contentEditable ? (
        <Input
          value={nodeName}
          placeholder="Name your node..."
          id="node-name"
          name="node-name"
          onBlur={handleBlur}
          onChange={(e) => setNodeName(e.target.value)}
        />
      ) : (
        <h3 className="p-[10px]">{nodeName}</h3>
      )}
      <Handle type="target" position={Position.Right} isConnectable />
      <Handle type="target" position={Position.Left} isConnectable />
    </div>
  );
};
