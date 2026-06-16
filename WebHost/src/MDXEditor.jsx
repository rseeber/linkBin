import React, { createRef } from 'react'
import { MDXEditor  } from '@mdxeditor/editor'
import { headingsPlugin, UndoRedo, BoldItalicUnderlineToggles, 
  toolbarPlugin, quotePlugin, listsPlugin, thematicBreakPlugin, 
  linkPlugin, linkDialogPlugin, BlockTypeSelect, CreateLink, 
  CodeToggle } from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'

function App({ editorRef }) {
  return (
  <>
    <MDXEditor
      ref={editorRef}
      markdown="# Hello"
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
            </>
          )
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


export default App