import { ModeToggle } from "@/components/mode-toggle";
import { EditorMenu } from "../components/editor-menu";
import DownloadButton from "../components/download-image";

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ModeToggle />
      <EditorMenu />
      {children}
    </>
  );
}
