import { ModeToggle } from "@/components/mode-toggle";
import { EditorMenu } from "../components/editor-menu";
import DownloadButton from "../components/download-image";
import { ReactFlowProvider } from "reactflow";
import Wrapper from "./wrapper";

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EditorMenu />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
