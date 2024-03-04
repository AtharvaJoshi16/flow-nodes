import { Alignment } from "@/app/(slice)/optionsSlice";
import { RootState } from "@/app/(store)";
import { Input } from "@/components/ui/input";
import { CSSProperties, MouseEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Handle, NodeProps, NodeToolbar, Position } from "reactflow";
import { TwitterPicker } from "react-color";
import { FontBoldIcon, FontItalicIcon } from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Baseline, Palette, Trash2 } from "lucide-react";
import { updateNodeStyle } from "@/app/(slice)/nodeSlice";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";
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
  const { theme } = useTheme();
  const [styling, setStyling] = useState({
    bold: false,
    italic: false,
    color: "",
  });
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const s = { ...styling };
    theme === "dark" ? (s.color = "white") : (s.color = "black");
    setStyling(s);
  }, [theme]);

  useEffect(() => {
    const styles: CSSProperties = {
      fontWeight: styling.bold ? 700 : 500,
      fontStyle: styling.italic ? "italic" : "normal",
      color: styling.color,
    };
    dispatch(updateNodeStyle({ id: node.id, style: styles }));
  }, [styling]);

  const handleOption = (e, opt: string) => {
    const state = e.currentTarget.dataset.state;
    const s = { ...styling };
    switch (opt) {
      case "bold": {
        s.bold = state === "off" ? true : false;
        setStyling(s);
        break;
      }

      case "italic": {
        s.italic = state === "off" ? true : false;
        setStyling(s);
        break;
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
        className="z-400 relative"
        position={Position.Top}
        style={{ top: "-10px" }}
      >
        <ToggleGroup
          variant="outline"
          className="border-2 border-slate-500 rounded-md p-1"
          type="multiple"
        >
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
          <Popover>
            <PopoverTrigger>
              <Button size="icon" variant="outline">
                <Baseline size={20} color={styling.color} strokeWidth={3} />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" className="w-[320px]">
              <TwitterPicker
                triangle="hide"
                color={styling.color}
                onChangeComplete={(color) => {
                  const s = { ...styling };
                  s.color = color.hex;
                  setStyling(s);
                }}
                className="m-auto shadow-none"
              />
            </PopoverContent>
          </Popover>
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
