import { DecoratorNode, NodeKey, LexicalNode, SerializedLexicalNode } from "lexical";
import React from "react";

export interface SerializedImageNode extends SerializedLexicalNode {
  src: string;
  altText: string;
}

export class ImageNode extends DecoratorNode<React.ReactNode> {
  __src: string;
  __altText: string;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__key);
  }

  constructor(src: string, altText: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__altText = altText;
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    span.className = "flex justify-center my-6";
    return span;
  }

  updateDOM(): false {
    return false;
  }

  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      src: this.__src,
      altText: this.__altText,
      version: 1,
    };
  }

  static importJSON(serializedNode: SerializedLexicalNode & Record<string, any>): ImageNode {
    const { src, altText } = serializedNode;
    return $createImageNode(src || "", altText || "");
  }

  decorate(): React.ReactNode {
    return (
      <img
        src={this.__src}
        alt={this.__altText}
        className="max-w-full rounded-2xl shadow-sm border border-[#D5E8D0] cursor-zoom-in hover:opacity-95 transition-opacity"
        title="Klik untuk Zoom Gambar"
      />
    );
  }
}

export function $createImageNode(src: string, altText: string): ImageNode {
  return new ImageNode(src, altText);
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}
