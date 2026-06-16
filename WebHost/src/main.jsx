import React, { createRef } from 'react'
import { createRoot } from 'react-dom/client'
import App from './MDXEditor'
import './style.css'

const ref = createRef();
createRoot(document.getElementById('MDXEditorWindow')).render(
    <>
        <App editorRef={ref} />
        <button onClick={() => ref.current?.setMarkdown?.('new markdown')}>Set new markdown</button>
        <button onClick={() => console.log(ref.current?.getMarkdown?.())}>Get markdown</button>
    </>
);

function loadContent(){
    alert("I'm trying");
    // after render (allow React to mount the component)
    ref.current?.setMarkdown('# Loaded from main.jsx');
}

function savePage(){
    //get the form content in the HTML DOM
    let text = document.getElementByID("page_text").innerHTML;
    alert(text);
    //send an `update_page` API to the server
}