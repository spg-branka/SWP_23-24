"use strict";

const ul = document.getElementById("meineUL");

function addElement() {
    const li = document.createElement("li");
    li.innerHTML = "new list item";
    ul.appendChild(li);
}
