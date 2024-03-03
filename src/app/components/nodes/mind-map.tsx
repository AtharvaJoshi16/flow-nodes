import { Alignment } from "@/app/(slice)/optionsSlice";
import { RootState } from "@/app/(store)";
import { Input } from "@/components/ui/input";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Handle, NodeProps, NodeToolbar, Position } from "reactflow";

import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Trash2 } from "lucide-react";
import { updateNodeStyle } from "@/app/(slice)/nodeSlice";
export const MindMapNode = ({
  node,
  data,
  contentEditable,
  setContentEditable,
  nodeName,
  handleBlur,
  setNodeName,
}) => {
  const alignment = useSelector((state: RootState) => state.options.alignment);
  const nodes = useSelector((state: RootState) => state.nodes.nodes);

  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleOption = (e, opt: string) => {
    const state = e.currentTarget.dataset.state;
    switch (opt) {
      case "bold": {
        dispatch(
          updateNodeStyle({
            id: node.id,
            style:
              state === "off"
                ? {
                    fontWeight: "bold",
                  }
                : {
                    fontWeight: 500,
                  },
          })
        );
      }
      case "italic": {
        dispatch(
          updateNodeStyle({
            id: node.id,
            style:
              state === "off"
                ? {
                    fontStyle: "italic",
                  }
                : {
                    fontStyle: "normal",
                  },
          })
        );
      }
      default: {
      }
    }
  };

  return (
    <div
      ref={nodeRef}
      onBlur={() => {
        setContentEditable(false);
        nodeRef.current?.classList.add("border-none");
        nodeRef.current?.classList.remove("border-sky-600", "rounded-lg");
      }}
      onDoubleClick={() => setContentEditable(true)}
      className="border-none relative"
      onClick={() => {
        nodeRef.current?.classList.remove("border-none");
        nodeRef.current?.classList.add("border-sky-600", "rounded-lg");
      }}
    >
      <NodeToolbar
        isVisible={data.toolbarVisible}
        className="z-400"
        position={Position.Top}
        style={{ top: "-10px" }}
      >
        <ToggleGroup className="bg-slate-200 rounded-md p-1" type="multiple">
          <ToggleGroupItem
            onClick={(e) => handleOption(e, "bold")}
            value="bold"
          >
            <FontBoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            onClick={(e) => handleOption(e, "italic")}
            value="italic"
          >
            <FontItalicIcon strokeWidth={3} />
          </ToggleGroupItem>
        </ToggleGroup>
      </NodeToolbar>

      <Handle
        type="target"
        position={
          alignment === Alignment.HORIZONTAL ? Position.Left : Position.Top
        }
        isConnectable
      />
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
      <Handle
        type="source"
        position={
          alignment === Alignment.HORIZONTAL ? Position.Right : Position.Bottom
        }
        isConnectable
      />
    </div>
  );
};
