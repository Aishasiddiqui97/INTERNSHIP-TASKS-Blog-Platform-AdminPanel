'use client'

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill with proper typing
const ReactQuill = dynamic<ReactQuillProps>(
  () => import('react-quill').then((mod) => mod.default),
  { ssr: false, loading: () => <div className="h-40 flex justify-center items-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C3AED]"></div></div> }
);

interface QuillEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function QuillEditor({
  value = '',
  onChange,
  placeholder = 'Start writing your blog content...',
}: QuillEditorProps) {
  const [content, setContent] = useState(value);
  const [isMounted, setIsMounted] = useState(false);
  const quillRef = React.useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Force white text color after mount
    setTimeout(() => {
      const editor = document.querySelector('.ql-editor');
      if (editor) {
        (editor as HTMLElement).style.color = '#FFFFFF';
        
        // Set default format to white
        if (quillRef.current) {
          const quill = quillRef.current.getEditor();
          quill.format('color', '#FFFFFF');
        }
      }
    }, 100);
  }, []);

  const handleChange = (val: string) => {
    setContent(val);
    if (onChange) onChange(val);
  };

  const handleFocus = () => {
    // When editor gets focus, set default text color to white
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.format('color', '#FFFFFF');
    }
  };

  // Custom image handler — receives the Quill editor instance as first arg
  const imageHandler = async (editor: any) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.success && data.data?.url) {
          // Insert at cursor
          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, 'image', data.data.url);
          }
        }
      } catch (err) {
        console.error('Upload failed:', err);
      }
    };
    input.click();
  };

  // Toolbar configuration
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', { 'image': imageHandler }],
        [{ 'color': ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'] }, { 'background': [] }],
        ['clean'],
      ],
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
    'color',
    'background',
  ];

  return (
    <div className="bg-[#0A0A0F] border border-[#FFFFFF]/10 rounded-xl overflow-hidden quill-dark-theme">
      <style jsx global>{`
        .quill-dark-theme .ql-container {
          font-size: 16px;
          font-family: inherit;
        }
        .quill-dark-theme .ql-editor {
          min-height: 400px;
          color: #FFFFFF !important;
          background-color: #0A0A0F !important;
          padding: 20px;
          caret-color: #FFFFFF !important;
        }
        .quill-dark-theme .ql-editor:focus {
          caret-color: #FFFFFF !important;
          outline: none;
        }
        .quill-dark-theme .ql-editor p {
          color: #FFFFFF !important;
        }
        .quill-dark-theme .ql-editor h1,
        .quill-dark-theme .ql-editor h2,
        .quill-dark-theme .ql-editor h3,
        .quill-dark-theme .ql-editor h4,
        .quill-dark-theme .ql-editor h5,
        .quill-dark-theme .ql-editor h6 {
          color: #FFFFFF !important;
        }
        .quill-dark-theme .ql-editor span,
        .quill-dark-theme .ql-editor strong,
        .quill-dark-theme .ql-editor em,
        .quill-dark-theme .ql-editor u,
        .quill-dark-theme .ql-editor li,
        .quill-dark-theme .ql-editor ol,
        .quill-dark-theme .ql-editor ul {
          color: #FFFFFF !important;
        }
        .quill-dark-theme .ql-editor.ql-blank::before {
          color: #71717A !important;
          font-style: normal;
          left: 20px;
        }
        .quill-dark-theme .ql-toolbar {
          background-color: #18181B !important;
          border: none !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .quill-dark-theme .ql-stroke {
          stroke: #A1A1AA !important;
        }
        .quill-dark-theme .ql-fill {
          fill: #A1A1AA !important;
        }
        .quill-dark-theme .ql-picker-label {
          color: #A1A1AA !important;
        }
        .quill-dark-theme .ql-picker-options {
          background-color: #18181B !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .quill-dark-theme .ql-picker-item {
          color: #FAFAFA !important;
        }
        .quill-dark-theme .ql-picker-item:hover {
          background-color: #27272A !important;
        }
        .quill-dark-theme .ql-toolbar button:hover,
        .quill-dark-theme .ql-toolbar button:focus,
        .quill-dark-theme .ql-toolbar button.ql-active {
          background-color: #27272A !important;
        }
        .quill-dark-theme .ql-toolbar button:hover .ql-stroke,
        .quill-dark-theme .ql-toolbar button.ql-active .ql-stroke {
          stroke: #6366F1 !important;
        }
        .quill-dark-theme .ql-toolbar button:hover .ql-fill,
        .quill-dark-theme .ql-toolbar button.ql-active .ql-fill {
          fill: #6366F1 !important;
        }
        .quill-dark-theme .ql-container.ql-snow {
          border: none !important;
        }
        /* Force white text on all content */
        .quill-dark-theme .ql-editor * {
          color: #FFFFFF !important;
        }
      `}</style>
      {isMounted && (
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleChange}
          onFocus={handleFocus}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          theme="snow"
          className="min-h-[400px]"
        />
      )}
    </div>
  );
}
