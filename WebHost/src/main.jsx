import React, { createRef } from 'react'
import { createRoot } from 'react-dom/client'
import App from './MDXEditor'
import './style.css'

let site;
let page = "index.md";
let apiStem = "http://localhost:8000";


// this snippet injects the MDXEditor into the web app
const ref = createRef();
createRoot(document.getElementById('MDXEditorWindow')).render(
    <>
        <App editorRef={ref} />
        <button onClick={() => savePage()}>Upload</button>
    </>
);

let startingVals;

// set the name for the site. This function allows 
// you to swap between which site is selected. It does not rename your site.
function setSite() {
    site = document.getElementById("site").value;
    // get the current list of templates
    fetch("http://localhost:8000/meta/templates/"+site)
    .then(function(response){
        return response.json()
    }).then(function(data){
        let templates = data["templates"];
        for (let i = 0; i < templates.length; i++) {
            // the filename of the template
            const template = templates[i];
            // filename without extension (.md, .html)
            let template_stripped = template.replace(/\.[^/.]+$/, ""); // https://stackoverflow.com/a/4250408
            // create an html node for this option
            let opt = document.createElement("option");
            opt.value = template;
            opt.innerHTML = template_stripped;
            // append this option to the list in the selector
            document.getElementById("template_selector").appendChild(opt);
        }

        // fill out the file explorer
        handleFileIndex();

        //after selecting which site to edit, we load the homepage contents 
        // for the site into the buffer
        loadPage();
    });
}
window.setSite = setSite;   //accessible via html

function switchPage(newPage){
    //save current buffer
    savePage();
    page = newPage;
    //load the new page into the buffer
    loadPage();
}
window.switchPage = switchPage;

// tell the server to run 11ty, updating the deployed site with current 
// versions of the source files
function publishSite(){
    // we should save the site one last time before publishing
    savePage();

    //okay now actually publish
    fetch("http://localhost:8000/publish/"+site, {
        method: "PUT"
    }).then(function(response) {
        return response.json();
    })
}
window.publishSite = publishSite;   //accessible via html

//download the page from the server, overwritting the current local buffer
function loadPage(){
    // decide which page on the site to download
    // (need to make this dynamic later)
    //let page = "index.md";
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

        // we cache this so we can diff against it when we upload, 
        // saving on network bandwidth
        startingVals = {
            "content": content, 
            "frontMatter": frontMatter, 
            "template": data["templateName"]
        };

        // save the frontMatter for later when we upload
        document.getElementById("frontMatter").value = frontMatter;

        ref.current?.setMarkdown(content);
    });
}

function setTemplate(){
    // get the input element in the html
    let templateSelector = document.getElementById("template_selector");
    // get the filename for the selected template
    let template = templateSelector.options[templateSelector.selectedIndex].value;
    // get the old frontMatter
    let frontMatter = document.getElementById("frontMatter").value;
    // update the frontMatter to use the new template
    frontMatter = frontMatter.replace(/(?<=layout: ).+/, template);
    // overwrite our saved value (in the hidden input) for the frontMatter
    document.getElementById("frontMatter").value = frontMatter;
}
window.setTemplate = setTemplate;

//upload the page to the server
function savePage(){
    // get the hidden frontMatter
    let frontMatter = document.getElementById("frontMatter").value;
    // get the content from the text editor
    let content = ref.current?.getMarkdown();
    let data = {"content": content, "frontMatter": frontMatter};

    // get the specific page we're editing
    // (this also needs to be dynamic eventually)
    //let page = "index.md";
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

function handleFileIndex(){
    getFileIndex_andApply();
}

function getFileIndex_andApply(){
    fetch(apiStem+"/meta/index/"+site)
    .then(function(response){
        return response.json();
    }).then(function(data){
        return applyFileIndex(data);
    });
}

function applyFileIndex(index){
    let fileExplorer = document.getElementById("file_explorer_list");
    applyFileIndex_recursive(index, fileExplorer);
}

function applyFileIndex_recursive(index, ul){
    console.log(index);
    for (var file in index) {
        let cleanFile = file.substring(1);
        let li = document.createElement("li");
        li.setAttribute("onclick", "switchPage('"+cleanFile+"');");
        li.innerHTML = file.substring(file.search(/\/([^\/]*)$/) + 1);
        ul.appendChild(li);
        // if the file is actually a directory, append its contents
        if (index[file] != null) {
            li.setAttribute("onclick", "switchPage('"+cleanFile+"/index.md');");
            let sub_ul = document.createElement("ul");
            ul.appendChild(sub_ul);
            applyFileIndex_recursive(index[file], sub_ul);
        }
    }
}