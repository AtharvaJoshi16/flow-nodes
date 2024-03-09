"use client";
import React from "react";
import {
  Panel,
  useReactFlow,
  getRectOfNodes,
  getTransformForBounds,
} from "reactflow";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useTheme } from "next-themes";

function downloadImage(dataUrl) {
  const a = document.createElement("a");
  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

function DownloadButton() {
  const { getNodes } = useReactFlow();
  const { theme } = useTheme();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    toPng(document.querySelector(".react-flow__viewport") as HTMLElement, {
      backgroundColor: theme === "dark" ? "black" : "white",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth.toString(),
        height: imageHeight.toString(),
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  return (
    <Panel position="top-left">
      <Button
        className="flex items-center gap-[10px]"
        variant="destructive"
        onClick={onClick}
      >
        Download Image
        <Download size={16} />
      </Button>
    </Panel>
  );
}

export default DownloadButton;
