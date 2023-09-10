"use strict";

function addElement() {
    const input = document.getElementById("input");
    const text = input.value;

    const ul = document.getElementById("meineUL");

    const li = document.createElement("li");
    li.innerHTML = text;

    ul.appendChild(li);
}
