import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Handle, Node, NodeProps, NodeResizer, Position } from "reactflow";
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
import { MindMapNode } from "./nodes/mind-map";
import { RootState } from "../(store)";
import { Patterns } from "../(slice)/optionsSlice";
import { SchemaNode } from "./nodes/schema";

export const CustomNode = (props: NodeProps) => {
  const dispatch = useDispatch();
  const pattern = useSelector((state: RootState) => state.options.patterns);
  const [nodeName, setNodeName] = useState("Node 1");
  const [contentEditable, setContentEditable] = useState(false);

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

  switch (pattern) {
    case Patterns.MIND_MAP:
      return (
        <MindMapNode
          node={props}
          data={props.data}
          nodeName={nodeName}
          setNodeName={setNodeName}
          setContentEditable={setContentEditable}
          contentEditable={contentEditable}
          handleBlur={handleBlur}
        />
      );
    case Patterns.ERD:
      return (
        <MindMapNode
          node={props}
          data={props.data}
          nodeName={nodeName}
          setNodeName={setNodeName}
          setContentEditable={setContentEditable}
          contentEditable={contentEditable}
          handleBlur={handleBlur}
        />
      );
    case Patterns.FS:
      return (
        <MindMapNode
          node={props}
          data={props.data}
          nodeName={nodeName}
          setNodeName={setNodeName}
          setContentEditable={setContentEditable}
          contentEditable={contentEditable}
          handleBlur={handleBlur}
        />
      );

    case Patterns.STICKY_NOTES:
      return (
        <MindMapNode
          node={props}
          data={props.data}
          nodeName={nodeName}
          setNodeName={setNodeName}
          setContentEditable={setContentEditable}
          contentEditable={contentEditable}
          handleBlur={handleBlur}
        />
      );

    case Patterns.SCHEMA:
      return (
        <SchemaNode
          node={props}
          data={props.data}
          nodeId={props.id}
          setContentEditable={setContentEditable}
          contentEditable={contentEditable}
        />
      );
    default:
      return (
        <div
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
  }
};
