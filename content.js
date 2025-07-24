const bookmarkImgUrl = chrome.runtime.getURL("assets/bookmark.png");
const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";


const observer = new MutationObserver(() => {
    addBookmarkButton();
});

observer.observe(document.body, {childList: true, subtree: true});

addBookmarkButton();

function onProblemsPage(){
    return window.location.pathname.startsWith('/problems');
}

function addBookmarkButton(){
    console.log("trigging");
    if(!onProblemsPage() || document.getElementById("add-bookmark-button"))return;

    const bookmarkButton = document.createElement('img');
    bookmarkButton.id = "add-bookmark-button";
    bookmarkButton.src = bookmarkImgUrl;
    bookmarkButton.style.height = "30px";
    bookmarkButton.style.width = "30px";
    bookmarkButton.style.marginBottom = "14px";
    const azProblemName = document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0];

    azProblemName.parentNode.insertAdjacentElement("afterend", bookmarkButton);
    bookmarkButton.addEventListener("click", addNewBookmarkHandler);
}

async function addNewBookmarkHandler(){
    const currentBookmarks = await getCurrentBookmarks();

    const azProblemUrl = window.location.href;
    const uniqueId = extractUniqueId(azProblemUrl);
    const azProblemName = document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0];
    const problemTitle = azProblemName.textContent;


    if(currentBookmarks.some((bookmark) => bookmark.id === uniqueId)) return;
    const bookmarkObj = {
        id: uniqueId,
        name: problemTitle,
        url: azProblemUrl
    }

    const updatedBookmarks = [...currentBookmarks, bookmarkObj];

    chrome.storage.sync.set({AZ_PROBLEM_KEY: updatedBookmarks}, () => {
        console.log("Update the bookmarks correctly", updatedBookmarks);
    })
}

function extractUniqueId(url) {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname; // e.g., "/problems/Number-of-Ways-to-Reach-B-71"
        const part = pathname.split("/problems/")[1];
        return part || null; // return null if not found
    } catch (e) {
        console.error("Invalid URL:", e);
        return null;
    }
}

function getCurrentBookmarks(){
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([AZ_PROBLEM_KEY], (results) => {
            resolve(results[AZ_PROBLEM_KEY] || []);
        });
    });
}