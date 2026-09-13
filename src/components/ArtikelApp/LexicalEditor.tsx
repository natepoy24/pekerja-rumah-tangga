"use client";

import { EditorState } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ToolbarPlugin from "./ToolbarPlugin";
import { ImageNode } from "./LexicalImageNode";

interface LexicalEditorProps {
  onChange?: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const theme = {
  ltr: "text-left",
  rtl: "text-right",
  paragraph: "mb-4 leading-relaxed text-on-surface text-base md:text-lg font-sans",
  heading: {
    h1: "font-serif text-3xl md:text-4xl font-bold mb-6 text-[#14201D]",
    h2: "font-serif text-2xl md:text-3xl font-bold mt-8 mb-4 text-[#14201D]",
    h3: "font-serif text-xl md:text-2xl font-bold mt-6 mb-3 text-[#14201D]",
  },
  list: {
    ul: "list-disc list-inside mb-4 pl-4 text-on-surface text-base md:text-lg space-y-2 font-sans",
    ol: "list-decimal list-inside mb-4 pl-4 text-on-surface text-base md:text-lg space-y-2 font-sans",
    listitem: "ml-2",
  },
  quote: "border-l-4 border-[#3E7B28] bg-[#EBF4E7] p-4 my-6 text-[#0B4F42] italic rounded-r-xl text-base md:text-lg font-sans",
  code: "bg-surface-container-low text-sm font-mono p-1 px-2 rounded-md",
  image: "editor-image",
  link: "text-[#0B4F42] underline font-medium cursor-pointer hover:text-[#9E232A]",
};

function onError(error: Error) {
  console.error("Lexical Error:", error);
}

export default function LexicalEditor({
  onChange,
  initialContent,
  editable = true,
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      AutoLinkNode,
      LinkNode,
      ImageNode,
    ] as any,
    editorState: initialContent || undefined,
    editable: editable,
  };

  const handleOnChange = (editorState: EditorState) => {
    if (onChange) {
      onChange(JSON.stringify(editorState.toJSON()));
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="relative font-sans">
        {editable && <ToolbarPlugin />}

        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className={`min-h-[400px] outline-none ${!editable ? "bg-transparent" : "bg-white p-6 rounded-2xl border border-outline-variant/30 shadow-inner"}`}
            />
          }
          placeholder={
            <div className={`absolute left-6 text-on-surface-variant/40 text-base pointer-events-none ${editable ? "top-24" : "top-0"}`}>
              Mulailah menulis isi artikel di sini...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />

        <HistoryPlugin />
        {onChange && <OnChangePlugin onChange={handleOnChange} />}
        <ListPlugin />
        <LinkPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </div>
    </LexicalComposer>
  );
}
