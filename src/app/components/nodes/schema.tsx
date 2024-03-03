import { useEffect, useRef, useState } from "react";
import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  MoreHorizontal,
  Option,
  Pencil,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteNode } from "@/app/(slice)/nodeSlice";
import { useDispatch } from "react-redux";
import { Handle, NodeToolbar, Position } from "reactflow";
import { InputGroup } from "../input-group";
import { Input } from "@/components/ui/input";
import classNames from "classnames";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";

interface SchemaNodeData {
  name: string;
  fields: FieldProps[];
}

export interface FieldProps {
  id: number;
  label: string;
  type: string;
}

export const SchemaNode = ({
  node,
  data,
  nodeId,
  contentEditable,
  setContentEditable,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e) => {
    if (nodeRef.current && !nodeRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const [nodeData, setNodeData] = useState<SchemaNodeData>({
    name: "Table 1",
    fields: [
      {
        id: 1,
        label: "Field1",
        type: "Int",
      },
      {
        id: 2,
        label: "Field2",
        type: "Int",
      },
      {
        id: 3,
        label: "Field3",
        type: "Int",
      },
    ],
  });

  const handleFieldsUpdate = (field: FieldProps) => {
    const copy = { ...nodeData };
    const idx = copy.fields?.findIndex((item) => item.id === field.id);
    copy.fields[idx] = field;
    setNodeData(copy);
  };

  return (
    <div
      className={classNames(
        "min-w-[200px] rounded-lg border-2 border-slate-700 relative [contenteditable=`true`]:focus-visible:outline-2 "
      )}
      // ref={nodeRef}
      onBlur={() => {
        setContentEditable(false);
        nodeRef.current?.classList.remove("border-sky-600");
        nodeRef.current?.classList.add("rounded-lg", "border-slate-700");
      }}
      onDoubleClick={() => setContentEditable(true)}
      onClick={() => {
        nodeRef.current?.classList.remove("border-slate-700");
        nodeRef.current?.classList.add("rounded-lg", "border-sky-600");
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setShowMenu(true);
      }}
    >
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
          onClick={() => dispatch(deleteNode(nodeId))}
        >
          <Trash size={20} />
        </Button>
        <Button
          className="rounded-full w-[30px] h-[30px] p-2"
          variant="secondary"
          size="sm"
          onClick={() => {
            const copy = { ...nodeData };
            copy.fields.push({
              id: Math.random() * 10,
              label: "Field Name",
              type: "Field Type",
            });
            setNodeData(copy);
          }}
        >
          <Plus size={20} />
        </Button>
      </div>
      <Handle
        style={{
          width: "40px",
          height: "40px",
          top: "70px",
        }}
        type="target"
        position={Position.Left}
        isConnectable
      />
      <Handle
        style={{
          width: "40px",
          height: "40px",
          top: "70px",
        }}
        type="source"
        position={Position.Right}
        isConnectable
      />

      <div
        className={classNames({
          "bg-red-500 rounded-lg border-b-2 rounded-t-[6px] rounded-b-none border-white":
            !contentEditable,
        })}
      >
        {contentEditable ? (
          <Input
            className="text-xl"
            value={nodeData?.name}
            placeholder="Name your node..."
            id="node-name"
            name="node-name"
            onBlur={() => setContentEditable(false)}
            onChange={(e) => {
              const d = { ...nodeData };
              d.name = e.target.value;
              setNodeData(d);
            }}
          />
        ) : (
          <h3 className="text-center p-[10px] uppercase font-semibold">
            {nodeData?.name}
          </h3>
        )}
      </div>

      <div className="p-1">
        {nodeData?.fields?.map((field) => {
          return (
            <InputGroup
              key={field.id}
              field={field}
              onChange={(f) => handleFieldsUpdate(f)}
            />
          );
        })}
      </div>
    </div>
  );
};
