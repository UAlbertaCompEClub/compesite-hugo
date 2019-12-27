// Based on https://github.com/getzola/zola/blob/master/docs/static/search.js

var currentScript = document.currentScript;

function debounce(func, wait) {
  var timeout;

  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

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
  console.log(searchIndexUrl);

  var searchIndex = await downloadSearchIndex(searchIndexUrl); 
  console.log("searchIndex: ");
  console.log(searchIndex);

  var searchInputId = currentScript.getAttribute("searchInputId");

  var searchInput = document.getElementById(searchInputId);

  searchInput.addEventListener("keyup", debounce(function() {
      console.log("keyup--custom search.js!");
  }, 150));

}

if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initSearch();
} else {
  document.addEventListener("DOMContentLoaded", initSearch);
}

