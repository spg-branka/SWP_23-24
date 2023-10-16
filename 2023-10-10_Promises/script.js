//console.log("loaded");
const button = document.getElementById("button");

button.addEventListener("click", function() {
    const myPromise = new Promise(function(resolve, reject) {
        let randomNum = Math.random();
        console.log("Zufallszahl: " + randomNum);
        if (randomNum >= 0.5) {
            resolve("Erfolgreich: " + randomNum);      
        } else {
            reject(new Error("Fehlgeschlagen: " + randomNum));   
        }
    });

    myPromise
    .then(result => {
    //= .then(function(result) {...}
        console.log("Ergebnis: " + result);
        document.body.style.backgroundColor = "white";
    })
    .catch(error => {
        console.error("Fehler: " + error.message);
        document.body.style.backgroundColor = "red";
    });
});
