// Based on https://github.com/getzola/zola/blob/master/docs/static/search.js

var currentScript = document.currentScript;

async function downloadSearchIndex(url) {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return null;
    }
    return response.json();
  } catch (err) {
    console.error("failed to download search index", err);
    return null;
  }  
}

async function initSearch() {
  console.log("In initSearch()!");

  var searchIndexUrl = currentScript.getAttribute("searchIndexUrl");
  var data = await downloadSearchIndex(searchIndexUrl); 
  console.log("data: ");
  console.log(data);

  var index = new FlexSearch({
    doc: {
        id: "permalink",
        field: [
            "title",
            "tags",
            "categories",
            "contents"
        ]
    }
  });
  index.add(data);

  var searchInputId = currentScript.getAttribute("searchInputId");
  var searchInput = document.getElementById(searchInputId);

  searchInput.addEventListener("keyup", _.debounce(async function() {
    var results = await index.search(searchInput.value);
    console.log(results);
  }, 500));

}

if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initSearch();
} else {
  document.addEventListener("DOMContentLoaded", initSearch);
}

