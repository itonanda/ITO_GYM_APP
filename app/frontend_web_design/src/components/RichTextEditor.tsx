import React, { useEffect, useRef, useState } from "react";
import { Platform, Text, View } from "react-native";

interface RichTextEditorProps {
  value?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = "",
  onChange,
  placeholder = "Write something...",
  minHeight = 250,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#FFFF00");

  useEffect(() => {
    if (Platform.OS !== "web") return;

    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  if (Platform.OS !== "web") {
    return (
      <View>
        <Text>Rich Text Editor is available on Web.</Text>
      </View>
    );
  }

  const execCommand = (command: string, commandValue?: string) => {
    editorRef.current?.focus();

    document.execCommand(
      command,
      false,
      commandValue
    );

    handleChange();
  };

  const handleChange = () => {
    if (!editorRef.current) return;

    onChange?.(editorRef.current.innerHTML);
  };

  const handleHeading = (value: string) => {
    execCommand("formatBlock", value);
  };

  const handleFontSize = (value: string) => {
    execCommand("fontSize", value);
  };

  const handleTextColor = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const color = event.target.value;

    setTextColor(color);
    execCommand("foreColor", color);
  };

  const handleHighlight = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const color = event.target.value;

    setHighlightColor(color);

    execCommand("hiliteColor", color);
  };

  const handleLink = () => {
    const url = window.prompt(
      "Enter URL:",
      "https://"
    );

    if (!url) return;

    execCommand("createLink", url);
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Maximum 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum image size is 5MB");
      event.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      event.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    editorRef.current?.focus();

    execCommand("insertImage", imageUrl);

    if (editorRef.current) {
      const images = editorRef.current.querySelectorAll("img");

      const lastImage = images[images.length - 1];

      if (lastImage) {
        lastImage.setAttribute(
          "style",
          "max-width:100%;height:auto;border-radius:8px;margin:10px 0;"
        );
      }
    }

    handleChange();

    event.target.value = "";
  };

  return (
    <View style={{ width: "100%" }}>
      {/* TOOLBAR */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 6,
          padding: 8,
          borderWidth: 1,
          borderColor: "#D1D5DB",
          borderBottomWidth: 0,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          backgroundColor: "#F8F9FA",
        }}
      >
        {/* Undo */}
        <ToolbarButton
          label="↶"
          title="Undo"
          onClick={() => execCommand("undo")}
        />

        {/* Redo */}
        <ToolbarButton
          label="↷"
          title="Redo"
          onClick={() => execCommand("redo")}
        />

        <ToolbarDivider />

        {/* Bold */}
        <ToolbarButton
          label="B"
          title="Bold"
          onClick={() => execCommand("bold")}
          bold
        />

        {/* Italic */}
        <ToolbarButton
          label="I"
          title="Italic"
          onClick={() => execCommand("italic")}
          italic
        />

        {/* Underline */}
        <ToolbarButton
          label="U"
          title="Underline"
          onClick={() => execCommand("underline")}
          underline
        />

        {/* Strike */}
        <ToolbarButton
          label="S"
          title="Strikethrough"
          onClick={() => execCommand("strikeThrough")}
          strike
        />

        <ToolbarDivider />

        {/* Heading */}
        <select
          defaultValue="p"
          onChange={(e) =>
            handleHeading(e.target.value)
          }
          style={{
            height: 34,
            border: "1px solid #D1D5DB",
            borderRadius: 6,
            padding: "0 8px",
            backgroundColor: "#fff",
          }}
        >
          <option value="p">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        {/* Font Size */}
        <select
          defaultValue="3"
          onChange={(e) =>
            handleFontSize(e.target.value)
          }
          style={{
            height: 34,
            border: "1px solid #D1D5DB",
            borderRadius: 6,
            padding: "0 8px",
            backgroundColor: "#fff",
          }}
        >
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Huge</option>
        </select>

        <ToolbarDivider />

        {/* Text Color */}
        <label
          title="Text Color"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            padding: "4px 6px",
            border: "1px solid #D1D5DB",
            borderRadius: 6,
            backgroundColor: "#fff",
          }}
        >
          <span style={{ fontWeight: "bold" }}>
            A
          </span>

          <input
            type="color"
            value={textColor}
            onChange={handleTextColor}
            style={{
              width: 25,
              height: 25,
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        </label>

        {/* Highlight */}
        <label
          title="Highlight"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            padding: "4px 6px",
            border: "1px solid #D1D5DB",
            borderRadius: 6,
            backgroundColor: "#fff",
          }}
        >
          <span
            style={{
              backgroundColor: highlightColor,
              padding: "2px 5px",
              fontWeight: "bold",
            }}
          >
            H
          </span>

          <input
            type="color"
            value={highlightColor}
            onChange={handleHighlight}
            style={{
              width: 25,
              height: 25,
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        </label>

        <ToolbarDivider />

        {/* Align */}
        <ToolbarButton
          label="≡"
          title="Align Left"
          onClick={() =>
            execCommand("justifyLeft")
          }
        />

        <ToolbarButton
          label="≡"
          title="Align Center"
          onClick={() =>
            execCommand("justifyCenter")
          }
        />

        <ToolbarButton
          label="≡"
          title="Align Right"
          onClick={() =>
            execCommand("justifyRight")
          }
        />

        <ToolbarButton
          label="≡"
          title="Justify"
          onClick={() =>
            execCommand("justifyFull")
          }
        />

        <ToolbarDivider />

        {/* Bullet */}
        <ToolbarButton
          label="•"
          title="Bullet List"
          onClick={() =>
            execCommand("insertUnorderedList")
          }
        />

        {/* Number */}
        <ToolbarButton
          label="1."
          title="Numbered List"
          onClick={() =>
            execCommand("insertOrderedList")
          }
        />

        {/* Indent */}
        <ToolbarButton
          label="→"
          title="Indent"
          onClick={() => execCommand("indent")}
        />

        {/* Outdent */}
        <ToolbarButton
          label="←"
          title="Outdent"
          onClick={() => execCommand("outdent")}
        />

        <ToolbarDivider />

        {/* Link */}
        <ToolbarButton
          label="🔗"
          title="Insert Link"
          onClick={handleLink}
        />

        {/* Image */}
        <ToolbarButton
          label="🖼"
          title="Insert Image"
          onClick={() =>
            fileInputRef.current?.click()
          }
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        {/* Clear */}
        <ToolbarButton
          label="Tx"
          title="Clear Formatting"
          onClick={() =>
            execCommand("removeFormat")
          }
        />
      </View>

      {/* EDITOR */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={handleChange}
        onBlur={handleChange}
        style={{
          minHeight,
          padding: 14,
          border: "1px solid #D1D5DB",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          backgroundColor: "#FFFFFF",
          fontSize: 14,
          lineHeight: "1.6",
          outline: "none",
          overflowY: "auto",
          wordBreak: "break-word",
        }}
      />
    </View>
  );
};

interface ToolbarButtonProps {
  label: string;
  title: string;
  onClick: () => void;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
}

const ToolbarButton: React.FC<
  ToolbarButtonProps
> = ({
  label,
  title,
  onClick,
  bold,
  italic,
  underline,
  strike,
}) => {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onClick={onClick}
      style={{
        minWidth: 34,
        height: 34,
        border: "1px solid #D1D5DB",
        borderRadius: 6,
        backgroundColor: "#FFFFFF",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: bold ? "bold" : "normal",
        fontStyle: italic ? "italic" : "normal",
        textDecoration:
          underline
            ? "underline"
            : strike
            ? "line-through"
            : "none",
      }}
    >
      {label}
    </button>
  );
};

const ToolbarDivider = () => (
  <div
    style={{
      width: 1,
      height: 25,
      backgroundColor: "#D1D5DB",
      margin: "0 3px",
    }}
  />
);

export default RichTextEditor;