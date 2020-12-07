import React, { useState, useEffect, forwardRef } from 'react';
import BraftEditor, { EditorState, MediaType } from 'braft-editor';
import 'braft-editor/dist/index.css';

interface RichEditorProps {
  value?: EditorState;
  onChange?: (value: string) => void;
  mediaType?: MediaType;
}

type Ref = BraftEditor;
const RichEditor = forwardRef<Ref, RichEditorProps>(({ value, onChange, mediaType }, ref) => {
  const [editorState, setEditorState] = useState<EditorState>(null);
  useEffect(() => {
    setEditorState(value);
  }, [value]);

  const handleEditorChange = (editorState: EditorState) => {
    setEditorState(editorState);
    onChange?.(editorState.toHTML());
  };

  return (
    <div style={{ border: '1px solid #ebedf0' }}>
      <BraftEditor ref={ref} value={editorState} onChange={handleEditorChange} media={mediaType} />
    </div>
  );
});

export default RichEditor;
