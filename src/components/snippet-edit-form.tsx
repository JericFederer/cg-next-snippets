'use client';

import { useState } from 'react';

import type { Snippet } from '@prisma/client';
import { Editor } from '@monaco-editor/react';
// import { editSnippet } from '@/actions';
import * as actions from '@/actions';

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState('');

  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      <Editor
        height='40vh'
        theme='vs-dark'
        language='javascript'
        defaultValue={ snippet.code }
        options={{ minimap: { enabled: false } }}
        onChange={ handleEditorChange }
      />

      <form action={ editSnippetAction }>
        <button type='submit' className='my-2 p-2 border rounded'>
          Save
        </button>
      </form>
    </div>
  );
}
