function toggleVisibility(e) {
    const parent = e.target.parentElement;
    const paragraphs = parent.querySelectorAll('p');

    for (let i = 0; i < paragraphs.length; i++) {
        if (paragraphs[i].style.visibility === 'hidden') {
            paragraphs[i].style.visibility = 'visible';
            paragraphs[i].style.position = 'static';
            parent.style.backgroundColor = "white";
            parent.style.color = "black";
        } else {
            paragraphs[i].style.visibility = 'hidden';
            paragraphs[i].style.position = 'absolute';
            parent.style.backgroundColor = "";
            parent.style.color = "";
        }
    }
}

const articles = document.querySelectorAll("div.news-articles > article > h2");
articles.forEach((a) => a.addEventListener("click", toggleVisibility));
