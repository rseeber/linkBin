import React, { createRef } from 'react'
import { diffSourcePlugin, DiffSourceToggleWrapper, frontmatterPlugin, InsertFrontmatter, MDXEditor, Separator  } from '@mdxeditor/editor'
import { headingsPlugin, UndoRedo, BoldItalicUnderlineToggles, 
  toolbarPlugin, quotePlugin, listsPlugin, thematicBreakPlugin, 
  linkPlugin, linkDialogPlugin, BlockTypeSelect, CreateLink, 
  CodeToggle } from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'

function EditorApp_Full({ editorRef, startingMd }) {
  return (
  <>
    <MDXEditor
      ref={editorRef}
      markdown={startingMd}
      plugins={[
        toolbarPlugin({
          toolbarClassName: 'my-classname',
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <CreateLink />
              <CodeToggle />
              <DiffSourceToggleWrapper />
            </>
          )
        }),
        frontmatterPlugin(),
        diffSourcePlugin({ 
          diffMarkdown: startingMd, 
          viewMode: "rich-text",
          readOnlyDiff: true
        }),
        headingsPlugin(),
        quotePlugin(),
        listsPlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        linkDialogPlugin()
      ]}
    />
  </>
  )

}

function EditorApp_Plaintext({ editorRef, startingMd }) {
  return (
  <>
    <MDXEditor
      ref={editorRef}
      markdown={startingMd}
      plugins={[
        toolbarPlugin({
          toolbarClassName: 'my-classname',
          toolbarContents: () => (
            <>
            </>
          )
        }),
        diffSourcePlugin({ 
          diffMarkdown: startingMd, 
          viewMode: "source",
          readOnlyDiff: true
        })
      ]}
    />
  </>
  )

}


export { EditorApp_Full };
export { EditorApp_Plaintext };