import { ModeToggle } from "@/components/mode-toggle";
import { EditorMenu } from "../components/editor-menu";

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
