import { Alignment } from "@/app/(slice)/optionsSlice";
import { RootState } from "@/app/(store)";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Handle, Position } from "reactflow";

import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Trash2 } from "lucide-react";
export const MindMapNode = ({
  nodeRef,
  contentEditable,
  setContentEditable,
  nodeName,
  handleBlur,
  setNodeName,
}) => {
  const alignment = useSelector((state: RootState) => state.options.alignment);
  const [showMenu, setShowMenu] = useState(false);
  const toggleGroupRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={nodeRef}
      onBlur={() => {
        setShowMenu(false);
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
      onContextMenu={(e) => {
        e.preventDefault();
        setShowMenu(!showMenu);
      }}
    >
      {showMenu && (
        <ToggleGroup
          ref={toggleGroupRef}
          className="absolute top-[-35px] z-1000 border-1 border-slate-300 rounded-sm"
          type="multiple"
        >
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <FontBoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <FontItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="delete" aria-label="Delete Node">
            <Trash2 stroke="#DA0000" strokeWidth={2.5} size={15} />
          </ToggleGroupItem>
        </ToggleGroup>
      )}

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
