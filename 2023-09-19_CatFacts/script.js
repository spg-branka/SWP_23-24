const link = "https://cat-fact.herokuapp.com/facts/random?amount=";
const btn = document.getElementById("btn");
const input = document.getElementById("amount");
const list = document.getElementById("list");

function fetchTheFacts() {
  const amount = input.value;
  fetch(link + amount)
    .then((response) => response.json())
    .then((facts) => {
      list.innerHTML = ""; //clears the list every time the function is called
      //for each "fact" in the array "facts", add a list item containing the text of the "fact" to the "list" element 
      facts.forEach(function (fact) {
        list.innerHTML += "<li>" + fact.text + "</li>";
      });
    });
}
