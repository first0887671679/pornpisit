"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo2,
  Redo2,
  Palette,
  RemoveFormatting,
  Type,
  Upload,
  Trash2,
  Replace,
  Loader2,
  X,
  LinkIcon as LinkIcon2,
  FileText,
  Maximize2,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const TEXT_COLORS = [
  { label: "ดำ", value: "#000000" },
  { label: "เทาเข้ม", value: "#374151" },
  { label: "เทา", value: "#6B7280" },
  { label: "แดง", value: "#DC2626" },
  { label: "ส้ม", value: "#EA580C" },
  { label: "เหลือง", value: "#CA8A04" },
  { label: "เขียว", value: "#16A34A" },
  { label: "ฟ้า", value: "#2563EB" },
  { label: "น้ำเงิน", value: "#4F46E5" },
  { label: "ม่วง", value: "#9333EA" },
  { label: "ชมพู", value: "#DB2777" },
  { label: "ขาว", value: "#FFFFFF" },
];

const FONT_SIZES = [
  { label: "เล็กมาก", value: "1" },
  { label: "เล็ก", value: "2" },
  { label: "ปกติ", value: "3" },
  { label: "ใหญ่", value: "4" },
  { label: "ใหญ่มาก", value: "5" },
  { label: "ใหญ่สุด", value: "6" },
];

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const imgFileRef = useRef<HTMLInputElement>(null);
  const replaceFileRef = useRef<HTMLInputElement>(null);
  const isInternalChange = useRef(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);
  const [showImageInsert, setShowImageInsert] = useState(false);

  // Set initial HTML only once, or when value changes externally (not from our own edits)
  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Image editing state
  const [selectedImg, setSelectedImg] = useState<HTMLImageElement | null>(null);
  const [imgToolbar, setImgToolbar] = useState<{ top: number; left: number } | null>(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [showImgUrlEdit, setShowImgUrlEdit] = useState(false);
  const [imgUrlValue, setImgUrlValue] = useState("");
  const [showImgAltEdit, setShowImgAltEdit] = useState(false);
  const [imgAltValue, setImgAltValue] = useState("");
  const [showImgSizeEdit, setShowImgSizeEdit] = useState(false);
  const [imgWidthValue, setImgWidthValue] = useState("");

  const notifyChange = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const exec = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    notifyChange();
  }, [notifyChange]);

  const handleInput = useCallback(() => {
    notifyChange();
  }, [notifyChange]);

  const insertLink = useCallback(() => {
    const url = prompt("ใส่ URL ลิงก์:", "https://");
    if (url) {
      exec("createLink", url);
    }
  }, [exec]);

  const insertImage = useCallback(() => {
    setShowImageInsert(!showImageInsert);
    setShowColorPicker(false);
    setShowFontSize(false);
  }, [showImageInsert]);

  const insertImageByUrl = useCallback(() => {
    const url = prompt("ใส่ URL รูปภาพ:", "https://");
    if (url) {
      exec("insertImage", url);
    }
    setShowImageInsert(false);
  }, [exec]);

  const handleInsertImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgUploading(true);
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      exec("insertImage", blob.url);
    } catch { /* ignore */ } finally {
      setImgUploading(false);
      setShowImageInsert(false);
      if (imgFileRef.current) imgFileRef.current.value = "";
    }
  }, [exec]);

  // --- Image toolbar logic ---
  const syncContent = useCallback(() => {
    notifyChange();
  }, [notifyChange]);

  const closeImgToolbar = useCallback(() => {
    if (selectedImg) {
      selectedImg.style.outline = "";
      selectedImg.style.outlineOffset = "";
    }
    setSelectedImg(null);
    setImgToolbar(null);
    setShowImgUrlEdit(false);
    setShowImgAltEdit(false);
    setShowImgSizeEdit(false);
  }, [selectedImg]);

  const positionToolbar = useCallback((img: HTMLImageElement) => {
    const editorEl = editorRef.current;
    if (!editorEl) return;
    const editorRect = editorEl.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    const top = imgRect.top - editorRect.top + editorEl.scrollTop - 48;
    const left = Math.max(0, Math.min(
      imgRect.left - editorRect.left + (imgRect.width / 2) - 150,
      editorRect.width - 320
    ));
    setImgToolbar({ top: Math.max(0, top), left: Math.max(0, left) });
  }, []);

  const handleEditorClick = useCallback((e: React.MouseEvent) => {
    setShowColorPicker(false);
    setShowFontSize(false);
    setShowImageInsert(false);

    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      const img = target as HTMLImageElement;
      // Highlight selected image
      if (selectedImg && selectedImg !== img) {
        selectedImg.style.outline = "";
        selectedImg.style.outlineOffset = "";
      }
      img.style.outline = "3px solid #f97316";
      img.style.outlineOffset = "2px";
      setSelectedImg(img);
      setImgUrlValue(img.src);
      setImgAltValue(img.alt || "");
      setImgWidthValue(img.style.width || img.getAttribute("width") || "");
      positionToolbar(img);
      setShowImgUrlEdit(false);
      setShowImgAltEdit(false);
      setShowImgSizeEdit(false);
    } else {
      closeImgToolbar();
    }
  }, [selectedImg, positionToolbar, closeImgToolbar]);

  const handleReplaceUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedImg) return;
    setImgUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        selectedImg.src = data.url;
        setImgUrlValue(data.url);
        syncContent();
      }
    } catch { /* ignore */ } finally {
      setImgUploading(false);
      if (replaceFileRef.current) replaceFileRef.current.value = "";
    }
  }, [selectedImg, syncContent]);

  const handleImgUrlSave = useCallback(() => {
    if (selectedImg && imgUrlValue) {
      selectedImg.src = imgUrlValue;
      syncContent();
    }
    setShowImgUrlEdit(false);
  }, [selectedImg, imgUrlValue, syncContent]);

  const handleImgAltSave = useCallback(() => {
    if (selectedImg) {
      selectedImg.alt = imgAltValue;
      syncContent();
    }
    setShowImgAltEdit(false);
  }, [selectedImg, imgAltValue, syncContent]);

  const handleImgSizeSave = useCallback(() => {
    if (selectedImg) {
      if (imgWidthValue) {
        selectedImg.style.width = imgWidthValue.includes("%") || imgWidthValue.includes("px") ? imgWidthValue : imgWidthValue + "px";
        selectedImg.style.height = "auto";
      } else {
        selectedImg.style.width = "";
        selectedImg.style.height = "";
      }
      syncContent();
    }
    setShowImgSizeEdit(false);
  }, [selectedImg, imgWidthValue, syncContent]);

  const handleImgDelete = useCallback(() => {
    if (selectedImg) {
      selectedImg.remove();
      closeImgToolbar();
      syncContent();
    }
  }, [selectedImg, closeImgToolbar, syncContent]);

  // Close toolbar on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!editorRef.current?.contains(target) && !target.closest(".img-toolbar-popup")) {
        closeImgToolbar();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [closeImgToolbar]);

  const formatBlock = useCallback((tag: string) => {
    exec("formatBlock", tag);
  }, [exec]);

  const ToolBtn = ({ onClick, active, children, title }: { onClick: () => void; active?: boolean; children: React.ReactNode; title: string }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${active ? "bg-slate-200 text-orange-600" : "text-slate-600"}`}
    >
      {children}
    </button>
  );

  const Separator = () => <div className="w-px h-6 bg-slate-200 mx-1" />;

  return (
    <div className="border border-input rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-slate-50 border-b border-slate-200">
        {/* Undo / Redo */}
        <ToolBtn onClick={() => exec("undo")} title="ย้อนกลับ">
          <Undo2 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec("redo")} title="ทำซ้ำ">
          <Redo2 className="w-4 h-4" />
        </ToolBtn>

        <Separator />

        {/* Headings */}
        <ToolBtn onClick={() => formatBlock("H1")} title="หัวข้อ H1">
          <Heading1 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => formatBlock("H2")} title="หัวข้อ H2">
          <Heading2 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => formatBlock("H3")} title="หัวข้อ H3">
          <Heading3 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => formatBlock("H4")} title="หัวข้อ H4">
          <Heading4 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => formatBlock("H5")} title="หัวข้อ H5">
          <Heading5 className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => formatBlock("P")} title="ข้อความปกติ">
          <Type className="w-4 h-4" />
        </ToolBtn>

        <Separator />

        {/* Font Size */}
        <div className="relative">
          <ToolBtn onClick={() => { setShowFontSize(!showFontSize); setShowColorPicker(false); }} title="ขนาดตัวอักษร">
            <span className="text-xs font-bold w-4 h-4 flex items-center justify-center">A</span>
          </ToolBtn>
          {showFontSize && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-1 z-50 min-w-[120px]">
              {FONT_SIZES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => { exec("fontSize", s.value); setShowFontSize(false); }}
                  className="block w-full text-left px-3 py-1.5 text-sm hover:bg-slate-100 rounded"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Bold / Italic / Underline */}
        <ToolBtn onClick={() => exec("bold")} title="ตัวหนา (Ctrl+B)">
          <Bold className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec("italic")} title="ตัวเอียง (Ctrl+I)">
          <Italic className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec("underline")} title="ขีดเส้นใต้ (Ctrl+U)">
          <Underline className="w-4 h-4" />
        </ToolBtn>

        <Separator />

        {/* Text Color */}
        <div className="relative">
          <ToolBtn onClick={() => { setShowColorPicker(!showColorPicker); setShowFontSize(false); }} title="สีข้อความ">
            <Palette className="w-4 h-4" />
          </ToolBtn>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-50">
              <p className="text-xs text-slate-500 mb-1.5 font-medium">สีข้อความ</p>
              <div className="grid grid-cols-6 gap-1">
                {TEXT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => { exec("foreColor", c.value); setShowColorPicker(false); }}
                    title={c.label}
                    className="w-6 h-6 rounded border border-slate-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Lists */}
        <ToolBtn onClick={() => exec("insertUnorderedList")} title="รายการ bullet">
          <List className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec("insertOrderedList")} title="รายการตัวเลข">
          <ListOrdered className="w-4 h-4" />
        </ToolBtn>

        <Separator />

        {/* Alignment */}
        <ToolBtn onClick={() => exec("justifyLeft")} title="ชิดซ้าย">
          <AlignLeft className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec("justifyCenter")} title="กลาง">
          <AlignCenter className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec("justifyRight")} title="ชิดขวา">
          <AlignRight className="w-4 h-4" />
        </ToolBtn>

        <Separator />

        {/* Link / Image */}
        <ToolBtn onClick={insertLink} title="แทรกลิงก์">
          <LinkIcon className="w-4 h-4" />
        </ToolBtn>
        <div className="relative">
          <ToolBtn onClick={insertImage} title="แทรกรูปภาพ">
            <ImageIcon className="w-4 h-4" />
          </ToolBtn>
          {showImageInsert && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-2 z-50 min-w-[200px]">
              <p className="text-xs text-slate-500 mb-2 font-medium">แทรกรูปภาพ</p>
              <button
                type="button"
                onClick={() => imgFileRef.current?.click()}
                disabled={imgUploading}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-slate-100 rounded transition-colors disabled:opacity-50"
              >
                {imgUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {imgUploading ? "กำลังอัพโหลด..." : "อัพโหลดจากเครื่อง"}
              </button>
              <button
                type="button"
                onClick={insertImageByUrl}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-slate-100 rounded transition-colors"
              >
                <LinkIcon2 className="w-4 h-4" />
                ใส่ URL รูปภาพ
              </button>
            </div>
          )}
        </div>

        <Separator />

        {/* Remove formatting */}
        <ToolBtn onClick={() => exec("removeFormat")} title="ลบ formatting">
          <RemoveFormatting className="w-4 h-4" />
        </ToolBtn>
      </div>

      {/* Editor Area (relative for image toolbar positioning) */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleInput}
          onClick={handleEditorClick}
          className="min-h-[350px] p-4 focus:outline-none prose prose-sm max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h5:text-base
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-a:text-orange-600 prose-img:rounded-lg prose-img:max-w-full prose-img:cursor-pointer
            prose-ul:text-gray-600 prose-ol:text-gray-600"
        />

        {/* Image Floating Toolbar */}
        {selectedImg && imgToolbar && (
          <div
            className="img-toolbar-popup absolute z-50 bg-white border border-slate-200 rounded-xl shadow-2xl p-2 animate-in fade-in zoom-in-95"
            style={{ top: imgToolbar.top, left: imgToolbar.left, minWidth: 300 }}
          >
            {/* Main actions row */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => replaceFileRef.current?.click()}
                disabled={imgUploading}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-orange-50 text-orange-700 hover:bg-orange-100 rounded-lg transition-colors disabled:opacity-50"
                title="อัพโหลดรูปใหม่"
              >
                {imgUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Replace className="w-3.5 h-3.5" />}
                เปลี่ยนรูป
              </button>
              <button
                type="button"
                onClick={() => { setShowImgUrlEdit(!showImgUrlEdit); setShowImgAltEdit(false); setShowImgSizeEdit(false); }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  showImgUrlEdit ? "bg-blue-100 text-blue-700" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
                title="แก้ URL"
              >
                <LinkIcon2 className="w-3.5 h-3.5" />
                URL
              </button>
              <button
                type="button"
                onClick={() => { setShowImgAltEdit(!showImgAltEdit); setShowImgUrlEdit(false); setShowImgSizeEdit(false); }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  showImgAltEdit ? "bg-blue-100 text-blue-700" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
                title="แก้ Alt Text"
              >
                <FileText className="w-3.5 h-3.5" />
                Alt
              </button>
              <button
                type="button"
                onClick={() => { setShowImgSizeEdit(!showImgSizeEdit); setShowImgUrlEdit(false); setShowImgAltEdit(false); }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  showImgSizeEdit ? "bg-blue-100 text-blue-700" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
                title="ปรับขนาด"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <div className="w-px h-5 bg-slate-200 mx-0.5" />
              <button
                type="button"
                onClick={handleImgDelete}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                title="ลบรูป"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={closeImgToolbar}
                className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors ml-auto"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* URL edit */}
            {showImgUrlEdit && (
              <div className="mt-2 flex gap-1.5">
                <input
                  type="text"
                  value={imgUrlValue}
                  onChange={(e) => setImgUrlValue(e.target.value)}
                  className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  placeholder="https://..."
                />
                <button
                  type="button"
                  onClick={handleImgUrlSave}
                  className="px-3 py-1.5 text-xs font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  บันทึก
                </button>
              </div>
            )}

            {/* Alt text edit */}
            {showImgAltEdit && (
              <div className="mt-2 flex gap-1.5">
                <input
                  type="text"
                  value={imgAltValue}
                  onChange={(e) => setImgAltValue(e.target.value)}
                  className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-400"
                  placeholder="คำอธิบายรูปภาพ (Alt text)"
                />
                <button
                  type="button"
                  onClick={handleImgAltSave}
                  className="px-3 py-1.5 text-xs font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  บันทึก
                </button>
              </div>
            )}

            {/* Size edit */}
            {showImgSizeEdit && (
              <div className="mt-2">
                <div className="flex gap-1.5 items-center">
                  <input
                    type="text"
                    value={imgWidthValue}
                    onChange={(e) => setImgWidthValue(e.target.value)}
                    className="w-24 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-400"
                    placeholder="เช่น 100%, 600px"
                  />
                  <button
                    type="button"
                    onClick={handleImgSizeSave}
                    className="px-3 py-1.5 text-xs font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    บันทึก
                  </button>
                </div>
                <div className="flex gap-1 mt-1.5">
                  {["100%", "75%", "50%", "300px", "600px"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => { setImgWidthValue(size); }}
                      className="px-2 py-0.5 text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Current image preview */}
            <div className="mt-2 text-[10px] text-slate-400 truncate max-w-[280px]" title={selectedImg?.src}>
              {selectedImg?.src?.substring(0, 60)}{(selectedImg?.src?.length || 0) > 60 ? "..." : ""}
            </div>
          </div>
        )}
      </div>

      {/* Hidden file inputs */}
      <input ref={imgFileRef} type="file" accept="image/*" className="hidden" onChange={handleInsertImageUpload} />
      <input ref={replaceFileRef} type="file" accept="image/*" className="hidden" onChange={handleReplaceUpload} />
    </div>
  );
}
