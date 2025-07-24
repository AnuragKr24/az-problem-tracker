const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";

const bookmarkSection = document.getElementById("bookmarks");
const assetsURLMap = {
    "play": chrome.runtime.getURL("assets/play.png"),
    "delete": chrome.runtime.getURL("assets/delete.png")
}

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (data) => {
        const currentBookmarks = data[AZ_PROBLEM_KEY] || [];
        viewBookmarks(currentBookmarks);
    });
});

function viewBookmarks(bookmarks){
    bookmarkSection.innerHTML = "";
    if(bookmarks.length === 0){
        bookmarkSection.innerHTML = "<i>No Bookmarks to Show</i>";
        return;
    }
    bookmarks.forEach(bookmark => addNewBookmark(bookmark));
}

function addNewBookmark(bookmark){
    const newBookmark = document.createElement('div');
    const bookmarkTitle = document.createElement('div');
    const bookmarkControls = document.createElement('div');

    bookmarkTitle.textContent = bookmark.name;
    bookmarkTitle.classList.add("bookmark-title");
    
    setControlAttributes(assetsURLMap["play"], onPlay, bookmarkControls);
    setControlAttributes(assetsURLMap["delete"], onDelete, bookmarkControls);

    bookmarkControls.classList.add("bookmark-controls");
    newBookmark.classList.add("bookmark");

    newBookmark.append(bookmarkTitle);
    newBookmark.append(bookmarkControls);

    bookmarkSection.appendChild(newBookmark);
}

function setControlAttributes(src, handler, parentDiv){
    const controlElement = document.createElement('img');
    controlElement.src = src;
    controlElement.addEventListener("click", handler);
    parentDiv.appendChild(controlElement);
}

function onPlay(){
}

function onDelete(){

}