import { useState } from "react";
import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Pencil, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteNode } from "@/app/(slice)/nodeSlice";
import { useDispatch } from "react-redux";
import { Handle, Position } from "reactflow";
import { InputGroup } from "../input-group";
import { Input } from "@/components/ui/input";
import classNames from "classnames";

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
  nodeId,
  nodeRef,
  contentEditable,
  setContentEditable,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
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
      ref={nodeRef}
      onBlur={() => {
        setShowMenu(false);
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
        setShowMenu(!showMenu);
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
      </div>
      {showMenu && (
        <ToggleGroup
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
