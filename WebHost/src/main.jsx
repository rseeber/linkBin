import React, { createRef } from 'react'
import { createRoot } from 'react-dom/client'
import App from './MDXEditor'
import './style.css'

const ref = createRef();
createRoot(document.getElementById('MDXEditorWindow')).render(
    <>
        <App editorRef={ref} />
        <button onClick={() => savePage()}>Upload</button>
    </>
);

let site;

function setSite() {
    site = document.getElementById("site").value;
    console.log(site);
    loadPage();
}
window.setSite = setSite;   //accessible via html

function loadPage(){
    // decide which page on the site to download
    // (need to make this dynamic later)
    let page = "index.md";
    document.getElementById("page_title").innerHTML = page;

    //fetch the page via the API
    fetch("http://localhost:8000/site/"+site+"/"+page)
    .then(function(response) {
        return response.json();
    })
    // get the response body as a json
    .then(function(data){
        let content = data["content"];
        let frontMatter = data["frontMatter"];
        console.log(content);
        
        // save the frontMatter for later when we upload
        document.getElementById("frontMatter").value = frontMatter;

        ref.current?.setMarkdown(content);
    });
}

function savePage(){
    // get the hidden frontMatter
    let frontMatter = document.getElementById("frontMatter").value;
    // get the content from the text editor
    let content = ref.current?.getMarkdown();
    let data = {"content": content, "frontMatter": frontMatter};

    console.log("data is: ");
    console.log(data);

    // get the specific page we're editing
    // (this also needs to be dynamic eventually)
    let page = "index.md";
    //send an `update_page` API to the server
    fetch("http://localhost:8000/update/"+site+"/"+page, {
        method: "PUT",
        content: "application/text+json",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(function(response){
        console.log(response);
    });


}