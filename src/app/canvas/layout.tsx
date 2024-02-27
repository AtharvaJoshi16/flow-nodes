import { EditorMenu } from "../components/editor-menu";

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EditorMenu />
      {children}
    </>
  );
}
