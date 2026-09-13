"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
  LexicalCommand,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from "@lexical/rich-text";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { useRef, useEffect } from "react";
import { $createImageNode } from "./LexicalImageNode";
import toast from "react-hot-toast";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Link,
  Image as ImageIcon,
} from "lucide-react";

export const INSERT_IMAGE_COMMAND: LexicalCommand<string> = createCommand();

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload: string) => {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const imageNode = $createImageNode(payload, "Gambar Artikel");
            selection.insertNodes([imageNode]);
          }
        });
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const insertLink = () => {
    const url = window.prompt("Masukkan URL tautan (contoh: https://google.com):");
    if (url !== null) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url === "" ? null : url);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran foto maksimal 2MB untuk disisipkan ke dalam artikel.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sticky top-20 z-20 bg-white/90 backdrop-blur-md border border-[#D5E8D0] rounded-xl shadow-sm mb-6 p-1.5 flex flex-wrap items-center gap-1 w-fit font-sans">
      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className="p-2 hover:bg-[#EBF4E7] hover:text-[#3E7B28] rounded-lg text-on-surface-variant transition-colors"
        title="Tebal (Bold)"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className="p-2 hover:bg-[#EBF4E7] hover:text-[#3E7B28] rounded-lg text-on-surface-variant transition-colors"
        title="Miring (Italic)"
      >
        <Italic className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-outline-variant/30 mx-1"></div>

      {/* Headings */}
      <button
        type="button"
        onClick={() => formatHeading("h2")}
        className="p-2 hover:bg-[#EBF4E7] hover:text-[#3E7B28] rounded-lg text-on-surface-variant text-xs font-bold transition-colors"
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => formatHeading("h3")}
        className="p-2 hover:bg-[#EBF4E7] hover:text-[#3E7B28] rounded-lg text-on-surface-variant text-xs font-bold transition-colors"
        title="Heading 3"
      >
        H3
      </button>

      <div className="w-px h-5 bg-outline-variant/30 mx-1"></div>

      {/* Alignments */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        className="p-2 hover:bg-[#EBF4E7] hover:text-[#3E7B28] rounded-lg text-on-surface-variant transition-colors"
        title="Rata Kiri"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
        className="p-2 hover:bg-[#EBF4E7] hover:text-[#3E7B28] rounded-lg text-on-surface-variant transition-colors"
        title="Rata Tengah"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")}
        className="p-2 hover:bg-[#EBF4E7] hover:text-[#3E7B28] rounded-lg text-on-surface-variant transition-colors"
        title="Rata Kanan Kiri"
      >
        <AlignJustify className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-outline-variant/30 mx-1"></div>

      {/* Lists & Quotes */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        className="p-2 hover:bg-[#EBF4E7] hover:text-[#3E7B28] rounded-lg text-on-surface-variant transition-colors"
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        className="p-2 hover:bg-[#EBF4E7] hover:text-[#3E7B28] rounded-lg text-on-surface-variant transition-colors"
        title="Number List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={formatQuote}
        className="p-2 hover:bg-[#EBF4E7] hover:text-[#3E7B28] rounded-lg text-on-surface-variant transition-colors"
        title="Kutipan (Quote)"
      >
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-outline-variant/30 mx-1"></div>

      {/* Link & Media */}
      <button
        type="button"
        onClick={insertLink}
        className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-on-surface-variant transition-colors"
        title="Sisipkan Tautan (Link)"
      >
        <Link className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="p-2 hover:bg-[#EBF4E7] hover:text-[#3E7B28] rounded-lg text-on-surface-variant transition-colors"
        title="Sisipkan Foto/Gambar"
      >
        <ImageIcon className="w-4 h-4" />
      </button>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleImageUpload}
      />
    </div>
  );
}
