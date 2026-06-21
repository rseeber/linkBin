# Roadmap

# Big picture

This app, will contain two modules -- "LinkBin" and "WebHost". Currently, only WebHost exists.

**Please keep in mind while developing end-user features:**

This project is meant to be explicitly accessible to _regular people_, who aren't necessarily very technologically literate. As a general rule, if a typical 25-year-old who is not in STEM couldn't intuitively understand how to use your feature, perhaps it needs to be refined further in order to be more easily understood. There is to be absolutely _no requirement_ for a user of this software to ever see a single line of code, including markdown or html (although allowing advanced users such an option is both allowed, and encouraged).

## WebHost

__WebHost__ is an app that easily allows users to create an entire website by using a richtext editor, and selecting templates for that content to fit into. It is a fully WYSIWYG experience for web creation, which might eventually extend to include the ability for users to directly edit markdown or html code.

## LinkBin

__LinkBin__ is an app meant to mimic the features of [Are.na](https://www.are.na/). Perhaps more familiar to people might be to say it's almost like Pinterest, but without Big Tech and algorithms. It would be a application on the Social Web (aka "[fediverse](https://en.wikipedia.org/wiki/Fediverse)"), which allows users to save links, and maybe direct media uploads (images, pdfs, text uploads) to various named collections (tentatively called "bins"). These posts will be all public. Anyone can view the posts saved to a users bins. It's a public sharing platform. No plans currently exist for saving private links. Your browser's bookmarks bar already fills that niche.

---

# Tasks

If you would like your name and a link to your forked branch to be included on one of these items, so people know where to contribute for the feature, please reach out to River ([riverseeber12@gmail.com](mailto:riverseeber12@gmail.com)).

## WebHost

- Full functionality for file management
    + Needs a "folder" view paradigm, that still clearly conveys to the user that a file `/foo/index.md` corresponds to `/foo` on the published version of the page.
    + Downstream of that, the delete function would need to be updated, as would the creation of child and sibling pages. The buttons work, but they do not make it easy for a user to understand what they will do.
    + Additionally, we need functionality for moving files and folders. The API already exists, but the web app doesn't have full support yet.
- Need to import more template options for users to pick from. We can [source these from the internet](https://discourse.32bit.cafe/t/resources-list-for-the-personal-web/49#p-63-free-layouts-themes-18) (easy), or we can create them ourselves (more difficult).
    + Please ensure that when you download the template, you also download any linked elements (CSS, JS, images, etc) as well. This can be easily accomplished with the `wget` tool.
    + Special note about copyright: We can only use templates licensed under open source (e.g. MIT) or Creative Commons (such as CC-BY) licenses -- or those released to the public domain. If they are not released under one of these licenses, we can only use the template if we have been given explicit permission by the creator (in writing, ideally unconditionally).
- Client side eleventy
    + Not sure if this is entirely possible
    + Client should download the full contents of `_includes/`, `_data/`, and also `eleventy.config.js`. Then, for whatever page they're working on, they will also temporarily download that one (which already happens as is). The client should then run eleventy to render just render that current page. It will feed the html output into the srcdoc of the iframe preview (after replacing the main content area with the markdown rich-text editor, prefilled with the contents of the page, ready to be edited).
    + This feature is going to be hard to get perfectly right in such a way that a regular user will be able to easily understand it, but I believe it is a very important one in the long run.
- General clean up on code readability and clarity in the Javascript web app (specifically in [`main.jsx`](/app/WebHost/src/main.jsx))

## LinkBin

Currently, no work is being done on LinkBin until WebHost has attained a basic minimum presentability. No need to spread ourselves too thin until we can show something off that will attract more help and attention to the project.