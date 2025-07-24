const bookmarkImgUrl = chrome.runtime.getURL("assets/bookmark.png");

window.addEventListener("load", addBookmarkButton);
function addBookmarkButton(){
    const bookmarkButton = document.createElement('img');
    bookmarkButton.id = "add-bookmark-button";
    bookmarkButton.src = bookmarkImgUrl;
    bookmarkButton.style.height = "30px";
    bookmarkButton.style.width = "30px";
    bookmarkButton.style.marginBottom = "14px";
    const problemName = document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0];

    problemName.parentNode.insertAdjacentElement("afterend", bookmarkButton);
}