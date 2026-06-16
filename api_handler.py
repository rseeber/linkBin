from fastapi import FastAPI, HTTPException
import os, subprocess

app = FastAPI()


@app.get("/site/{site}/{page}")
def get_page(site: str, page: str):
    # read the file
    try:
        with open(f"src/{site}/{page}", "r") as f:
            md = f.read()
    except FileNotFoundError:
        return -1

    # get a version of the md without the frontmatter
    # we will call this version 'content'
    frontMatterEnd = md.find("---", 3) + len("---")
    frontMatter = md[:frontMatterEnd]
    content = md[frontMatterEnd:]


    # Pull the template name from the liquid header info
    # only if we're accessing a source file (.md or .html) 
    # that isn't a template (_includes/)
    templateName = None
    if not (page.endswith(".md") and page.endswith(".html") and page.startswith("_includes/")):
        # I'm sure there's a better way to do this, but it works
        templateStart = frontMatter.find("layout: ") + len("layout: ")
        templateEnd = frontMatter.find("\n", templateStart)
        templateName = frontMatter[templateStart:templateEnd]
        # we need to add error checking to this

    return {"md": md, "content": content, "frontMatter":frontMatter, "templateName": templateName}

# This API either creates a new page, or updates an existing page
# you only need to pass in a dictionary containing
# "frontMatter" and "content". All other fields are unused.
# this API will concatenate them in order to save back to the md file
@app.put("/update/{site}/{page}")
def update_page(site: str, page: str, update: dict):
    if site not in os.listdir("src"):
        raise HTTPException(status_code=404, detail="Site not found")

    # get frontMatter and content
    frontMatter = update["frontMatter"]
    content = update["content"]
    # construct md by combining the two objects
    md = f"{frontMatter}\n{content}"

    path = f"src/{site}/{page}"
    # first, create the page if it doesn't exist yet
    if not os.path.isfile(path):
        with open(path, "a") as f:
            f.write("")
    
    # next, update the content
    with open(path, "w") as f:
        f.write(md)

    return

@app.put("/publish/{site}")
def publish_site(site: str):
    # go into path, run `npx @11ty/eleventy` in order to
    # generate the new site with the updated source files
    # (before this, we were _only_ updating source files,
    # not the deployed site)
    #
    # we accomplish this by running a bash script
    subprocess.run(["./publishSite.sh", site])
    # we need to add error checking at some point
    return
