// Based on https://github.com/getzola/zola/blob/master/docs/static/search.js

var currentScript = document.currentScript;

// Taken from mdbook
// The strategy is as follows:
// First, assign a value to each word in the document:
//  Words that correspond to search terms (stemmer aware): 40
//  Normal words: 2
//  First word in a sentence: 8
// Then use a sliding window with a constant number of words and count the
// sum of the values of the words within the window. Then use the window that got the
// maximum sum. If there are multiple maximas, then get the last one.
// Enclose the terms in <b>.
function makeTeaser(contents, terms) {
  if (!contents) {
    return "";
  }

  var TERM_WEIGHT = 40;
  var NORMAL_WORD_WEIGHT = 2;
  var FIRST_WORD_WEIGHT = 8;
  var TEASER_MAX_WORDS = 30;

  var stemmedTerms = terms.map(function (w) {
    return stemmer(w.toLowerCase());
  });
  var termFound = false;
  var index = 0;
  var weighted = []; // contains elements of ["word", weight, index_in_document]

  // split in sentences, then words
  var sentences = contents.toLowerCase().split(". ");

  for (var i in sentences) {
    var words = sentences[i].split(" ");
    var value = FIRST_WORD_WEIGHT;

    for (var j in words) {
      var word = words[j];

      if (word.length > 0) {
        for (var k in stemmedTerms) {
          if (stemmer(word).startsWith(stemmedTerms[k])) {
            value = TERM_WEIGHT;
            termFound = true;
          }
        }
        weighted.push([word, value, index]);
        value = NORMAL_WORD_WEIGHT;
      }

      index += word.length;
      index += 1;  // ' ' or '.' if last word in sentence
    }

    index += 1;  // because we split at a two-char boundary '. '
  }

  if (weighted.length === 0) {
    return contents;
  }

  var windowWeights = [];
  var windowSize = Math.min(weighted.length, TEASER_MAX_WORDS);
  // We add a window with all the weights first
  var curSum = 0;
  for (var i = 0; i < windowSize; i++) {
    curSum += weighted[i][1];
  }
  windowWeights.push(curSum);

  for (var i = 0; i < weighted.length - windowSize; i++) {
    curSum -= weighted[i][1];
    curSum += weighted[i + windowSize][1];
    windowWeights.push(curSum);
  }

  // If we didn't find the term, just pick the first window
  var maxSumIndex = 0;
  if (termFound) {
    var maxFound = 0;
    // backwards
    for (var i = windowWeights.length - 1; i >= 0; i--) {
      if (windowWeights[i] > maxFound) {
        maxFound = windowWeights[i];
        maxSumIndex = i;
      }
    }
  }

  var teaser = [];
  var startIndex = weighted[maxSumIndex][2];
  for (var i = maxSumIndex; i < maxSumIndex + windowSize; i++) {
    var word = weighted[i];
    if (startIndex < word[2]) {
      // missing text from index to start of `word`
      teaser.push(contents.substring(startIndex, word[2]));
      startIndex = word[2];
    }

    // add <em/> around search terms
    if (word[1] === TERM_WEIGHT) {
      teaser.push("<b>");
    }
    startIndex = word[2] + word[0].length;
    teaser.push(contents.substring(word[2], startIndex));

    if (word[1] === TERM_WEIGHT) {
      teaser.push("</b>");
    }
  }
  teaser.push("…");
  return teaser.join("");
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

function populateResults(results, query, resultsList, resultsTemplate) {
  console.log("In populateResults()!!!");

  let finalHTML = "";
  results.forEach((result, index) => {
    finalHTML += window.syna.api.renderTemplate(resultsTemplate.innerHTML, {
        index: index,
        title: result.title,
        permalink: result.permalink,
        teaser: makeTeaser(result.contents, query.split(" ")),
    }); 
  });
  resultsList.innerHTML = finalHTML;
  console.log("finalHTML: ", finalHTML);
}

async function initSearch() {
  console.log("In initSearch()!");

  let searchIndexUrl = currentScript.getAttribute("searchIndexUrl");
  let data = await downloadSearchIndex(searchIndexUrl); 
  console.log("data: ");
  console.log(data);

  let index = new FlexSearch({
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

  let searchInput = document.getElementById(currentScript.getAttribute("searchInputId"));
  let resultsContainer = document.getElementById(currentScript.getAttribute("resultsContainerId"));
  let resultsList = document.getElementById(currentScript.getAttribute("resultsListId"));
  let resultsTemplate = document.getElementById(currentScript.getAttribute("resultsTemplateId"));
  let noResultsTemplate = document.getElementById(currentScript.getAttribute("noResultsTemplateId"));
  let emptyTemplate = document.getElementById(currentScript.getAttribute("emptyTemplateId"));
 
  console.log("Stuff: ");
  console.log(searchInput);
  console.log(resultsContainer);
  console.log(resultsList);
  console.log(resultsTemplate);
  console.log(noResultsTemplate);
  console.log(emptyTemplate);
  console.log("End stuff");

  let MAX_ITEMS = 10;

  document.addEventListener("click", e => {
    if (!resultsContainer.contains(e.target)) {
        searchInput.value = "";
        if (resultsContainer.classList.contains("show")) {
            resultsContainer.classList.remove("show");
        }
    }
  })

  searchInput.addEventListener("keyup", _.debounce(async function() {
    let query = searchInput.value.trim();
    console.log("query: ", query);
    if (!query) {
      console.log("invalid query!");
      resultsList.innerHTML = window.syna.api.renderTemplate(emptyTemplate.innerHTML, {});
      if (resultsContainer.classList.contains("show")) {
        resultsContainer.classList.remove("show");
      }
     return;
    }
   
    if (!resultsContainer.classList.contains("show")) {
      resultsContainer.classList.add("show");
    }
    let results = await index.search(query, MAX_ITEMS);
    console.log("results: ", results);

    if (results.length > 0) {
      populateResults(results, query, resultsList, resultsTemplate);
    } else {
      console.log("No results!");
      resultsList.innerHTML = window.syna.api.renderTemplate(noResultsTemplate.innerHTML, {});
    }

  }, 500));

}

if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  initSearch();
} else {
  document.addEventListener("DOMContentLoaded", initSearch);
}
